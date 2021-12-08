import React, { useRef, useState} from "react";
import * as d3 from "d3";
import RoomOccu from "./RoomOccu"

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
                    .range(['#4CAF50','#FFC107','#F44336']);
	let clickedRectId = -1;

//	useEffect(() => {

		if(selectData === null)
		{
			//nothing
		}else{
				props.floor_o.f(null);
				props.floor_o.f(props.floor_o.roomData);
//				d3.select(mainBarSvg.current).remove();
				d3.selectAll(".selection99").remove();

	//			console.log(props.selectedOptions.selectedOption_green);

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

        svg.append('g')
            .attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
//						.attr("class", (d,i) => "element" + i)
            .selectAll("rect")
            .data(selectData.floors)
//            .enter()
//            .append("rect")
						.join("rect")
						.attr("class", (d, i) => "element2"+d.floor)
						.attr("id", (d, i) => d.floor)
            .attr('x', xAxis(0))
            .attr('y', (d,i) => yAxis(floorList[i]))
            .attr('width', d => xAxis(d.occupancy/d.capacity*100))
            .attr('height', yAxis.bandwidth())
            .style("fill", d => (d.occuancy/d.capacity*100) === 0 ? 'white' : colorScale((d.occupancy/d.capacity*100)))
						.style("stroke", "Black")
						.on("mouseenter", function() {
								d3.selectAll(".element1"+this.id).style("stroke-width", 3);
								d3.selectAll(".element3"+this.id).attr("font-weight", 700);
						})
						.on("mouseleave", function() {
							if (clickedRectId === this.id) {
								//nothing
							}else {
								d3.selectAll(".element1"+this.id).style("stroke-width", 1);
								d3.selectAll(".element3"+this.id).attr("font-weight", 300);
							}
						});

				//console.log(selectData);
        // use this information to add rectangles:
				svg.append('g')
            .attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
            .selectAll("rect")
            .data(selectData.floors)
//            .enter()
//            .append("rect")
						.join("rect")
						.attr("class", (d, i) => "element1"+d.floor)
						.attr("id", (d, i) => d.floor)
            .attr('x', xAxis(0))
            .attr('y', (d,i) => yAxis(floorList[i]))
            .attr('width', xAxis(100))
            .attr('height', yAxis.bandwidth())
						.style("fill", "white")
            .style("stroke", "Black")
						.style("fill-opacity", 0.00)
						.on("mouseenter", function() {
								d3.selectAll(".element1"+this.id).style("stroke-width", 3).style("stroke", "gray");
								d3.selectAll(".element3"+this.id).attr("font-weight", 700);
						})
						.on("mouseleave", function() {
//							console.log(clickedRectId);
//							console.log(this.id);
							if (clickedRectId === this.id) {
								//nothing
							}else {
								d3.selectAll(".element1"+this.id).style("stroke-width", 1).style("stroke", "black");
								d3.selectAll(".element3"+this.id).attr("font-weight", 300).style("fill", "black");
							}
						});

				svg.append('g')
            .attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
//						.attr("class", (d,i) => "element" + i)
            .selectAll("text")
            .data(selectData.floors)
            .join("text")
						.attr("class", (d, i) => "element3"+d.floor)
						.attr("id", (d, i) => d.floor)
//            .attr('x', d => xAxis((d.occupancy/d.capacity*50)-3))
						.attr('x', d => Math.round(d.occupancy/d.capacity*100 < 50 ?
							xAxis(Math.round(d.occupancy/d.capacity*100))+5 : xAxis(Math.round(d.occupancy/d.capacity*100))-5 ))
            .attr('y', (d,i) => yAxis(floorList[i]) + (yAxis.bandwidth()/2+4))
						.text((d) => ' '+Math.round(d.occupancy/d.capacity*100)+'% ')
            .attr("font-size", "12px")
						.attr("font-weight", 300)
						.attr("text-anchor", d=> Math.round(d.occupancy/d.capacity*100) < 50 ? "start" : "end")
            .style("fill", "black");


				if (props.selectObject_o.floor != null) {
					clickedRectId = props.selectObject_o.floor;
					d3.selectAll(".element1"+clickedRectId ).style("stroke-width", 3);
					d3.selectAll(".element3"+clickedRectId ).attr("font-weight", 700);
					let x = 406;
					let y = Number(document.getElementsByClassName("element1"+clickedRectId)[0].getAttribute('y'));
					let h = Number(document.getElementsByClassName("element1"+clickedRectId)[0].getAttribute('height'));
					let tempdata = [x , y];

					svg.append("g")
						.attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
						.selectAll("line")
						.data(tempdata)
						.join("line")
						.style("stroke", "black")
						.style("stroke-width", 3)
						.attr('x1',d => x)
						.attr('y1',d => y)
						.attr('x2',d => x+10)
						.attr('y2',d => y+h/2);

					svg.append("g")
						.attr("transform", `translate(${margin.left+1}, ${0})`)
						.attr("class", "selection99")
						.selectAll("line")
						.data(tempdata)
						.join("line")
						.style("stroke", "black")
						.style("stroke-width", 3)
						.attr('x1',d => x+10)
						.attr('y1',d => y+h/2)
						.attr('x2',d => x)
						.attr('y2',d => y+h);
				}

				svg.selectAll('rect')
					.on('click', function(d, i) {
							props.selectObject_o.floor = this.id;
							if (clickedRectId !== this.id) {
								d3.selectAll(".element1"+clickedRectId).style("stroke-width", 1).style("stroke", "black");
								d3.selectAll(".element3"+clickedRectId).attr("font-weight", 300).style("fill", "black");;
								props.selectObject_o.roomNumber = null;
								clickedRectId = this.id;
								props.update_trendView_f();

								svg.selectAll("line")
									.remove();

								let x = 406;
								let y = Number(document.getElementsByClassName("element1"+clickedRectId)[0].getAttribute('y'));
								let h = Number(document.getElementsByClassName("element1"+clickedRectId)[0].getAttribute('height'));
								let tempdata = [x , y];

								svg.append("g")
									.attr("transform", `translate(${margin.left+1}, ${0})`)
									.attr("class", "selection99")
									.selectAll("line")
									.data(tempdata)
									.join("line")
									.style("stroke", "gray")
									.style("stroke-width", 3)
									.attr('x1',d => x)
									.attr('y1',d => y)
									.attr('x2',d => x+10)
									.attr('y2',d => y+h/2);

								svg.append("g")
									.attr("transform", `translate(${margin.left+1}, ${0})`)
									.attr("class", "selection99")
									.selectAll("line")
									.data(tempdata)
									.join("line")
									.style("stroke", "gray")
									.style("stroke-width", 3)
									.attr('x1',d => x+10)
									.attr('y1',d => y+h/2)
									.attr('x2',d => x)
									.attr('y2',d => y+h);

							} else {
								//nothing
							}
							props.floor_o.roomData = props.getFloorDensity(selectData.bdNumber,props.selectObject_o.floor);
							props.floor_o.f(props.floor_o.roomData);
					}
		);
/*
svg.append("g")
	.attr("transform", `translate(${margin.left+1}, ${0})`)
	.call(svg => svg.append("path")
	.style("stroke", "black")
	.style("fill", "none")
	.attr("d", draw(d3.path(),x,y)))
	.node();

		function draw(context,x,y) {
		  context.moveTo(x, y); // move current point to ⟨10,10⟩
		  context.lineTo(x+2, y+100); // draw straight line to ⟨100,10⟩
		  context.lineTo(x, y+200); // draw straight line to ⟨300,10⟩
		  // etc.
		  return context; // not mandatory, but will make it easier to chain operations
		}
*/
	}
//	},[selectData]);

	return (
		<div class="splotContainerx" style={{
			width: '1000px',
			height: '700px'
		}}>
			<h1 style={{marginLeft: 20, marginTop: 10, marginBottom: 0, fontSize: 25, width: '400px'}}>
			{selectData === null ? ' ' : selectData.bdNumber+"동 "+selectData.bdName}
			</h1>
			<div id= "Floor" class="splotContainer3" style={{
				width: '510px',
				height: '700px'
			}}>
				<svg ref={mainBarSvg} width={width+45} height={height+30} > </svg>
			</div>
			<div id='roomView' class="splotContainer4" style={{
				width: '400px',
				height: '700px'
			}}>
				<RoomOccu
					data = {props.floor_o.roomData}
					callBack={callBack}
					selectedOptions={selectedOptions}
					selectObject_o={props.selectObject_o}
          update_trendView_f={props.update_trendView_f} // selectObject_o  값 갱신시 호출해주어야함
				/>
			</div>
		</div>
	)
};

export default FloorOccu;
