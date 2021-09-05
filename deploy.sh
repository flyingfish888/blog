#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist

# 为github提供自定义域名解析
echo "blog.flyingfish8.cn" > CNAME

git init

git add -A  

git commit -m 'deploy'

git push -f git@github.com:flyingfish888/blog.git master:gh-pages

rm -rf docs/.vuepress/dist

cd -