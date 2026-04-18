-- =====================================================================
-- Backfill resumes.settings, resumes.language, and resumes.template
-- Idempotent: safe to re-run.
-- =====================================================================

-- 1. Resumes whose owner has user_settings → copy legacy per-user settings
--    into the new per-resume settings JSON.
UPDATE resumes
SET settings = json_object(
    'selectedFont',     COALESCE(json_extract(us.settings, '$.selectedFont'),     'Calibri'),
    'selectedTemplate', COALESCE(json_extract(us.settings, '$.selectedTemplate'), 'default'),
    'fontSize',         COALESCE(json_extract(us.settings, '$.fontSize'),         12),
    'sectionCollapsed', COALESCE(json_extract(us.settings, '$.sectionCollapsed'), json('{}')),
    'isRawMode',        COALESCE(json_extract(us.settings, '$.isRawMode'),        json('false'))
)
FROM user_settings us
WHERE us.user_id = resumes.user_id
  AND (resumes.settings IS NULL OR resumes.settings = '' OR resumes.settings = '{}');

-- 2. Resumes whose owner has no user_settings → stamp hard-coded defaults.
UPDATE resumes
SET settings = json_object(
    'selectedFont',     'Calibri',
    'selectedTemplate', 'default',
    'fontSize',         12,
    'sectionCollapsed', json('{}'),
    'isRawMode',        json('false')
)
WHERE settings IS NULL OR settings = '' OR settings = '{}';

-- 3. Language from user_settings.locale where available.
UPDATE resumes
SET language = json_extract(us.settings, '$.locale')
FROM user_settings us
WHERE us.user_id = resumes.user_id
  AND resumes.language IS NULL
  AND json_extract(us.settings, '$.locale') IS NOT NULL;

-- 4. Remaining NULL language → 'en'.
UPDATE resumes SET language = 'en' WHERE language IS NULL;

-- 5. Fix resumes.template scalar — historically stuck at 'template1' for every row
--    because the old code never wrote to it. Align it with the newly-populated
--    settings.selectedTemplate JSON (single source of truth going forward).
UPDATE resumes
SET template = COALESCE(json_extract(settings, '$.selectedTemplate'), 'default')
WHERE template = 'template1' OR template IS NULL OR template = '';
