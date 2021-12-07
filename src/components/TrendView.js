import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import { func } from "prop-types";

let timeDivide = ['9:30','10','10:30','11','11:30','12','12:30','13','13:30','14','14:30','15','15:30','16','16:30','17','17:30','18'];
let dayDivide = ['Mon','Tue','Wed','Thu','Fri'];
let t = 0;
let s = 0;

const TrendView = (props) => {

	console.log ("TrendView")

	const [trendData, setTrendData] = useState(props.selectObject_o.state);
	// set the dimensions and margins of the graph
	props.callBack(setTrendData); // 갱신시 state 변경해서 rerendering 하려고 걸어 두었음.

	//props.selectObject_o.state = fdsjkljsdlkjflskj;
    //setTrendData(props.selectObject_o.state);

	const [button, setButton] = useState(null);
	const [nowDate, setNowDate] = useState(null);

	const trendInfo = useRef(null);
	const trendDateInfo = useRef(null);
	const univTrend = useRef(null);
	const buildingTrend = useRef(null);
	const floorTrend = useRef(null);
	const roomTrend = useRef(null);

	let trendInfoSvg = d3.select(trendInfo.current);
	let trendDateInfoSvg = d3.select(trendDateInfo.current);
	let univTrendSvg = d3.select(univTrend.current);
	let buildingTrendSvg = d3.select(buildingTrend.current);
	let floorTrendSvg = d3.select(floorTrend.current);
	let roomTrendSvg = d3.select(roomTrend.current);

	const changeButton_per15m = () => {
		d3.selectAll(".button2").style("background", "white");
		d3.selectAll(".button1").style("background", "#bebebe");
		setButton("Day");
		makeDayUnivTrend(dayUnivTrend);
		makeDayBuildingTrend(dayBuildingTrend);
		makeDayFloorTrend(dayFloorTrend);
		makeDayRoomTrend(dayRoomTrend);
		s = 1;
		t = 0;
	}

	const changeButton_perday = () => {
		d3.selectAll(".button1").style("background", "white");
		d3.selectAll(".button2").style("background", "#bebebe");
		setButton("Week");
		makeWeekUnivTrend(weekUnivTrend);
		makeWeekBuildingTrend(weekBuildingTrend);
		makeWeekFloorTrend(weekFloorTrend);
		makeWeekRoomTrend(weekRoomTrend);
		s = 2;
		t = 1;
	}

	const changeDateBefore = () => {
		if (t == 0){
			curDate[2] = curDate[2] - 1;
			curDate[3] = (curDate[3] + 6)%7;
			let a = validDate1(curDate[2],curDate[1]);
			curDate[2] = a[0];
			curDate[1] = a[1];
			console.log(curDate);
			startEndDate = changeMonFri(curDate);
			year = curDate[0];
			month = curDate[1];
			date = curDate[2];
			let b = makeString(year,month,date);
			year = b[0];
			month = b[1];
			date = b[2];
			console.log("11");
			setNowDate(curDate[2]);
			}
		else {
			curDate[2] = curDate[2] - 7;
			let a = validDate1(curDate[2],curDate[1]);
			curDate[2] = a[0];
			curDate[1] = a[1];
			console.log(curDate);
			startEndDate = changeMonFri(curDate);
			year = curDate[0];
			month = curDate[1];
			date = curDate[2];
			let b = makeString(year,month,date);
			year = b[0];
			month = b[1];
			date = b[2];
			console.log("111");
			setNowDate(curDate[2]);
			}
	}

	const changeDateNext = () => {
		if (t == 0){
			curDate[2] = curDate[2] + 1;
			curDate[3] = (curDate[3] + 1)%7;
			let a = validDate1(curDate[2],curDate[1]);
			curDate[2] = a[0];
			curDate[1] = a[1];
			console.log(curDate);
			startEndDate = changeMonFri(curDate);
			year = curDate[0];
			month = curDate[1];
			date = curDate[2];
			let b = makeString(year,month,date);
			year = b[0];
			month = b[1];
			date = b[2];
			console.log("22");
			setNowDate(curDate[2]);
			}
		else {
			curDate[2] = curDate[2] + 7;
			let a = validDate1(curDate[2],curDate[1]);
			curDate[2] = a[0];
			curDate[1] = a[1];
			console.log(curDate);
			startEndDate = changeMonFri(curDate);
			year = curDate[0];
			month = curDate[1];
			date = curDate[2];
			let b = makeString(year,month,date);
			year = b[0];
			month = b[1];
			date = b[2];
			console.log("222");
			setNowDate(curDate[2]);
			}
	}

	function makeString (year,month,date) {

		year = String(year);

		if(month<10)	month = '0'+ String(month);		
		else month = String(month);

		if(date<10)	date = '0'+ String(date);
		else date = String(date);

		return [year,month,date];
	}

	let curDate = props.selectObject_o.date;
	let startEndDate = changeMonFri(curDate);
	let c = makeString(curDate[0],curDate[1],curDate[2]);
	let year = c[0];
	let month = c[1];
	let date = c[2];

	let dayUnivTrend = props.getHalfHourTrendOfUniversityCrowdDensity(year+'-'+month+'-'+date);
	let dayBuildingTrend = props.getHalfHourTrendOfBuildingCrowdDensity(props.selectObject_o.bdNumber, year+'-'+month+'-'+date);
	let dayFloorTrend = props.getHalfHourTrendOfBuildingFloorDensity(props.selectObject_o.bdNumber, props.selectObject_o.floor, year+'-'+month+'-'+date);
	let dayRoomTrend = props.getHalfHourTrendOfBuildingRoomDensity(props.selectObject_o.bdNumber, props.selectObject_o.floor, props.selectObject_o.roomNumber, year+'-'+month+'-'+date);

	let weekUnivTrend = props.getDayTrendOfUniversityCrowdDensity(year+'-'+startEndDate[2]+'-'+startEndDate[0],year+'-'+startEndDate[3]+'-'+startEndDate[1]);
	let weekBuildingTrend = props.getDayTrendOfBuildingCrowdDensity(props.selectObject_o.bdNumber, year+'-'+startEndDate[2]+'-'+startEndDate[0],year+'-'+startEndDate[3]+'-'+startEndDate[1]);
	let weekFloorTrend = props.getDayTrendOfBuildingFloorDensity(props.selectObject_o.bdNumber, props.selectObject_o.floor, year+'-'+startEndDate[2]+'-'+startEndDate[0],year+'-'+startEndDate[3]+'-'+startEndDate[1]);
	let weekRoomTrend = props.getDayTrendOfBuildingRoomDensity(props.selectObject_o.bdNumber, props.selectObject_o.floor, props.selectObject_o.roomNumber, year+'-'+startEndDate[0]+'-'+startEndDate[2],year+'-'+startEndDate[3]+'-'+startEndDate[1]);

	let trendInfoBar1 = trendInfoSvg.selectAll('.trendInfo1').data(curDate);
	let trendInfoBar2 = trendInfoSvg.selectAll('.trendInfo2').data(curDate);

	trendInfoBar1.join('rect')
				.attr('class', 'trendInfo1')
				.attr('x', 5)
				.attr('y', 2)
				.attr('width', 15)
				.attr('height', 20)
				.style("fill", 'gray');


	trendInfoBar2.join('rect')
				.attr('class', 'trendInfo2')
				.attr('x', 21)
				.attr('y', 7)
				.attr('width', 15)
				.attr('height', 15)
				.style("fill", 'gray');
	
	
	if(t == 0){			
		let trendDateInfoText = trendDateInfoSvg.selectAll('.trendDateInfo').data(curDate);

		console.log('trendDateInfoText');

		trendDateInfoText.join('text')
							.attr('class', 'trendDateInfo')
							.text(curDate[0]+'-'+curDate[1]+'-'+curDate[2])
							.attr('x', 150)
							.attr('y', 15)
							.attr("font-size", "15px")
							.attr("text-anchor","middle")
							.style("fill",'black');
	}
	else{
		let trendDateInfoText = trendDateInfoSvg.selectAll('.trendDateInfo').data(curDate);

		console.log('trendDateInfoText');

		trendDateInfoText.join('text')
							.attr('class', 'trendDateInfo')
							.text(curDate[0]+'-'+startEndDate[2]+'-'+startEndDate[0]+' ~ '+curDate[0]+'-'+startEndDate[3]+'-'+startEndDate[1])
							.attr('x', 150)
							.attr('y', 15)
							.attr("font-size", "15px")
							.attr("text-anchor","middle")
							.style("fill",'black');
	}

/*
	trendInfoSvg
				.append('line')
//				.attr('class', 'trendInfo2')
//				.merge(trendInfoBar2)
				.attr('x1', 31)
				.attr('y1', 13)
				.attr('x2', 41)
				.attr('y2', 13)
				.attr("stroke", 'Black')
				.attr('stroke-width', 1);
		trendInfoSvg
					.append('line')
	//				.attr('class', 'trendInfo2')
	//				.merge(trendInfoBar2)
					.attr('x1', 1)
					.attr('y1', 13)
					.attr('x2', 11)
					.attr('y2', 13)
					.attr("stroke", 'Black')
					.attr('stroke-width', 1);
//	trendInfoBar2.exit().remove();
*/

	let colorScale = d3.scaleThreshold()
						.domain([props.selectedOptions.selectedOption_green,props.selectedOptions.selectedOption_yellow])
						.range(['green','yellow','red']);

	function makeDayUnivTrend(dayUnivTrend)
	{
		if(dayUnivTrend === null){
			d3.selectAll(".chartGroupUniv").remove();
			d3.selectAll(".dayUnivTrendBar").remove();
			d3.selectAll(".dayUnivTrendBarQr").remove();
			d3.selectAll(".weekUnivTrendBar").remove();
			d3.selectAll(".weekUnivTrendBarQr").remove();
		}
		else{
		t = 0;
		let dayUnivTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupUniv").remove();

		univTrendSvg.append('g')
					.attr("class", "chartGroupUniv")
					.attr('transform', `translate(${40}, ${80+20})`)
					.call(d3.axisBottom(dayUnivTrendxScale));

		let dayUnivTrendyScale = d3.scaleLinear()
							.domain([0,	100])
							.range([80,0]);

		univTrendSvg.append('g')
					.attr("class", "chartGroupUniv")
					.attr('transform', `translate(${40}, ${20})`)
					.call(d3.axisLeft(dayUnivTrendyScale).ticks(3));

		d3.selectAll(".dayUnivTrendBar").remove();
		d3.selectAll(".dayUnivTrendBarQr").remove();
		d3.selectAll(".weekUnivTrendBar").remove();
		d3.selectAll(".weekUnivTrendBarQr").remove();
		let univCapacity = dayUnivTrend.capacity;
		let dayUnivTrendBar = univTrendSvg.selectAll('.dayUnivTrendBar').data(dayUnivTrend.reserve_occupancy_trend);
		let dayUnivTrendBarQr = univTrendSvg.selectAll('.dayUnivTrendBarQr').data(dayUnivTrend.bq_occupancy_trend);

		dayUnivTrendBar	.join('rect')
						.attr('transform', `translate(${50}, ${20})`)
						.attr('class', 'dayUnivTrendBar')
						.attr('x', (d,i) => dayUnivTrendxScale(timeDivide[i]))
						.attr('y', (d) => (dayUnivTrendyScale(d/univCapacity*100)))
						.attr('width', 15)
						.attr('height', (d) => 80-(dayUnivTrendyScale(d/univCapacity*100)))
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));

		dayUnivTrendBarQr.join('rect')
						.attr('transform', `translate(${67}, ${20})`)
						.attr('class', 'dayUnivTrendBarQr')
						.attr('x', (d,i) => dayUnivTrendxScale(timeDivide[i]))
						.attr('y', (d) => (dayUnivTrendyScale(d/univCapacity*100)))
						.attr('width', 15)
						.attr('height', (d) => 80-(dayUnivTrendyScale(d/univCapacity*100)))
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));
		}

/*
		dayUnivTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${50}, ${20})`)
						.attr('class', 'dayUnivTrendBar')
						.merge(dayUnivTrendBar)
						.attr('x', (d,i) => dayUnivTrendxScale(timeDivide[i]))
						.attr('y', (d) => (dayUnivTrendyScale(d/univCapacity*100)))
						.attr('width', 15)
						.attr('height', (d) => 80-(dayUnivTrendyScale(d/univCapacity*100)))
						.attr('stroke','black')
						.attr('stroke-width', 1.5)
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));
		dayUnivTrendBar.exit().remove();
		dayUnivTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${67}, ${20})`)
						.attr('class', 'dayUnivTrendBarQr')
						.merge(dayUnivTrendBar)
						.attr('x', (d,i) => dayUnivTrendxScale(timeDivide[i]))
						.attr('y', (d) => (dayUnivTrendyScale(d/univCapacity*100)))
						.attr('width', 15)
						.attr('height', (d) => 80-(dayUnivTrendyScale(d/univCapacity*100)))
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));
		dayUnivTrendBarQr.exit().remove();
*/
	}

	function makeDayBuildingTrend(dayBuildingTrend)
	{
		if(dayBuildingTrend === null){
			d3.selectAll(".chartGroupBuilding").remove();
			d3.selectAll(".dayBuildingTrendBar").remove();
			d3.selectAll(".dayBuildingTrendBarQr").remove();
			d3.selectAll(".weekBuildingTrendBar").remove();
			d3.selectAll(".weekBuildingTrendBarQr").remove();
		}
		else{
		t = 0;
		let dayBuildingTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupBuilding").remove();

		buildingTrendSvg.append('g')
						.attr('transform', `translate(${40}, ${80+20})`)
						.attr('class', 'chartGroupBuilding')
						.call(d3.axisBottom(dayBuildingTrendxScale));

		let dayBuildingTrendyScale = d3.scaleLinear()
										.domain([0,	100])
										.range([80,0]);

		buildingTrendSvg.append('g')
						.attr('transform', `translate(${40}, ${20})`)
						.attr('class', 'chartGroupBuilding')
						.call(d3.axisLeft(dayBuildingTrendyScale).ticks(3));

		d3.selectAll(".dayBuildingTrendBar").remove();
		d3.selectAll(".dayBuildingTrendBarQr").remove();
		d3.selectAll(".weekBuildingTrendBar").remove();
		d3.selectAll(".weekBuildingTrendBarQr").remove();
		let buildingCapacity = dayBuildingTrend.capacity;
		let dayBuildingTrendBar = buildingTrendSvg.selectAll('.dayBuildingTrendBar').data(dayBuildingTrend.reserve_occupancy_trend);
		let dayBuildingTrendBarQr = buildingTrendSvg.selectAll('.dayBuildingTrendBarQr').data(dayBuildingTrend.bq_occupancy_trend);

		dayBuildingTrendBar.join('rect')
							.attr('transform', `translate(${50}, ${20})`)
							.attr('class', 'dayBuildingTrendBar')
							.attr('x', (d,i) => dayBuildingTrendxScale(timeDivide[i]))
							.attr('y', (d) => dayBuildingTrendyScale(d/buildingCapacity*100))
							.attr('width', 15)
							.attr('height', (d) => 80-dayBuildingTrendyScale(d/buildingCapacity*100))
							.style("fill", d => (d/buildingCapacity*100) === 0 ? 'white' : colorScale(d/buildingCapacity*100));
		dayBuildingTrendBarQr.join('rect')
							.attr('transform', `translate(${67}, ${20})`)
							.attr('class', 'dayBuildingTrendBarQr')
							.attr('x', (d,i) => dayBuildingTrendxScale(timeDivide[i]))
							.attr('y', (d) => dayBuildingTrendyScale(d/buildingCapacity*100))
							.attr('width', 15)
							.attr('height', (d) => 80-dayBuildingTrendyScale(d/buildingCapacity*100))
							.style("fill", d => (d/buildingCapacity*100) === 0 ? 'white' : colorScale(d/buildingCapacity*100));
		}
	}

	function makeDayFloorTrend(dayFloorTrend)
	{
		if(dayFloorTrend === null){
			d3.selectAll(".chartGroupFloor").remove();
			d3.selectAll(".dayFloorTrendBar").remove();
			d3.selectAll(".dayFloorTrendBarQr").remove();
			d3.selectAll(".weekFloorTrendBar").remove();
			d3.selectAll(".weekFloorTrendBarQr").remove();
		}
		else{
			t = 0;
		let dayFloorTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupFloor").remove();

		floorTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.attr('class', 'chartGroupFloor')
				.call(d3.axisBottom(dayFloorTrendxScale));

		let dayFloorTrendyScale = d3.scaleLinear()
							.domain([0,	100])
							.range([80,0]);

		floorTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.attr('class', 'chartGroupFloor')
			.call(d3.axisLeft(dayFloorTrendyScale).ticks(3));

		d3.selectAll(".dayFloorTrendBar").remove();
		d3.selectAll(".dayFloorTrendBarQr").remove();
		d3.selectAll(".weekFloorTrendBar").remove();
		d3.selectAll(".weekFloorTrendBarQr").remove();
		let floorCapacity = dayFloorTrend.capacity;
		let dayFloorTrendBar = floorTrendSvg.selectAll('.dayFloorTrendBar').data(dayFloorTrend.reserve_occupancy_trend);
		let dayFloorTrendBarQr = floorTrendSvg.selectAll('.dayFloorTrendBarQr').data(dayFloorTrend.bq_occupancy_trend);

		dayFloorTrendBar.join('rect')
						.attr('transform', `translate(${50}, ${20})`)
						.attr('class', 'dayFloorTrendBar')
						.attr('x', (d,i) => dayFloorTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayFloorTrendyScale(d/floorCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-dayFloorTrendyScale(d/floorCapacity*100))
						.style("fill", d => (d/floorCapacity*100) === 0 ? 'white' : colorScale(d/floorCapacity*100));
		dayFloorTrendBarQr.join('rect')
						.attr('transform', `translate(${67}, ${20})`)
						.attr('class', 'dayFloorTrendBarQr')
						.attr('x', (d,i) => dayFloorTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayFloorTrendyScale(d/floorCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-dayFloorTrendyScale(d/floorCapacity*100))
						.style("fill", d => (d/floorCapacity*100) === 0 ? 'white' : colorScale(d/floorCapacity*100));
		}
	}

	function makeDayRoomTrend(dayRoomTrend)
	{
		if(dayRoomTrend === null){
			d3.selectAll(".chartGroupRoom").remove();
			d3.selectAll(".dayRoomTrendBar").remove();
			d3.selectAll(".dayRoomTrendBarQr").remove();
			d3.selectAll(".weekRoomTrendBar").remove();
			d3.selectAll(".weekRoomTrendBarQr").remove();
		}
		else{
			t = 0;
		let dayRoomTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupRoom").remove();

		roomTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.attr('class', 'chartGroupRoom')
				.call(d3.axisBottom(dayRoomTrendxScale));

		let dayRoomTrendyScale = d3.scaleLinear()
							.domain([0,	100])
							.range([80,0]);

		roomTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.attr('class', 'chartGroupRoom')
			.call(d3.axisLeft(dayRoomTrendyScale).ticks(3));

		d3.selectAll(".dayRoomTrendBar").remove();
		d3.selectAll(".dayRoomTrendBarQr").remove();
		d3.selectAll(".weekRoomTrendBar").remove();
		d3.selectAll(".weekRoomTrendBarQr").remove();
		let roomCapacity = dayRoomTrend.capacity;
		let dayRoomTrendBar = roomTrendSvg.selectAll('.dayRoomTrendBar').data(dayRoomTrend.reserve_occupancy_trend);
		let dayRoomTrendBarQr = roomTrendSvg.selectAll('.dayRoomTrendBarQr').data(dayRoomTrend.bq_occupancy_trend);

		dayRoomTrendBar.join('rect')
						.attr('transform', `translate(${50}, ${20})`)
						.attr('class', 'dayRoomTrendBar')
						.attr('x', (d,i) => dayRoomTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayRoomTrendyScale(d/roomCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-dayRoomTrendyScale(d/roomCapacity*100))
						.style("fill", d => (d/roomCapacity*100) === 0 ? 'white' : colorScale(d/roomCapacity*100));

		dayRoomTrendBarQr.join('rect')
						.attr('transform', `translate(${67}, ${20})`)
						.attr('class', 'dayRoomTrendBarQr')
						.attr('x', (d,i) => dayRoomTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayRoomTrendyScale(d/roomCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-dayRoomTrendyScale(d/roomCapacity*100))
						.style("fill", d => (d/roomCapacity*100) === 0 ? 'white' : colorScale(d/roomCapacity*100));
		}
	}

	function makeWeekUnivTrend(weekUnivTrend)
	{
		if(weekUnivTrend === null){
			d3.selectAll(".chartGroupUniv").remove();
			d3.selectAll(".weekUnivTrendBar").remove();
			d3.selectAll(".weekUnivTrendBarQr").remove();
			d3.selectAll(".dayUnivTrendBar").remove();
			d3.selectAll(".dayUnivTrendBarQr").remove();
		}
		else{
		t = 1;
		let weekUnivTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupUniv").remove();

		univTrendSvg.append('g')
					.attr("class", "chartGroupUniv")
					.attr('transform', `translate(${40}, ${80+20})`)
					.call(d3.axisBottom(weekUnivTrendxScale));

		let weekUnivTrendyScale = d3.scaleLinear()
									.domain([0,	100])
									.range([80,0]);

		univTrendSvg.append('g')
					.attr("class", "chartGroupUniv")
					.attr('transform', `translate(${40}, ${20})`)
					.call(d3.axisLeft(weekUnivTrendyScale).ticks(3));

		d3.selectAll(".weekUnivTrendBar").remove();
		d3.selectAll(".weekUnivTrendBarQr").remove();
		d3.selectAll(".dayUnivTrendBar").remove();
		d3.selectAll(".dayUnivTrendBarQr").remove();
		let univCapacity = weekUnivTrend.capacity;
		let weekUnivTrendBar = univTrendSvg.selectAll('.weekUnivTrendBar').data(weekUnivTrend.reserve_occupancy_trend);
		let weekUnivTrendBarQr = univTrendSvg.selectAll('.weekUnivTrendBarQr').data(weekUnivTrend.bq_occupancy_trend);

		weekUnivTrendBar.join('rect')
						.attr('transform', `translate(${110}, ${20})`)
						.attr('class', 'weekUnivTrendBar')
						.attr('x', (d,i) => weekUnivTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekUnivTrendyScale(d/univCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekUnivTrendyScale(d/univCapacity*100))
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));

		weekUnivTrendBarQr.join('rect')
						.attr('transform', `translate(${127}, ${20})`)
						.attr('class', 'weekUnivTrendBarQr')
						.attr('x', (d,i) => weekUnivTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekUnivTrendyScale(d/univCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekUnivTrendyScale(d/univCapacity*100))
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));
		}

/*
		weekUnivTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${110}, ${20})`)
						.attr('class', 'weekUnivTrendBar')
						.merge(weekUnivTrendBar)
						.attr('x', (d,i) => weekUnivTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekUnivTrendyScale(d/univCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekUnivTrendyScale(d/univCapacity*100))
						.attr('stroke','black')
						.attr('stroke-width', 1.5)
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));
		weekUnivTrendBar.exit().remove();
		weekUnivTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${125}, ${20})`)
						.attr('class', 'weekUnivTrendBarQr')
						.merge(weekUnivTrendBar)
						.attr('x', (d,i) => weekUnivTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekUnivTrendyScale(d/univCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekUnivTrendyScale(d/univCapacity*100))
						.style("fill", d => (d/univCapacity*100) === 0 ? 'white' : colorScale(d/univCapacity*100));
		weekUnivTrendBarQr.exit().remove();
*/
	}

	function makeWeekBuildingTrend(weekBuildingTrend)
	{
		if(weekBuildingTrend === null){
			d3.selectAll(".chartGroupBuilding").remove();
			d3.selectAll(".weekBuildingTrendBar").remove();
			d3.selectAll(".weekBuildingTrendBarQr").remove();
			d3.selectAll(".dayBuildingTrendBar").remove();
			d3.selectAll(".dayBuildingTrendBarQr").remove();
		}
		else{
			t = 1;
		let weekBuildingTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupBuilding").remove();

		buildingTrendSvg.append('g')
						.attr('transform', `translate(${40}, ${80+20})`)
						.attr('class', 'chartGroupBuilding')
						.call(d3.axisBottom(weekBuildingTrendxScale));

		let weekBuildingTrendyScale = d3.scaleLinear()
										.domain([0,	100])
										.range([80,0]);

		buildingTrendSvg.append('g')
						.attr('transform', `translate(${40}, ${20})`)
						.attr('class', 'chartGroupBuilding')
						.call(d3.axisLeft(weekBuildingTrendyScale).ticks(3));

		d3.selectAll(".weekBuildingTrendBar").remove();
		d3.selectAll(".weekBuildingTrendBarQr").remove();
		d3.selectAll(".dayBuildingTrendBar").remove();
		d3.selectAll(".dayBuildingTrendBarQr").remove();
		let buildingCapacity = weekBuildingTrend.capacity;
		let weekBuildingTrendBar = buildingTrendSvg.selectAll('.weekBuildingTrendBar').data(weekBuildingTrend.reserve_occupancy_trend);
		let weekBuildingTrendBarQr = buildingTrendSvg.selectAll('.weekBuildingTrendBarQr').data(weekBuildingTrend.bq_occupancy_trend);

		weekBuildingTrendBar.join('rect')
							.attr('transform', `translate(${110}, ${20})`)
							.attr('class', 'weekBuildingTrendBar')
							.attr('x', (d,i) => weekBuildingTrendxScale(dayDivide[i]))
							.attr('y', (d) => weekBuildingTrendyScale(d/buildingCapacity*100))
							.attr('width', 15)
							.attr('height', (d) => 80-weekBuildingTrendyScale(d/buildingCapacity*100))
							.style("fill", d => (d/buildingCapacity*100) === 0 ? 'white' : colorScale(d/buildingCapacity*100));

		weekBuildingTrendBarQr.join('rect')
								.attr('transform', `translate(${127}, ${20})`)
								.attr('class', 'weekBuildingTrendBarQr')
								.attr('x', (d,i) => weekBuildingTrendxScale(dayDivide[i]))
								.attr('y', (d) => weekBuildingTrendyScale(d/buildingCapacity*100))
								.attr('width', 15)
								.attr('height', (d) => 80-weekBuildingTrendyScale(d/buildingCapacity*100))
								.style("fill", d => (d/buildingCapacity*100) === 0 ? 'white' : colorScale(d/buildingCapacity*100));
		}
	}

	function makeWeekFloorTrend(weekFloorTrend)
	{
		if(weekFloorTrend === null){
			d3.selectAll(".chartGroupFloor").remove();
			d3.selectAll(".weekFloorTrendBar").remove();
			d3.selectAll(".weekFloorTrendBarQr").remove();
			d3.selectAll(".dayFloorTrendBar").remove();
			d3.selectAll(".dayFloorTrendBarQr").remove();
		}
		else{
			t = 1;
		let weekFloorTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupFloor").remove();

		floorTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.attr('class', 'chartGroupFloor')
				.call(d3.axisBottom(weekFloorTrendxScale));

		let weekFloorTrendyScale = d3.scaleLinear()
							.domain([0,	100])
							.range([80,0]);

		floorTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.attr('class', 'chartGroupFloor')
			.call(d3.axisLeft(weekFloorTrendyScale).ticks(3));

		d3.selectAll(".weekFloorTrendBar").remove();
		d3.selectAll(".weekFloorTrendBarQr").remove();
		d3.selectAll(".dayFloorTrendBar").remove();
		d3.selectAll(".dayFloorTrendBarQr").remove();
		let floorCapacity = weekFloorTrend.capacity;
		let weekFloorTrendBar = floorTrendSvg.selectAll('.weekFloorTrendBar').data(weekFloorTrend.reserve_occupancy_trend);
		let weekFloorTrendBarQr = floorTrendSvg.selectAll('.weekFloorTrendBarQr').data(weekFloorTrend.bq_occupancy_trend);

		weekFloorTrendBar.join('rect')
						.attr('transform', `translate(${110}, ${20})`)
						.attr('class', 'weekFloorTrendBar')
						.attr('x', (d,i) => weekFloorTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekFloorTrendyScale(d/floorCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekFloorTrendyScale(d/floorCapacity*100))
						.style("fill", d => (d/floorCapacity*100) === 0 ? 'white' : colorScale(d/floorCapacity*100));
		weekFloorTrendBarQr.join('rect')
						.attr('transform', `translate(${127}, ${20})`)
						.attr('class', 'weekFloorTrendBarQr')
						.attr('x', (d,i) => weekFloorTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekFloorTrendyScale(d/floorCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekFloorTrendyScale(d/floorCapacity*100))
						.style("fill", d => (d/floorCapacity*100) === 0 ? 'white' : colorScale(d/floorCapacity*100));
		}
	}

	function makeWeekRoomTrend(weekRoomTrend)
	{
		if(weekRoomTrend === null){
			d3.selectAll(".chartGroupRoom").remove();
			d3.selectAll(".weekRoomTrendBar").remove();
			d3.selectAll(".weekRoomTrendBarQr").remove();
			d3.selectAll(".dayRoomTrendBar").remove();
			d3.selectAll(".dayRoomTrendBarQr").remove();
		}
		else{
			t = 1;
		let weekRoomTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		d3.selectAll(".chartGroupRoom").remove();

		roomTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.attr('class', 'chartGroupRoom')
				.call(d3.axisBottom(weekRoomTrendxScale));

		let weekRoomTrendyScale = d3.scaleLinear()
							.domain([0,	100])
							.range([80,0]);

		roomTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.attr('class', 'chartGroupRoom')
			.call(d3.axisLeft(weekRoomTrendyScale).ticks(3));

		d3.selectAll(".weekRoomTrendBar").remove();
		d3.selectAll(".weekRoomTrendBarQr").remove();
		d3.selectAll(".dayRoomTrendBar").remove();
		d3.selectAll(".dayRoomTrendBarQr").remove();
		let roomCapacity = weekRoomTrend.capacity;
		let weekRoomTrendBar = roomTrendSvg.selectAll('.weekRoomTrendBar').data(weekRoomTrend.reserve_occupancy_trend);
		let weekRoomTrendBarQr = roomTrendSvg.selectAll('.weekRoomTrendBarQr').data(weekRoomTrend.bq_occupancy_trend);

		weekRoomTrendBar.join('rect')
						.attr('transform', `translate(${110}, ${20})`)
						.attr('class', 'weekRoomTrendBar')
						.attr('x', (d,i) => weekRoomTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekRoomTrendyScale(d/roomCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekRoomTrendyScale(d/roomCapacity*100))
						.style("fill", d => (d/roomCapacity*100) === 0 ? 'white' : colorScale(d/roomCapacity*100));
		weekRoomTrendBarQr.join('rect')
						.attr('transform', `translate(${127}, ${20})`)
						.attr('class', 'weekRoomTrendBarQr')
						.attr('x', (d,i) => weekRoomTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekRoomTrendyScale(d/roomCapacity*100))
						.attr('width', 15)
						.attr('height', (d) => 80-weekRoomTrendyScale(d/roomCapacity*100))
						.style("fill", d => (d/roomCapacity*100) === 0 ? 'white' : colorScale(d/roomCapacity*100));
		}
	}

	function changeMonFri(curDate) {

		let month = curDate[1];
		let date = curDate[2];
		let day = curDate[3];
		var startDate = date;
		var endDate = date;
		var startMonth = month;
		var endMonth = month;
		// var startyear;
		// var endyear;
		switch(day) {
			case 0 : startDate = date+1;
					endDate = date+5;
					break;
			case 1 : startDate = date;
					endDate = date+4;
					break;
			case 2 : startDate = date-1;
					endDate = date+3;
					break;
			case 3 : startDate = date-2;
					endDate = date+2;
					break;
			case 4 : startDate = date-3;
					endDate = date+1;
					break;
			case 5 : startDate = date-4;
					endDate = date;
					break;
			case 6 : startDate = date-5;
					endDate = date-1;
					break;
		}

		let a = validDate(startDate,startMonth);
		let b = validDate(endDate,endMonth);

		let startEndDate = [a[0],b[0],a[1],b[1]];
		console.log(startEndDate);
		return startEndDate;
	}

	function validDate(date,month){

		if(date<=0)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : month = month-1;
							date = date+30;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : month = month-1;
							date = date+29;
							break;
				case 2 : month = month-1;
							date = date+27;
							break;
			}
		}
		if(date>31)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : month = month+1;
							date = date-31;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : month = month+1;
							date = date-30;
							break;
				case 2 : month = month+1;
							date = date-28;
							break;
			}
		}
		else if(date==31)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : month = month+1;
							date = date-30;
							break;
				case 2 : month = month+1;
							date = date-28;
							break;
			}
		}
		else if(date>=29)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 :
				case 4 :
				case 6 :
				case 9 :
				case 11 : break;
				case 2 : month = month+1;
							date = date-28;
							break;
			}
		}
		return [date,month];
	}

	function validDate1(date,month){

		if(date<=0)
		{
			switch(month-1) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : month = month-1;
							date = date+31;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : month = month-1;
							date = date+30;
							break;
				case 2 : month = month-1;
							date = date+28;
							break;
			}
		}
		if(date>31)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : month = month+1;
							date = date-31;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : month = month+1;
							date = date-30;
							break;
				case 2 : month = month+1;
							date = date-28;
							break;
			}
		}
		else if(date==31)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : month = month+1;
							date = date-30;
							break;
				case 2 : month = month+1;
							date = date-28;
							break;
			}
		}
		else if(date>=29)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 :
				case 4 :
				case 6 :
				case 9 :
				case 11 : break;
				case 2 : month = month+1;
							date = date-28;
							break;
			}
		}

		// if(date<10)
		// {
		// 	date = '0'+date;
		// 	console.log(date-1);
		// }
		return [date,month];
	}

	if(s == 1)
	{
		makeDayUnivTrend(dayUnivTrend);
		makeDayBuildingTrend(dayBuildingTrend);
		makeDayFloorTrend(dayFloorTrend);
		makeDayRoomTrend(dayRoomTrend);
	}
	else if(s == 2)
	{
		makeWeekUnivTrend(weekUnivTrend);
		makeWeekBuildingTrend(weekBuildingTrend);
		makeWeekFloorTrend(weekFloorTrend);
		makeWeekRoomTrend(weekRoomTrend);
	}

// 1500 * 500 에 사이즈 맞춰주면 thx
	return (
		<div>
			<div>

			</div>
			<div style={{
				width: '1400px',
				height: '500px'
			}}>
				<div style={{ display: "flex"}}>
					<div>
						<label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<b>트랜드 보기</b> &nbsp; </label>
					</div>
					<div style={{ border: "1px solid gray", height: "22px"}}>
						<button class="button1" style={{
							marginLeft: '5', background: 'white', border: '0'
						}} onClick={changeButton_per15m}>
							시간별
						</button >
						<button class="button2" style={{
							marginLeft: '5', background: 'white', border: '0'
						}} onClick={changeButton_perday}>
							일간별
						</button >
					</div>
					<div>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
					<div style={{ display: "flex"}}>
						<button style={{marginLeft: 5, height: "20px"}} onClick={changeDateBefore}>
							{button == "Before"} &#60;
						</button>
							<svg ref={trendDateInfo} height={20}>							
							</svg>
						<button style={{marginLeft: 5, height: "20px"}} onClick={changeDateNext}>
							{button == "Next"} &#62;
						</button>
					</div>
					<div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;
					</div>
					<div>
					  <i>수업 정보-</i>
						</div>
						<svg ref={trendInfo} width={37} height={60}>
						</svg>
						<div>
						<i>-바코드 정보</i>
					</div>
					<div>
					&nbsp;&nbsp;<b>|</b>
					</div>
				</div>
				<div style={{ height: "6px", textAlign: 'center'}}>
					<h1 style={{fontSize:"7px"}}> {button === null ? '' : "서울대학교"} </h1>
				</div>
				<div>
					<svg ref={univTrend} width={1400} height={120}>
					</svg>
				</div>
				<div style={{ height: "6px", textAlign: 'center'}}>
					<h1 style={{fontSize:"7px"}}>
						{((button === null) || (props.selectObject_o.bdNumber === null)) ? '' :
							props.selectObject_o.bdNumber+"동"}
					</h1>
				</div>
				<div>
					<svg ref={buildingTrend} width={1400} height={120}>
					</svg>
				</div>
				<div style={{ height: "6px", textAlign: 'center'}}>
					<h1 style={{fontSize:"7px"}}>
						{((button === null) || (props.selectObject_o.floor === null)) ? '' :
							props.selectObject_o.floor+"층"}
					</h1>
				</div>
				<div>
					<svg ref={floorTrend} width={1400} height={120}>
					</svg>
				</div>
				<div style={{ height: "6px", textAlign: 'center'}}>
				<h1 style={{fontSize:"7px"}}>
					{((button === null) || (props.selectObject_o.roomNumber === null)) ? '' :
						props.selectObject_o.roomNumber+"호"}
				</h1>
				</div>
				<div>
					<svg ref={roomTrend} width={1400} height={120}>
					</svg>
				</div>
			</div>
		</div>
	)
};

export default TrendView;