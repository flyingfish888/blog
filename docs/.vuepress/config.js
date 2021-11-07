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
              title: '知识点',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                'knowledge/class/',
                'knowledge/prototype-chain/',
                'knowledge/judge-type',
                'knowledge/for-in-of',
                'knowledge/memory-management/',
                'knowledge/lexical-scope/'
              ]
            },
            {
              title: '内置对象',
              collapsable: true,
              sidebarDepth: 2,
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
              title: '表达式',
              collapsable: true,
              sidebarDepth: 2,
              children: []
            },
            {
              title: '运算符',
              collapsable: true,
              sidebarDepth: 2,
              children: []
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
                'function/copy/',
                'function/arr-and-tree',
                'function/search-in-array',
                'function/apply-call-bind',
                'function/new'
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
          children: [
            'responsive/',
            'optimize-performance/'
          ]
        }
      ],
      '/browser/': [
        {
          title: '浏览器',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'url/',
            'repaint/',
            'safe/',
            'cache/',
            'local-store/',
            'homology/',
            'chrome/'
          ]
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
            }, {
              title: 'Webpack',
              collapsable: false,
              sidebarDepth: 1,
              children: [
                'webpack/config/',
                'webpack/start/'
              ]
            }
          ]
        }
      ],
      '/computer/': [
        {
          title: '计算机基础',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'cpu/',
            'tcp/',
            'http/'
          ]
        }
      ],
      '/project-practice/': [
        {
          title: '项目实践',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'h5-static/'
          ]
        }
      ]
    }
  }
}
