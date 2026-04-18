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

UPDATE resumes
SET data = json_remove(data, '$.sectionHeadersI18n')
WHERE json_extract(data, '$.sectionHeadersI18n') IS NOT NULL;

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
