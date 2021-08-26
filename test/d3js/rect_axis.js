const svgW = 600;
const svgH = 600;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgW)
              .attr('height', svgH);


const margin = { top: 60, bottom: 60, left: 60, right: 60 } // 设置边距
const dataset = [ 250 , 210 , 170 , 130 , 90 ];  // 数据（表示矩形的宽度）

const g = svg.append('g')
              .attr('transform', `translate(${margin.top}, ${margin.left})`);

const rectHeight = 30; // 矩形的高度

// #region scale
// 定义一个线性比例尺
const xScale = d3.scaleLinear()
                .domain([0,d3.max(dataset)])
                .range([0,500]);
console.log('xScale(0)::', xScale(0)); // xScale(0):: 0
console.log('xScale(100)::', xScale(100)); // xScale(100):: 200
console.log('xScale(250)::', xScale(250)); // xScale(250):: 500
// #endregion scale

g.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', 20)
  .attr('y', (d, i) => {
    return i * rectHeight;
  })
  .attr('width', d => xScale(d))
  .attr('height', rectHeight - 5)
  .attr('fill', 'blue');

  // #region axis
  //绘制坐标轴
  const xAxis = d3.axisBottom(xScale) // 定义一个axis，由bottom可知，是朝下的
                .ticks(5); // 设置刻度数目

  const temp = g.append('g')
   .attr('transform', `translate(20, ${dataset.length * rectHeight})`)
   .call(xAxis);

   // xAxis(temp);
   // #endregion axis