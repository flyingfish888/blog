module.exports = {
  title: '会飞的鱼🐟',
  description: '学习笔记',
  port: 6688,
  themeConfig: {
    nav: [
      { 
        text: '前端基础',
        link: '/basics/',
        items: [
          { text: 'JavaScript', link: '/basics/javascript/'},
          { text: 'CSS', link: '/basics/css/'},
          { text: 'HTML', link: '/basics/html/'}
        ]
      }, {
        text: '前端框架', link: '/frame/'
      }, {
        text: '前端工程化', link: '/engineering/'
      }, {
        text: '项目实践', link: '/project-practice/'
      }, {
        text: '浏览器', link: '/browser/'
      }, {
        text: '计算机基础', link: '/computer/'
      }
    ],
    sidebar: {
      // 前端基础
      '/basics/javascript/': [
        {
          title: 'JavaScript基础',
          path: '/basics/javascript/knowledge/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'knowledge/class/',
            'knowledge/prototype-chain/',
            'knowledge/judge-type',
            'knowledge/for-in-of',
            'knowledge/memory-management/',
            'knowledge/lexical-scope/'
          ]
        }, {
          title: '内置对象',
          path: '/basics/javascript/built-in-object/',
          collapsable: false,
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
        }, {
          title: '表达式',
          path: '/basics/javascript/expression/',
          collapsable: false,
          sidebarDepth: 2,
          children: []
        }, {
          title: '运算符',
          path: '/basics/javascript/operator/',
          collapsable: false,
          sidebarDepth: 2,
          children: []
        }, {
          title: '函数',
          path: '/basics/javascript/function/',
          collapsable: false,
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
      ],
      '/basics/css/': [],
      '/basics/html/': [],
      // 前端框架
      '/frame/': [
        {
          title: 'Vue',
          path: '/frame/vue/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'vue/life-cycle/',
            'vue/responsive/',
            'vue/questions/'
          ]
        }, 
        {
          title: 'React',
          path: '/frame/react/',
          collapsable: false,
          sidebarDepth: 1,
          child: []
        }
      ],
      // 前端工程化
      '/engineering/': [
        'gulp/',
        {
          title: 'Webpack',
          path: '/engineering/webpack/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'webpack/config/',
            'webpack/start/'
          ]
        }
      ],
      // 工程实践
      '/project-practice/': [
        {
          title: 'H5静态化',
          path: '/project-practice/h5-static/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'h5-static/programme/'
          ]
        }, {
          title: 'D3js',
          path: '/project-practice/d3js/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'd3js/introduction/'
          ]
        }, {
          title: '微前端',
          path: '/project-practice/micro-frontends/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'micro-frontends/knowledge/', 
            'micro-frontends/qiankun/'
          ]
        }
      ],
      // 浏览器
      '/browser/': [
        {
          title: '浏览器基础',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'basics/url/',
            'basics/repaint/',
            'basics/safe/',
            'basics/cache/',
            'basics/local-store/',
            'basics/homology/'
          ]
        },
        {
          title: '谷歌浏览器',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'chrome/framework/',
            'chrome/performance/',
          ]
        }
      ],
      // 计算机基础
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
      ]
    }
  }
}
