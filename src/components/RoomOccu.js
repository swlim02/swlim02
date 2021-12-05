import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";

const RoomOccu = (props) => {
	const [selectData, setSelectData] = useState(props.data);
	// set the dimensions and margins of the graph
	const mainTreemapSvg = useRef(null);
	const margin = {top: 10, right: 10, bottom: 10, left: 10},
	width = 445 - margin.left - margin.right,
	height = 445 - margin.top - margin.bottom;

	props.callBack(setSelectData);

	let clickedRectId = -1;
//	useEffect(() => {

		if (selectData == null) {
			d3.selectAll(".selection98").remove();
			const svg = d3.select(mainTreemapSvg.current);
			svg.selectAll('rect').remove();
			svg.selectAll('text').remove();
		} else {
			d3.selectAll(".selection98").remove();
			const svg = d3.select(mainTreemapSvg.current);
			svg.selectAll('rect').remove();
			svg.selectAll('text').remove();

			const colorScale = d3.scaleThreshold()
									.domain([(props.selectedOptions.selectedOption_green/100),(props.selectedOptions.selectedOption_yellow/100)])
									.range(['green','yellow','red'])

			// Give the data to this cluster layout:
			const root = d3.hierarchy(selectData).sum(function(d){ return d.capacity}) // Here the size of each leave is given in the 'value' field in input data

			// Then d3.treemap computes the position of each element of the hierarchy
			// The coordinates are added to the root object above
			d3.treemap()
				.size([width, height])
				.padding(4)
				(root)

			// use this information to add rectangles:

			svg.selectAll("rect")
				.data(root.leaves())
				.attr("class", "selection98")
				.join("rect")
				.attr("class", (d, i) => "element11"+d.data.roomNumber)
				.attr("id", (d, i) => d.data.roomNumber)
				.attr('x', function (d) { return d.x0; })
				.attr('y', function (d) { return d.y0; })
				.attr('width', function (d) { return d.x1 - d.x0; })
				.attr('height', function (d) { return d.y1 - d.y0; })
				.style("stroke", "black")
				.style("fill", d => (d.data.occupancy/d.data.capacity) === 0 ? 'white' : colorScale((d.data.occupancy/d.data.capacity)))
				.on("mouseenter", function() {
						d3.selectAll(".element11"+this.id).style("stroke-width", 3);
						d3.selectAll(".element33"+this.id).attr("font-weight", 700);
				})
				.on('click', function() {
						props.selectObject_o.roomNumber = this.id;
						if (clickedRectId != this.id) {
							d3.selectAll(".element11"+clickedRectId).style("stroke-width", 1);
							d3.selectAll(".element33"+clickedRectId).attr("font-weight", 300);
						}
						clickedRectId = this.id;
						console.log("click_a_room");
						console.log(props.selectObject_o);
				})
				.on("mouseleave", function() {
					if (clickedRectId === this.id) {
						//nothing
					}else {
						d3.selectAll(".element11"+this.id).style("stroke-width", 1);
						d3.selectAll(".element33"+this.id).attr("font-weight", 300);
					}
				});

			// and to add the text labels
			svg.selectAll("text")
				.data(root.leaves())
				.attr("class", "selection98")
				.join("text")
				.attr("class", (d, i) => "element33"+d.data.roomNumber)
				.attr("id", (d, i) => d.data.roomNumber)
				.attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
				.attr("y", function(d){ return d.y0+17})    // +20 to adjust position (lower)
				.text(function(d){ return [d.data.roomNumber+'호('+d.data.occupancy+'/'+d.data.capacity+')']})
				.attr("font-size", "13px")
				.attr("fill", "black");

			if (props.selectObject_o.roomNumber != null) {
				clickedRectId = props.selectObject_o.roomNumber;
				d3.selectAll(".element11"+clickedRectId).style("stroke-width", 3);
				d3.selectAll(".element33"+clickedRectId).attr("font-weight", 700);
			}
		}
//	})

	return (
		<fragment>
        <h1 style={{marginLeft: 20, marginTop: 10, marginBottom: 0, fontSize: 25}}>
				{selectData === null ? ' ' : selectData.bdName+ "동 " + selectData.floor + "층"}
        </h1>
		<div id= "Classroom">
			<svg ref={mainTreemapSvg} width={width+20} height={height+20}> </svg>
		</div>
		</fragment>
	)
};

export default RoomOccu;
