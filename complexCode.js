/* 
Filename: complexCode.js

This code is a complex implementation that demonstrates a real-time data visualization using D3.js library.
It fetches data from a CSV file, performs data manipulation, and creates an interactive bar chart.

Note: To execute this code, you need to have the D3.js library included in your project.

*/

// Import necessary libraries
const d3 = require("d3");

// Define constants
const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// Create SVG container
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Fetch data from CSV
d3.csv("data.csv").then((data) => {
  // Convert data types and sort by a specific field
  data.forEach((d) => {
    d.value = +d.value;
  });
  data.sort((a, b) => b.value - a.value);

  // Define x and y scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .rangeRound([0, width])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0]);

  // Draw x and y axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  svg.append("g").call(yAxis);

  // Create bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .style("fill", "steelblue")
    .attr("x", (d) => xScale(d.label))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.value));

  // Add interactivity to bars
  svg
    .selectAll("rect")
    .on("mouseover", function (d) {
      d3.select(this).style("fill", "orange");
    })
    .on("mouseout", function (d) {
      d3.select(this).style("fill", "steelblue");
    })
    .on("click", function (d) {
      console.log(`Clicked on ${d.label}`);
    });

});