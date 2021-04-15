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
              title: '函数',
              collapsable: false,
              sidebarDepth: 1,
              children: [
                // ['function/concept', '1. 常见函数'],
                // ['function/tile', '2. 函数平铺']
                // ['function/memorize', '3. 缓存函数'],
                // ['function/carry', '4. 函数柯里化'],
                // ['function/debounce', '5. 函数防抖']
                // ['function/throttle', '6. 函数节流'],
                // ['function/copy/', '7. 深拷贝&浅拷贝']
                'function/concept',
                'function/tile',
                'function/memorize',
                'function/carry',
                'function/debounce',
                'function/throttle',
                'function/copy/'
              ]
            }
          ]
        }
      ]
    }
  }
}