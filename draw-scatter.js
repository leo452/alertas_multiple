async function drawScatter() {
  // your code goes here

  //Access Data
  const dataset = await d3.json("./consolidado.json")


  console.table(dataset[0])



  const width = 500
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 80,
      right: 50,
      bottom: 50,
      left: 50,
    },
  }

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  //Draw your canvas
  const drawCharts = metric =>{

    const xAccessor = d=>+d[metric]
    const yAccessor = d=>+d.NEWS2
    const colorAccessor = d=>+d.Edad

    const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  //Create Scales

  const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset,xAccessor))
      .range([0, dimensions.boundedWidth])
      /* .nice() */
  
  const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset,yAccessor))
      .range([dimensions.boundedHeight,0])
 /*      .nice() */

  const colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset,colorAccessor))
      .range(["skyblue","darkslategrey"])

  /* dataset.forEach(d => {
    bounds.append("circle")
        .attr("cx", xScale(xAccessor(d)))
        .attr("cy", yScale(yAccessor(d)))
        .attr("r", 2)
        .attr("fill", "blue")
  }); */

/*   const dots = bounds.selectAll("circle")
      .data(dataset) */
  
  let dots = bounds.selectAll("circles")
        .data(dataset)
            .enter()
                .append("circle")
                .attr("cx", d=> xScale(xAccessor(d)))
                .attr("cy", d=> yScale(yAccessor(d)))
                .attr("r", 2)
                .attr("fill", d=> colorScale(colorAccessor(d)))
  
  //Create Periphericals

  const xAxisGenerator = d3.axisBottom()
      .scale(xScale)

  const xAxis = bounds.append("g")
      .call(xAxisGenerator)
          .style("transform", `translateY(${
            dimensions.boundedHeight
          }px)`)

  const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
      

  const yAxis = bounds.append("g")
      .call(yAxisGenerator)

  //Create Labels for our axis

  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth/2)
      .attr("y", dimensions.margin.bottom -10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text(metric)

  const yAxisLabel = yAxis.append("text")
      .attr("x", -dimensions.boundedHeight / 2)
      .attr("y", -dimensions.margin.left + 20)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text("NEWS2")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")
  
      
        }
        const metrics = [
          "FR",
          "FC",
          "Temp",
          "TAS",
          "SO2",
          "TAD",
          ]
        metrics.forEach(drawCharts)
  

}
drawScatter()




 
/* drawDots(dataset.slice(0, 200), "darkgrey")
      setTimeout(() => {
        drawDots(dataset, "cornflowerblue")
        }, 2000)

        function drawDots(dataset, color) {
          let dots = bounds.selectAll("circle").data(dataset)
          dots
          .enter().append("circle")
          .merge(dots)
          .attr("cx", d => xScale(xAccessor(d)))
          .attr("cy", d => yScale(yAccessor(d)))
          .attr("r", 5)
          .attr("fill", color)
          console.log(dots)
          } */

