const svgW = 600;
const svgH = 600;

const svg = d3.select('body')
              .append('svg')
              .attr('width', svgW)
              .attr('height', svgH);


const margin = 10 // 设置边距
const dataset = [ 250 , 210 , 170 , 130 , 90 ];  // 数据（表示矩形的宽度）

const g = svg.append('g')
              .attr('transform', `translate(${margin}, ${margin})`);

const rectHeight = 30; // 矩形的高度

g.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', 20)
  .attr('y', (d, i) => {
    return i * rectHeight;
  })
  .attr('width', d => d)
  .attr('height', rectHeight - 5)
  .attr('fill', 'blue');
