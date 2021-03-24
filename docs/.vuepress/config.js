module.exports = {
  title: '会飞的鱼🐟',
  description: '学习笔记',
  port: 6688,
  themeConfig: {
    nav: [
      { text: '知识原理', link: '/knowledge/' },
      { text: '算法实现', link: '/algorithm/'}
    ],
    sidebar: {
      '/knowledge/': [
        {
          title: '异步事件',
          sidebarDepth: 1,
          children: [
            'async_events/promise.md',
            'async_events/setTimeout.md'
          ]
        }
      ]
    }
  }
}