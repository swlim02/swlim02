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
						console.log("click_a_room");
						console.log(props.selectObject_o);
						if (clickedRectId != this.id) {
							d3.selectAll(".element11"+clickedRectId).style("stroke-width", 1);
							d3.selectAll(".element33"+clickedRectId).attr("font-weight", 300);
							clickedRectId = this.id;
							props.update_trendView_f();
						}
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
			let pre_y = -1;
			let pre_width = -1;
			let accumulated_i = 0;

			svg.selectAll("text")
				.data(root.leaves())
				.attr("class", "selection98")
				.join("text")
				.attr("class", (d, i) => "element33"+d.data.roomNumber)
				.attr("id", (d, i) => d.data.roomNumber)
				.attr("x", function(d){
					return d.x0+2;
				})    // +10 to adjust position (more right)
				.attr("y", function(d,i){
					if ((pre_y === d.y0) && (pre_width < 89)) {
						accumulated_i++;
						pre_width = d.x1 - d.x0;
						return d.y0+17+accumulated_i*15;
					} else {
						pre_y = d.y0;
						accumulated_i = 0;
						pre_width = d.x1 - d.x0;
						return d.y0+17;
					}
				})    // +20 to adjust position (lower)
				.text(function(d){ return [d.data.roomNumber+'호('+d.data.occupancy+'/'+d.data.capacity+')']})
				.attr("font-size", "13px")
				.attr("fill", "black");

/*
			svg.selectAll("text")
				.data(root.leaves())
				.attr("class", "selection98")
				.enter()
      	.append('text')
				.attr("class", (d, i) => "element33"+d.data.roomNumber)
				.attr("id", (d, i) => d.data.roomNumber)
				.selectAll('tspan')
				.data(d => {
					console.log((d.data.roomNumber+'호('+d.data.occupancy+'/'+d.data.capacity+')'));
          return (d.data.roomNumber+'호('+d.data.occupancy+'/'+d.data.capacity+')').split(/(?=[A-Z][^A-Z])/g) // split the name of movie
              .map(v => {
                  return {
                      text: v,
                      x0: d.x0,                        // keep x0 reference
                      y0: d.y0                         // keep y0 reference
                  }
              });
      	})
				.enter()
      	.append('tspan')
				.attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
				.attr("y", function(d,i){ return d.y0+17+(i * 10)})    // +20 to adjust position (lower)
				.text((d) => d.text)
				.attr("font-size", "13px")
				.attr("fill", "black");
*/

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
			<svg ref={mainTreemapSvg} width={width+80} height={height+20}> </svg>
		</div>
		</fragment>
	)
};

export default RoomOccu;
