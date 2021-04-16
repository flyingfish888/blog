module.exports = {
  title: '会飞的鱼🐟',
  description: '学习笔记',
  port: 6688,
  themeConfig: {
    sidebar: {
      '/javascript/': [
        {
          title: 'JavaScript',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: '知识点',
              collapsable: false,
              sidebarDepth: 1,
              children: [
                ['knowledge/judge-type', '1. 判断数据类型'],
                ['knowledge/for-in-of', '2. for...in和for...of比较'],
              ]
            },
            {
              title: '函数',
              collapsable: false,
              sidebarDepth: 1,
              children: [
                ['function/concept', '1. 常见函数'],
                ['function/tile', '2. 函数平铺'],
                ['function/memorize','3. 缓存函数'],
                ['function/carry', '4. 柯里化'],
                ['function/debounce', '5. 函数防抖'],
                ['function/throttle', '6. 函数节流'],
                ['function/copy/', '7. 浅拷贝&深拷贝']
              ]
            }
          ]
        }
      ]
    }
  }
}
