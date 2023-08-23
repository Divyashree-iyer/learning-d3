const svg = d3.select('#barChart');
const width = +svg.style('width').replace('px', '');
const height = +svg.style('height').replace('px', '');

// 3. margin is used for adding "padding" around the bar chart
const margin = { top: 20, bottom: 90, right: 20, left: 160 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin['top'] - margin.bottom;

// 4. d3.csv does a GET request to the given URL (in this case a local file)
// Once it's loaded into the "data" object, we use an arrow function
// to run the code that creates the chart.
d3.csv('Pokemon.csv').then((data) => {
  console.log(data);

  // 5. This is an example of how to sort JS arrays with a comparator function.
  // Try swapping the "a" and "b" in the compparison statement.
  data.sort(function (a, b) {
    return +b['HP'] - +a['HP'];
  });

  // 6. Only get the first 10 items in the array.
  data = data.slice(0, 10);
  console.log(data);

  // 7. This bit of data wrangling makes it easier to reference the data.
  // You can use your browser's dev tools to see the items and their attributes
  data.forEach((d) => {
    d.HP = +d['HP'];
    d.name = d['Name'];
  });
  console.log(data);

  // 8. Create the scales for the bar chart.
  // The xScale is a "linear" scale and the yScale is a "band" scale.
  // Here's some tutorials on these scale types:
  // https://observablehq.com/@d3/d3-scalelinear
  // https://observablehq.com/@d3/d3-scaleband
  const xScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.HP;
      }),
    ]) // data space
    .range([0, innerWidth]); // pixel space
  const yScale = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .range([0, innerHeight])
    .padding(0.1);

  // 9. Append a 'g' element that's offset by the top and left margins.
  // The commented out line is an example of how to do this using Javascript 'string literals'.
  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  // .attr('transform', 'translate('+margin.left+', '+margin.top+')');

  // 10. This is what adds the rectangles in our bar chart.
  var barchart = g
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', (d) => yScale(d.name))
    .attr('height', yScale.bandwidth())
    .attr('width', function (d) {
      return xScale(d.HP);
    });

  // 11. Add the x-axis and y-axis
  const yAxis = d3.axisLeft(yScale);
  g.append('g').call(yAxis);

  const xAxis = d3.axisBottom(xScale);
  g.append('g')
    .call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`)
    .selectAll('text') // If you want to rotate the axis text,
    .style('text-anchor', 'end') // select it with the selectAll call and
    .attr('dx', '-10px') // and slightly shift it (using dx, dy)
    .attr('dy', '0px') // and then rotate it.
    .attr('transform', 'rotate(-45)');

  // 12. Add axis labels
  g.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', '-140px')
    .attr('x', -innerHeight / 2)
    .attr('text-anchor', 'middle')
    .text('Country');
  g.append('text')
    .attr('class', 'axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight + 70)
    .text('Population');
});
