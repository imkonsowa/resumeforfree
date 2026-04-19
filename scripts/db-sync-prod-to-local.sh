#!/usr/bin/env bash
set -euo pipefail

DB_NAME="resume-builder-db"
DUMP_DIR="ignore"
DUMP_FILE="${DUMP_DIR}/prod-dump-$(date +%Y%m%d-%H%M%S).sql"

mkdir -p "$DUMP_DIR"

echo "==> Exporting production D1 ($DB_NAME) to $DUMP_FILE"
npx wrangler d1 export "$DB_NAME" --remote --output="$DUMP_FILE"

echo "==> Wiping local D1 state"
rm -rf .wrangler/state/v3/d1

echo "==> Importing dump into local D1"
npx wrangler d1 execute "$DB_NAME" --local --file="$DUMP_FILE"

echo "==> Row counts (local)"
npx wrangler d1 execute "$DB_NAME" --local \
    --command="SELECT 'users' AS table_name, COUNT(*) AS rows FROM users UNION ALL SELECT 'resumes', COUNT(*) FROM resumes UNION ALL SELECT 'user_settings', COUNT(*) FROM user_settings;"

echo ""
echo "Done. Dump kept at: $DUMP_FILE"
echo "Delete manually when no longer needed."
