import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import RoomOccu from "./RoomOccu"

let bdName = " ";

const FloorOccu = (props) => {
	function callBack(f) {
		props.floor_o.f = f;
	}
	const selectedOptions = props.selectedOptions;
	const [selectData, setSelectData] = useState(props.data);
	// set the dimensions and margins of the graph

	const mainBarSvg = useRef(null);
	const margin = {top: 10, right: 10, bottom: 10, left: 30},
	width = 445 - margin.left - margin.right,
	height = 445 - margin.top - margin.bottom;
	props.callBack(setSelectData);

	let colorScale = d3.scaleThreshold()
                    .domain([props.selectedOptions.selectedOption_green,props.selectedOptions.selectedOption_yellow])
                    .range(['green','yellow','red']);

//	useEffect(() => {

		if(selectData === null)
		{
			//nothing
		}else{
				props.floor_o.f(null);
				props.floor_o.f(props.floor_o.roomData);
//				d3.select(mainBarSvg.current).remove();
				d3.selectAll(".selection99").remove();

				console.log(props.selectedOptions.selectedOption_green);

        const svg = d3.select(mainBarSvg.current)
  //                      .append("svg")
  //                      .attr("width", width + margin.left + margin.right+10)
  //                      .attr("height", height + margin.top + margin.bottom+10)
  //                      .append("g")
                        	.attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xAxis = d3.scaleLinear()
                        .domain([0, 100])
                        .range([ 0, width]);

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height})`)
						.attr("class", "selection99")
            .call(d3.axisBottom(xAxis).tickFormat((d) =>'').tickSize(0));

        let floorList = selectData.floors.map(d => d.floor + ' 층');
        floorList.reverse();
        // Y axis
        const yAxis = d3.scaleBand()
                    .range([ 0, height ])
                    .domain(floorList)
                    .padding(.1);

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${0})`)
						.attr("class", "selection99")
            .call(d3.axisLeft(yAxis));
        floorList.reverse();

        // append the svg object to the body of the page
        //console.log();

        //console.log(selectData);
        // use this information to add rectangles:
				svg.append('g')
            .attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
            .selectAll("rect")
            .data(selectData.floors)
            .enter()
            .append("rect")
            .attr('x', xAxis(0))
            .attr('y', (d,i) => yAxis(floorList[i]))
            .attr('width', xAxis(100))
            .attr('height', yAxis.bandwidth())
						.style("fill", "White")
            .style("stroke", "Black")

        svg.append('g')
            .attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
//						.attr("class", (d,i) => "element" + i)
            .selectAll("rect")
            .data(selectData.floors)
            .enter()
            .append("rect")
            .attr('x', xAxis(0))
            .attr('y', (d,i) => yAxis(floorList[i]))
            .attr('width', d => xAxis(d.occupancy/d.capacity*100))
            .attr('height', yAxis.bandwidth())
            .style("fill", d => (d.occuancy/d.capacity*100) === 0 ? 'white' : colorScale((d.occupancy/d.capacity*100)));

				svg.append('g')
            .attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
//						.attr("class", (d,i) => "element" + i)
            .selectAll("text")
            .data(selectData.floors)
            .join("text")
            .attr('x', d => xAxis((d.occupancy/d.capacity*50)-3))
            .attr('y', (d,i) => yAxis(floorList[i]) + (yAxis.bandwidth()/2+4))
						.text((d) => Math.round(d.occupancy/d.capacity*100)+'%')
            .attr("font-size", "12px")
            .style("fill", "black");

				svg.selectAll('rect')
						.on('click', function(d, i) {
							switch (selectData.bdNumber) {
								case "33":
								props.floor_o.roomData = props.roomData[i.floor-1];
								break;
								case "301":
								props.floor_o.roomData = props.roomData2[i.floor-1];
								break;
								case "302":
								props.floor_o.roomData = props.roomData3[i.floor-1];
								break;
								default:
							}
							props.floor_o.f(props.floor_o.roomData);
						}
					);
		}
//	},[selectData]);

	return (
		<div class="splotContainerx" style={{
			width: '1000px',
			height: '700px'
		}}>
			<h1 style={{marginLeft: 20, marginTop: 10, marginBottom: 0, fontSize: 25}}>
			{selectData === null ? ' ' : selectData.bdNumber+"동 "+selectData.bdName}
			</h1>
			<div id= "Floor" class="splotContainer3" style={{
				width: '500px',
				height: '700px'
			}}>
				<svg ref={mainBarSvg} width={width+35} height={height+30} > </svg>
			</div>
			<div id='roomView' class="splotContainer4" style={{
				width: '400px',
				height: '700px'
			}}>
				<RoomOccu
					data = {props.floor_o.roomData}
					callBack={callBack}
					selectedOptions={selectedOptions}
				/>
			</div>
		</div>
	)
};

export default FloorOccu;
