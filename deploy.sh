#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist

git init

git add -A

git commit -m 'deploy'

git push -f git@gitee.com:fish-flying/blog.git master:gh-pages

cd -