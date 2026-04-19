UPDATE resumes
SET data = json_set(
    data,
    '$.projects',
    (
        SELECT json_group_array(
            json_set(
                json_remove(p.value, '$.url'),
                '$.links',
                CASE
                    WHEN json_type(p.value, '$.links') = 'array'
                         AND json_array_length(p.value, '$.links') > 0
                        THEN json_extract(p.value, '$.links')
                    WHEN json_type(p.value, '$.url') = 'text'
                         AND TRIM(json_extract(p.value, '$.url')) != ''
                        THEN json_array(json_object(
                            'url', TRIM(json_extract(p.value, '$.url')),
                            'label', CASE
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%github.com%' THEN 'GitHub'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%gitlab.com%' THEN 'GitLab'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%bitbucket.org%' THEN 'Bitbucket'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%medium.com%' THEN 'Medium'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%dev.to%' THEN 'Dev.to'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%vercel.app%' THEN 'Live Demo'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%netlify.app%' THEN 'Live Demo'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%pages.dev%' THEN 'Live Demo'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%herokuapp.com%' THEN 'Live Demo'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%youtube.com%' THEN 'YouTube'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%youtu.be%' THEN 'YouTube'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%linkedin.com%' THEN 'LinkedIn'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%twitter.com%' THEN 'Twitter'
                                WHEN LOWER(json_extract(p.value, '$.url')) LIKE '%x.com%' THEN 'Twitter'
                                ELSE 'Link'
                            END
                        ))
                    ELSE COALESCE(json_extract(p.value, '$.links'), json('[]'))
                END
            )
        )
        FROM json_each(json_extract(data, '$.projects')) AS p
    )
)
WHERE json_type(data, '$.projects') = 'array'
  AND json_array_length(data, '$.projects') > 0;
