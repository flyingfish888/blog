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
          children: [
            {
              title: '内置对象',
              collapsable: true,
              sidebarDepth: 3,
              children: [
                'built-in-object/Object/',
                'built-in-object/Array/',
                'built-in-object/Function/',
                'built-in-object/String/',
                'built-in-object/Boolean/',
                'built-in-object/Number/',
                'built-in-object/Date/',
                'built-in-object/Math/',
                'built-in-object/RegExp/',
              ]
            },
            {
              title: '知识点',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                'knowledge/judge-type',
                'knowledge/for-in-of',
              ]
            },
            {
              title: '函数',
              collapsable: true,
              sidebarDepth: 1,
              children: [
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
      '/build-tools/': [
        {
          title: '构建工具',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              title: 'Gulp',
              collapsable: false,
              sidebarDepth: 1,
              children: [
                'gulp/',
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
