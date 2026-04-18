-- =====================================================================
-- Drop dead locale-related fields.
-- Idempotent: safe to re-run.
--
-- Two cleanups:
--   A) resumes.data.sectionHeadersI18n → flatten to resumes.data.sectionHeaders
--      using resumes.language as the chosen locale, then drop the old field.
--   B) user_settings.settings: drop the resume-level fields that were
--      migrated to resumes.settings by migration 0011
--      (selectedFont, selectedTemplate, fontSize, sectionCollapsed, isRawMode).
-- =====================================================================

-- A) Merge sectionHeadersI18n[resume.language] into sectionHeaders.
--    Priority must match runtime behaviour (app/composables/useSectionHeader.ts):
--      i18n override wins over plain sectionHeaders.
--    Use json_patch(base, overlay) so overlay keys win per-section —
--    preserves headers that only existed in sectionHeaders AND headers that
--    only existed (or were newer) in sectionHeadersI18n[language].
UPDATE resumes
SET data = json_set(
    data,
    '$.sectionHeaders',
    json_patch(
        COALESCE(json_extract(data, '$.sectionHeaders'),                     json('{}')),
        COALESCE(json_extract(data, '$.sectionHeadersI18n.' || language),    json('{}'))
    )
)
WHERE json_extract(data, '$.sectionHeadersI18n') IS NOT NULL;

-- A) Drop the now-redundant sectionHeadersI18n field from every resume.
UPDATE resumes
SET data = json_remove(data, '$.sectionHeadersI18n')
WHERE json_extract(data, '$.sectionHeadersI18n') IS NOT NULL;

-- B) Strip resume-level fields from user_settings.settings JSON.
--    These fields now live on resumes.settings (populated by migration 0011).
UPDATE user_settings
SET settings = json_remove(
    settings,
    '$.selectedFont',
    '$.selectedTemplate',
    '$.fontSize',
    '$.sectionCollapsed',
    '$.isRawMode'
)
WHERE json_extract(settings, '$.selectedFont') IS NOT NULL
   OR json_extract(settings, '$.selectedTemplate') IS NOT NULL
   OR json_extract(settings, '$.fontSize') IS NOT NULL
   OR json_extract(settings, '$.sectionCollapsed') IS NOT NULL
   OR json_extract(settings, '$.isRawMode') IS NOT NULL;
