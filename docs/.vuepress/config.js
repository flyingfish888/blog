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
      ],
      '/vue/': [
        {
          title: 'Vue知识原理',
          collapsable: false,
          sidebarDepth: 1,
          children: ['bindData/']
        }
      ],
      '/micro-frontends/': [
        {
          title: '微前端',
          collapsable: false,
          sidebarDepth: 2,
          children: ['knowledge/basic/', 'qiankun/']
        }
      ],
      '/d3js/': [
        {
          title: 'D3js',
          collapsable: false,
          sidebarDepth: 1,
          children: ['introduction/']
        }
      ],
      '/nodejs/': [
        {
          title: 'NodeJS',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Gulp',
              collapsable: false,
              sidebarDepth: 1,
              children: [
                ['gulp/', '基础知识'],
              ]
            },
          ]
        }
      ],
      '/browser/': [
        {
          title: '浏览器相关',
          collapsable: false,
          sidebarDepth: 1,
          children: ['chrome/']
        }
      ],
      '/computer/': [
        {
          title: '计算机原理',
          collapsable: false,
          sidebarDepth: 1,
          children: ['cpu/']
        }
      ]
    }
  }
}
