import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth()+1;
let date = today.getDate();
let day = today.getDay();
let timeDivide = ['9','9:30','10','10:30','11','11:30','12','12:30','13','13:30','14','14:30','15','15:30','16','16:30','17','17:30'];
let dayDivide = ['Mon','Tue','Wed','Thu','Fri'];

const TrendView = (props) => {

	const [trendData, setTrendData] = useState(props.selectObject_o.state);
	// set the dimensions and margins of the graph
	props.callBack(setTrendData); // 갱신시 state 변경해서 rerendering 하려고 걸어 두었음.

	//props.selectObject_o.state = fdsjkljsdlkjflskj;
  //setTrendData(props.selectObject_o.state);

	const univTrend = useRef(null);
	const buildingTrend = useRef(null);
	const floorTrend = useRef(null);
	const roomTrend = useRef(null);

	const univTrendSvg = d3.select(univTrend.current);
	const buildingTrendSvg = d3.select(buildingTrend.current);
	const floorTrendSvg = d3.select(floorTrend.current);
	const roomTrendSvg = d3.select(roomTrend.current);

	let dayUnivTrend = props.getHalfHourTrendOfUniversityCrowdDensity(year+'-'+month+'-'+date);
	let dayBuildingTrend = props.getHalfHourTrendOfBuildingCrowdDensity(301, year+'-'+month+'-'+date);
	let dayFloorTrend = props.getHalfHourTrendOfBuildingFloorDensity(301, 1, year+'-'+month+'-'+date);
	let dayRoomTrend = props.getHalfHourTrendOfBuildingRoomDensity(301, 1, 118, year+'-'+month+'-'+date);

	let startEndDate = changeMonFri();

	let weekUnivTrend = props.getDayTrendOfUniversityCrowdDensity(year+'-'+startEndDate[0]+'-'+startEndDate[1],year+'-'+startEndDate[2]+'-'+startEndDate[3]);
	let weekBuildingTrend = props.getDayTrendOfBuildingCrowdDensity(301, year+'-'+startEndDate[0]+'-'+startEndDate[1],year+'-'+startEndDate[2]+'-'+startEndDate[3]);
	let weekFloorTrend = props.getDayTrendOfBuildingFloorDensity(301, 1, year+'-'+startEndDate[0]+'-'+startEndDate[1],year+'-'+startEndDate[2]+'-'+startEndDate[3]);
	let weekRoomTrend = props.getDayTrendOfBuildingRoomDensity(301, 1, 118, year+'-'+startEndDate[0]+'-'+startEndDate[1],year+'-'+startEndDate[2]+'-'+startEndDate[3]);



	//makeDayUnivTrend(dayUnivTrend);
	//makeDayBuildingTrend(dayBuildingTrend);
	//makedayFloorTrend(dayFloorTrend);
	//makedayRoomTrend(dayRoomTrend);

	 makeWeekUnivTrend(weekUnivTrend);
	 makeWeekBuildingTrend(weekBuildingTrend);
	 makeWeekFloorTrend(weekFloorTrend);
	 makeWeekRoomTrend(weekRoomTrend);


/////////////////////////////////////////////////////////////////////////////////////////////////////////TODO dayDivide가 5개이므로 MainPlot의 거 18개중에 5개만 가져오든지 해야함 시간순으로 가져와야되긴함.(아니면 5개만 놔두는건가?)


	function makeDayUnivTrend(dayUnivTrend)
	{
		let dayUnivTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		univTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(dayUnivTrendxScale));

		let dayUnivTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(dayUnivTrend.reserve_occupancy_trend)])
							.range([80,0]);

		univTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(dayUnivTrendyScale).ticks(3));

		let dayUnivTrendBar = univTrendSvg.selectAll('.dayUnivTrendBar').data(dayUnivTrend.reserve_occupancy_trend);
		let dayUnivTrendBarQr = univTrendSvg.selectAll('.dayUnivTrendBarQr').data(dayUnivTrend.bq_occupancy_trend);

		dayUnivTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'dayUnivTrendBar')
						.merge(dayUnivTrendBar)
						.attr('x', (d,i) => dayUnivTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayUnivTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayUnivTrendyScale(d));
		dayUnivTrendBar.exit().remove();

		dayUnivTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'dayUnivTrendBarQr')
						.merge(dayUnivTrendBar)
						.attr('x', (d,i) => dayUnivTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayUnivTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayUnivTrendyScale(d));
		dayUnivTrendBarQr.exit().remove();
	}

	function makeDayBuildingTrend(dayBuildingTrend)
	{
		let dayBuildingTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		buildingTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(dayBuildingTrendxScale));

		let dayBuildingTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(dayBuildingTrend.reserve_occupancy_trend)])
							.range([80,0]);

		buildingTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(dayBuildingTrendyScale).ticks(3));

		let dayBuildingTrendBar = buildingTrendSvg.selectAll('.dayBuildingTrendBar').data(dayBuildingTrend.reserve_occupancy_trend);
		let dayBuildingTrendBarQr = buildingTrendSvg.selectAll('.dayBuildingTrendBarQr').data(dayBuildingTrend.bq_occupancy_trend);

		dayBuildingTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'dayBuildingTrendBar')
						.merge(dayBuildingTrendBar)
						.attr('x', (d,i) => dayBuildingTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayBuildingTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayBuildingTrendyScale(d));
		dayBuildingTrendBar.exit().remove();

		dayBuildingTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'dayBuildingTrendBarQr')
						.merge(dayBuildingTrendBar)
						.attr('x', (d,i) => dayBuildingTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayBuildingTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayBuildingTrendyScale(d));
		dayBuildingTrendBarQr.exit().remove();
	}

	function makedayFloorTrend(dayFloorTrend)
	{
		let dayFloorTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		floorTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(dayFloorTrendxScale));

		let dayFloorTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(dayFloorTrend.reserve_occupancy_trend)])
							.range([80,0]);

		floorTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(dayFloorTrendyScale).ticks(3));

		let dayFloorTrendBar = floorTrendSvg.selectAll('.dayFloorTrendBar').data(dayFloorTrend.reserve_occupancy_trend);
		let dayFloorTrendBarQr = floorTrendSvg.selectAll('.dayFloorTrendBarQr').data(dayFloorTrend.bq_occupancy_trend);

		dayFloorTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'dayFloorTrendBar')
						.merge(dayFloorTrendBar)
						.attr('x', (d,i) => dayFloorTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayFloorTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayFloorTrendyScale(d));
		dayFloorTrendBar.exit().remove();

		dayFloorTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'dayFloorTrendBarQr')
						.merge(dayFloorTrendBar)
						.attr('x', (d,i) => dayFloorTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayFloorTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayFloorTrendyScale(d));
		dayFloorTrendBarQr.exit().remove();
	}

	function makedayRoomTrend(dayRoomTrend)
	{
		let dayRoomTrendxScale = d3.scaleBand()
									.domain(timeDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		roomTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(dayRoomTrendxScale));

		let dayRoomTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(dayRoomTrend.reserve_occupancy_trend)])
							.range([80,0]);

		roomTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(dayRoomTrendyScale).ticks(3));

		let dayRoomTrendBar = roomTrendSvg.selectAll('.dayRoomTrendBar').data(dayRoomTrend.reserve_occupancy_trend);
		let dayRoomTrendBarQr = roomTrendSvg.selectAll('.dayRoomTrendBarQr').data(dayRoomTrend.bq_occupancy_trend);

		dayRoomTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'dayRoomTrendBar')
						.merge(dayRoomTrendBar)
						.attr('x', (d,i) => dayRoomTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayRoomTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayRoomTrendyScale(d));
		dayRoomTrendBar.exit().remove();

		dayRoomTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'dayRoomTrendBarQr')
						.merge(dayRoomTrendBar)
						.attr('x', (d,i) => dayRoomTrendxScale(timeDivide[i]))
						.attr('y', (d) => dayRoomTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-dayRoomTrendyScale(d));
		dayRoomTrendBarQr.exit().remove();
	}

	function makeWeekUnivTrend(weekUnivTrend)
	{
		let weekUnivTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		univTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(weekUnivTrendxScale));

		let weekUnivTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(weekUnivTrend.reserve_occupancy_trend)])
							.range([80,0]);

		univTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(weekUnivTrendyScale).ticks(3));

		let weekUnivTrendBar = univTrendSvg.selectAll('.weekUnivTrendBar').data(weekUnivTrend.reserve_occupancy_trend);
		let weekUnivTrendBarQr = univTrendSvg.selectAll('.weekUnivTrendBarQr').data(weekUnivTrend.bq_occupancy_trend);

		weekUnivTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'weekUnivTrendBar')
						.merge(weekUnivTrendBar)
						.attr('x', (d,i) => weekUnivTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekUnivTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekUnivTrendyScale(d));
		weekUnivTrendBar.exit().remove();

		weekUnivTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'weekUnivTrendBarQr')
						.merge(weekUnivTrendBar)
						.attr('x', (d,i) => weekUnivTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekUnivTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekUnivTrendyScale(d));
		weekUnivTrendBarQr.exit().remove();
	}

	function makeWeekBuildingTrend(weekBuildingTrend)
	{
		let weekBuildingTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		buildingTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(weekBuildingTrendxScale));

		let weekBuildingTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(weekBuildingTrend.reserve_occupancy_trend)])
							.range([80,0]);

		buildingTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(weekBuildingTrendyScale).ticks(3));

		let weekBuildingTrendBar = buildingTrendSvg.selectAll('.weekBuildingTrendBar').data(weekBuildingTrend.reserve_occupancy_trend);
		let weekBuildingTrendBarQr = buildingTrendSvg.selectAll('.weekBuildingTrendBarQr').data(weekBuildingTrend.bq_occupancy_trend);

		weekBuildingTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'weekBuildingTrendBar')
						.merge(weekBuildingTrendBar)
						.attr('x', (d,i) => weekBuildingTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekBuildingTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekBuildingTrendyScale(d));
		weekBuildingTrendBar.exit().remove();

		weekBuildingTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'weekBuildingTrendBarQr')
						.merge(weekBuildingTrendBar)
						.attr('x', (d,i) => weekBuildingTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekBuildingTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekBuildingTrendyScale(d));
		weekBuildingTrendBarQr.exit().remove();
	}

	function makeWeekFloorTrend(weekFloorTrend)
	{
		let weekFloorTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		floorTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(weekFloorTrendxScale));

		let weekFloorTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(weekFloorTrend.reserve_occupancy_trend)])
							.range([80,0]);

		floorTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(weekFloorTrendyScale).ticks(3));

		let weekFloorTrendBar = floorTrendSvg.selectAll('.weekFloorTrendBar').data(weekFloorTrend.reserve_occupancy_trend);
		let weekFloorTrendBarQr = floorTrendSvg.selectAll('.weekFloorTrendBarQr').data(weekFloorTrend.bq_occupancy_trend);

		weekFloorTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'weekFloorTrendBar')
						.merge(weekFloorTrendBar)
						.attr('x', (d,i) => weekFloorTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekFloorTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekFloorTrendyScale(d));
		weekFloorTrendBar.exit().remove();

		weekFloorTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'weekFloorTrendBarQr')
						.merge(weekFloorTrendBar)
						.attr('x', (d,i) => weekFloorTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekFloorTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekFloorTrendyScale(d));
		weekFloorTrendBarQr.exit().remove();
	}

	function makeWeekRoomTrend(weekRoomTrend)
	{
		let weekRoomTrendxScale = d3.scaleBand()
									.domain(dayDivide)
									.range([0, 1300])
									.align(0.5)
									.padding(0.3);

		roomTrendSvg.append('g')
				.attr('transform', `translate(${40}, ${80+20})`)
				.call(d3.axisBottom(weekRoomTrendxScale));

		let weekRoomTrendyScale = d3.scaleLinear()
							.domain([0,	d3.max(weekRoomTrend.reserve_occupancy_trend)])
							.range([80,0]);

		roomTrendSvg.append('g')
			.attr('transform', `translate(${40}, ${20})`)
			.call(d3.axisLeft(weekRoomTrendyScale).ticks(3));

		let weekRoomTrendBar = roomTrendSvg.selectAll('.weekRoomTrendBar').data(weekRoomTrend.reserve_occupancy_trend);
		let weekRoomTrendBarQr = roomTrendSvg.selectAll('.weekRoomTrendBarQr').data(weekRoomTrend.bq_occupancy_trend);

		weekRoomTrendBar.enter()
						.append('rect')
						.attr('transform', `translate(${35}, ${20})`)
						.attr('class', 'weekRoomTrendBar')
						.merge(weekRoomTrendBar)
						.attr('x', (d,i) => weekRoomTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekRoomTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekRoomTrendyScale(d));
		weekRoomTrendBar.exit().remove();

		weekRoomTrendBarQr.enter()
						.append('rect')
						.attr('transform', `translate(${65}, ${20})`)
						.attr('class', 'weekRoomTrendBarQr')
						.merge(weekRoomTrendBar)
						.attr('x', (d,i) => weekRoomTrendxScale(dayDivide[i]))
						.attr('y', (d) => weekRoomTrendyScale(d))
						.attr('width', 30)
						.attr('height', (d) => 80-weekRoomTrendyScale(d));
		weekRoomTrendBarQr.exit().remove();
	}




	function changeMonFri() {
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
		if(startDate<=0)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : startMonth = month-1;
							startDate = startDate+30;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : startMonth = month-1;
							startDate = startDate+29;
							break;
				case 2 : startMonth = month-1;
							startDate = startDate+27;
							break;
			}
		}
		if(startDate>31)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : startMonth = month+1;
							startDate = startDate-31;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : startMonth = month+1;
							startDate = startDate-30;
							break;
				case 2 : startMonth = month+1;
							startDate = startDate-28;
							break;
			}
		}
		else if(startDate==31)
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
				case 11 : startMonth = month+1;
							startDate = startDate-30;
							break;
				case 2 : startMonth = month+1;
							startDate = startDate-28;
							break;
			}
		}
		else if(startDate>=29)
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
				case 2 : startMonth = month+1;
							startDate = startDate-28;
							break;
			}
		}
		if(endDate<=0)
		{
			switch(month) {

				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : endMonth = month-1;
							endDate = endDate+30;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : endMonth = month-1;
							endDate = endDate+29;
							break;
				case 2 : endMonth = month-1;
							endDate = endDate+27;
							break;
			}
		}
		if(endDate>31)
		{
			switch(month) {
				case 1 :
				case 3 :
				case 5 :
				case 7 :
				case 8 :
				case 10 :
				case 12 : endMonth = month+1;
							endDate = endDate-31;
							break;
				case 4 :
				case 6 :
				case 9 :
				case 11 : endMonth = month+1;
							endDate = endDate-30;
							break;
				case 2 : endMonth = month+1;
							endDate = endDate-28;
							break;
			}
		}
		else if(endDate==31)
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
				case 11 : endMonth = month+1;
							endDate = endDate-30;
							break;
				case 2 : endMonth = month+1;
							endDate = endDate-28;
							break;
			}
		}
		else if(endDate>=29)
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
				case 2 : endMonth = month+1;
							endDate = endDate-28;
							break;
			}
		}
		let startEndDate = [startMonth,startDate,endMonth,endDate];

		return startEndDate;
	}






	// function makeAxis(data)
	// {
	// 	//Bar chart x axis
	// 	let barxScale = d3.scaleBand()
	// 						.domain(['x','y'])
	// 						.range([0, props.size])
	// 						.align(0.5)
	// 						.padding(props.barPadding);

	// 	const barxAxis = d3.axisBottom(barxScale);

	// 	barsvg.append('g')
	// 			.attr('transform', `translate(${props.margin+1}, ${props.size+props.margin})`)
	// 			.call(barxAxis);

	// 	//Bar chart y asix
	// 	let baryScale = d3.scaleLinear()
	// 						.domain([0,	Math.max(xmean+xdev, ymean+ydev)])
	// 						.range([props.size,0]);

	// 	const baryAxis = d3.axisLeft(baryScale);

	// 	d3.select('.ybaraxis').remove();
	// 	barsvg.append('g')
	// 		.attr('transform', `translate(${props.margin+1}, ${props.margin})`)
	// 		.attr('class', 'ybaraxis')
	// 		.call(baryAxis);
	// }

	// makeBar(props.data);

	// function makeBar(selectedData)
	// {
	// 	//Calculate mean & deviation
	// 	let xmean = d3.mean(selectedData, d => d.x);
	// 	let ymean = d3.mean(selectedData, d => d.y);
	// 	let xdev = d3.deviation(selectedData, d => d.x);
	// 	let ydev = d3.deviation(selectedData, d => d.y);
	// 	let xyarr = ['x','y'];
	// 	let meanarr = [xmean,ymean];
	// 	let devarr = [xdev,ydev];
	// 	let colorarr = ['red','skyblue']

	// 	//For merge & exit
	// 	let bars = barsvg.selectAll('rect').data(selectedData);
	// 	let ebars = barsvg.selectAll('line.first').data(selectedData);

	// 	//Bar chart
	// 	bars.enter()
	// 		.append('rect')
	// 		.attr('transform', `translate(${props.margin+1}, ${props.margin})`)
	// 		.merge(bars)
	// 		.attr('x', (d,i) => barxScale(xyarr[i]))
	// 		.attr('y', (d,i) => baryScale(meanarr[i]))
	// 		.attr('width', barxScale.bandwidth())
	// 		.attr('height', (d,i) => props.size-baryScale(meanarr[i]))
	// 		.style('fill', (d,i) => colorarr[i]);
	// 	bars.exit().remove();

	// 	//Bar chart errorBar
	// 	ebars.enter()
	// 		.append('line')
	// 		.attr("stroke", "black")
	// 		.attr('transform', `translate(${props.margin+1}, ${props.margin})`)
	// 		.attr('class','first')
	// 		.merge(ebars)
	// 		.attr('x1',(d,i) => (barxScale(xyarr[i])+barxScale.bandwidth()/2))
	// 		.attr('y1', (d,i) => baryScale(meanarr[i]+devarr[i]))
	// 		.attr('x2',(d,i) => (barxScale(xyarr[i])+barxScale.bandwidth()/2))
	// 		.attr('y2', (d,i) => baryScale(meanarr[i]-devarr[i]));
	// 	ebars.exit().remove();
	// }










// 1500 * 500 에 사이즈 맞춰주면 thx
	return (
		<div>
			<div>

			</div>
			<div class="splotContainerx" style={{
				width: '1500px',
				height: '500px'
			}}>
				<svg ref={univTrend} width={1400} height={120}>
				</svg>
				<svg ref={buildingTrend} width={1400} height={120}>
				</svg>
				<svg ref={floorTrend} width={1400} height={120}>
				</svg>
				<svg ref={roomTrend} width={1400} height={120}>
				</svg>

			</div>
		</div>
	)
};

export default TrendView;
