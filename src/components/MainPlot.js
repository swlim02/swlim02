import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import ControlPanel from './ControlPanel';
import TableView from './TableView';
import MapContainer from "./MapContainer"

var selectedOptions = new Object();
selectedOptions.selectedOption_x = "imdb_rating";
selectedOptions.selectedOption_y = "us_gross";
selectedOptions.selectedOption_Color = "none"; //none
selectedOptions.selectedOption_Opacity = "none"; //none
selectedOptions.selectedOption_Size = "none"; //none

var tableData_o = new Object();

const MainPlot = (props) => {
  tableData_o.tableData = [];
  const splotSvg = useRef(null);

  const svgWidth = props.margin * 2 + props.width;
  const svgHeight = props.margin * 2 + props.height;

  const controlWidth = svgWidth * 2;
  const controlHeight = 50;

  let xScale;
  let yScale;

  const brush = d3.brush()
										.extent([[0, 0], [props.width, props.height]])
										.on("end", brushed);

  function update_init(){
    xScale = d3.scaleLinear()
      .domain([
      d3.min(props.data, d => d[selectedOptions.selectedOption_x]),
      d3.max(props.data, d => d[selectedOptions.selectedOption_x])
      ])
      .range([0, props.width]);

    yScale = d3.scaleLinear()
      .domain([
      d3.min(props.data, d => d[selectedOptions.selectedOption_y]),
      d3.max(props.data, d => d[selectedOptions.selectedOption_y])
      ])
      .range([props.height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    d3.select(splotSvg.current)
    .append('g')
    .attr("class", "xAxis")
    .attr('transform', `translate(${props.margin}, ${props.height + props.margin})`)
    .call(xAxis);

    d3.select(splotSvg.current)
      .append('g')
      .attr("class", "yAxis")
      .attr('transform', `translate(${props.margin}, ${props.margin})`)
      .call(yAxis);

    d3.select(splotSvg.current)
      .append('g')
      .attr("class", "chartGroup")
      .attr('transform', `translate(${props.margin}, ${props.margin})`)
      .selectAll('circle')
      .data(props.data)
      .enter()
      .append('circle')
//      .join('circle')
      .attr('cx', d => xScale(d[selectedOptions.selectedOption_x]))
      .attr('cy', d => yScale(d[selectedOptions.selectedOption_y]))
      .attr('fill', 'Black')
      .style("fill-opacity", 1)
      .attr('r', props.pointSize);

    d3.select(splotSvg.current)
      .append('g')
      .attr("class", "selection")
      .attr('transform', `translate(${props.margin}, ${props.margin})`)
      .call(brush);
  }

  function update(){
    d3.selectAll(".selected").classed("selected", false);
    tableData_o.tableData = [];
    cb_f(tableData_o.tableData);

    d3.select(".selection").remove();
    d3.select(splotSvg.current)
      .append('g')
      .attr("class", "selection")
      .attr('transform', `translate(${props.margin}, ${props.margin})`)
      .call(brush);

    xScale = d3.scaleLinear()
      .domain([
      d3.min(props.data, d => d[selectedOptions.selectedOption_x]),
      d3.max(props.data, d => d[selectedOptions.selectedOption_x])
      ])
      .range([0, props.width]);

    yScale = d3.scaleLinear()
      .domain([
      d3.min(props.data, d => d[selectedOptions.selectedOption_y]),
      d3.max(props.data, d => d[selectedOptions.selectedOption_y])
      ])
      .range([props.height, 0]);

    let opacityScale = d3.scaleLinear()
      .domain([
      d3.min(props.data, d => d[selectedOptions.selectedOption_Opacity]),
      d3.max(props.data, d => d[selectedOptions.selectedOption_Opacity])
      ])
      .range([0, 1]);
    let sizeScale = d3.scaleLinear()
      .domain([
      d3.min(props.data, d => d[selectedOptions.selectedOption_Size]),
      d3.max(props.data, d => d[selectedOptions.selectedOption_Size])
      ])
      .range([props.pointSize, props.maxPointSize]);

    let nominalSet = new Set();
    props.data.forEach(d => {
       nominalSet.add(d[selectedOptions.selectedOption_Color]);
    })

    let colorScale = d3.scaleOrdinal()
      .domain(nominalSet)
      .range(d3.schemeCategory10);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

//    d3.selectAll(".chartGroup").remove();

    d3.selectAll(".xAxis")
      .transition()
      .duration(1000)
      .attr('transform', `translate(${props.margin}, ${props.height + props.margin})`)
      .call(xAxis);

    d3.selectAll(".yAxis")
      .transition()
      .duration(1000)
      .attr('transform', `translate(${props.margin}, ${props.margin})`)
      .call(yAxis);

    d3.selectAll(".chartGroup")
      .selectAll('circle')
      .data(props.data)
      .join('circle')
      .transition()
      .duration(1000)
//      .enter()
//      .append('circle')
//      .join('circle')
//      .attr('transform', `translate(${props.margin}, ${props.margin})`)
      .attr('cx', d => xScale(d[selectedOptions.selectedOption_x]))
      .attr('cy', d => yScale(d[selectedOptions.selectedOption_y]))
      .attr('fill', function(d) {
        if(selectedOptions.selectedOption_Color === "none") { return "Black"}
        else { return colorScale(d[selectedOptions.selectedOption_Color])};
      })
      .style("fill-opacity", function(d) {
        if(selectedOptions.selectedOption_Opacity === "none") { return 1}
        else { return opacityScale(d[selectedOptions.selectedOption_Opacity])};
      })
      .attr('r', function(d) {
        if(selectedOptions.selectedOption_Size === "none") { return props.pointSize}
        else { return sizeScale(d[selectedOptions.selectedOption_Size])};
      });

  }

  useEffect(() => {
    // clarify type
		props.data.forEach(d => {
      d["budget"] = parseInt(d["budget"]);
      d["us_gross"] = parseInt(d["us_gross"]);
      d["worldwide_gross"] = parseInt(d["worldwide_gross"]);
      d["rotten_rating"] = parseInt(d["rotten_rating"]);
      d["imdb_rating"] = parseFloat(d["imdb_rating"]);
      d["imdb_votes"] = parseInt(d["imdb_votes"].replace(new RegExp(",", 'g'), ""));
		})
    update_init();

    console.log("Main");
    console.log(tableData_o.tableData);

  }, []);

  var cb_f;
  function callBack(f) {
    cb_f = f;
  }

  function brushed({selection}) {
    tableData_o.tableData = []; //clear
    let circle = d3.selectAll('circle');
  	if (selection === null) {
  		d3.selectAll(".selected").classed("selected", false);
  	} else {
  		d3.selectAll(".selected").classed("selected", false);
  		let [[x0, y0], [x1, y1]] = selection;
  		circle.classed("selected", d => {
  			let xCoord = xScale(d[selectedOptions.selectedOption_x]);
  			let yCoord = yScale(d[selectedOptions.selectedOption_y]);
        if (x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1) {
          tableData_o.tableData.push(d);
          return true;
        } else {
          return false;
        }
  		});
  	}
    //console.log("Main2");
    //console.log(tableData_o.tableData);
    //console.log(cb_f);
    cb_f(tableData_o.tableData);
  }
//  const [selectData, setSelectData] = useState(tableData);

  return (
    <div style={{
      height: '1000px'
    }}>
      <div class="splotContainer01" z-index="9999">
        <ControlPanel
          nominal={props.nominal}
          ordinal={props.ordinal}
          quantitative={props.quantitative}
          height={controlHeight}
          width={controlWidth}
          selectedOptions={selectedOptions}
          update_f={update}
          stage={props.stage}
        />
      </div>
      <div class="splotContainer02" z-index="0" style={{
        width: '1400px',
        height: '800px'
      }}>
        <MapContainer
        />
      </div>
    </div>
  )
};

export default MainPlot;
