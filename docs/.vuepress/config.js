module.exports = {
  title: '会飞的鱼🐟',
  description: '学习笔记',
  port: 6688,
  themeConfig: {
    sidebar: {
      '/javascript/': [{
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
      }]
    }
  }
}

// {
//   title: 'JavaScript',
//   collapsable: false,
//   sidebarDepth: 1,
//   children: [
//     'javascript/function/concept',
//     'javascript/function/tile',
//     'javascript/function/memorize',
//     'javascript/function/carry',
//     'javascript/function/debounce',
//     'javascript/function/throttle',
//     'javascript/function/copy/'
//   ]
// }