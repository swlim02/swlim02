import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import ControlPanel from './ControlPanel';
import MapContainer from "./MapContainer";
import TrendView from "./TrendView";
// TODO @hskim 데이터를, 실제 요일 데이터로 넣어주세요.
import SNUBuildingCrowdDensityInfo_Mon from "../data/SNUBuildingCrowdDensityInfo_Mon.json";
import SNUBuildingCrowdDensityInfo_Tue from "../data/SNUBuildingCrowdDensityInfo_Mon.json";
import SNUBuildingCrowdDensityInfo_WED from "../data/SNUBuildingCrowdDensityInfo_Mon.json";
import SNUBuildingCrowdDensityInfo_THU from "../data/SNUBuildingCrowdDensityInfo_Mon.json";
import SNUBuildingCrowdDensityInfo_FRI from "../data/SNUBuildingCrowdDensityInfo_Mon.json";

var selectedOptions = new Object();
let selectObject_o = new Object();
let today = new Date();
let SNUBuildingCrowdDensityInfo;

let year = today.getFullYear();
let month = today.getMonth()+1;
let date = today.getDate();
let day = today.getDay();
let UniversityCrowdDensity = new Object();

const MainPlot = (props) => {

  selectObject_o.bdNumber = null;
  selectObject_o.floor = null;
  selectObject_o.roomNumber = null;
  selectObject_o.state = selectObject_o.bdNumber + selectObject_o.floor + selectObject_o.roomNumber;
  selectObject_o.date = [year,month,date,day];

  var cb_f;
  function callBack(f) {
    cb_f = f;
  }

  var cb_trend_f;
  function trendCallBack(f) {
    cb_trend_f = f;
  }

  // @swlim 개발 - 이해안가면 물어 보삼
  function getUniversityCrowdDensity() {
    let UniversityCrowdDensity = new Object();

    switch (today.getDay()) {
      case 1:
        SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_Mon;
        console.log("월요일");
        break;
      case 2:
        SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_Tue;
        break;
      case 3:
        SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_WED;
        break;
      case 4:
        SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_THU;
        break;
      case 5:
      case 0: // 일요일
      case 6: // 토요일 두요일 수업 데이터는 없음. 데모시 금요일로 대체
        SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_FRI;
        break;
      default:
        console.log("여기오면 망한거임");
    }

    let time = 'SNU_' + today.getHours() + ":" + parseInt((today.getMinutes()/15))*15; // 양자화
    console.log (time);
    if (       // 수업이 없는 시간으로 데모 데이터로 고정
        ((today.getHours() === 18) && (today.getMinutes()>14)) ||
        (today.getHours() > 18) ||
        (today.getHours() < 9) ||
        ((today.getHours() === 9) && (today.getMinutes()<30))
      ) {
      time = 'SNU_09:30';
    }

    UniversityCrowdDensity = {
      "capacity": SNUBuildingCrowdDensityInfo[time][0].capacity,
      "occupancy": SNUBuildingCrowdDensityInfo[time][0].occupancy 
    };
    return UniversityCrowdDensity;
  }

  UniversityCrowdDensity = getUniversityCrowdDensity();

  selectedOptions.selectedOption_green = props.stage[0][0];
  selectedOptions.selectedOption_yellow = props.stage[0][0]+props.stage[0][1];
  const splotSvg = useRef(null);

  const svgWidth = props.margin * 2 + props.width;
  const svgHeight = props.margin * 2 + props.height;

  const controlWidth = svgWidth * 2;
  const controlHeight = 50;

  function update_new(){ // 거리두기 수정시 호출되는 함
    console.log("update_new");
    cb_f();
    cb_trend_f(selectObject_o.bdNumber + selectObject_o.floor + selectObject_o.roomNumber
      + selectedOptions.selectedOption_green + selectedOptions.selectedOption_yellow);
  }

  function update_trendView(){ // drlrvyObject (건물,층,룸) 정보 수정시 호출 되는 함
    cb_trend_f(selectObject_o.bdNumber + selectObject_o.floor + selectObject_o.roomNumber
      + selectedOptions.selectedOption_green + selectedOptions.selectedOption_yellow);
  }

 // TODO 아래 function 8개 개발 필요.  @hskim @swlim
  function getHalfHourTrendOfUniversityCrowdDensity(date) {
    let HalfHourTrend = new Object();
    HalfHourTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per 15 mins
        200000, 300000, 100000, 20000, 30000, 20000, 20000, 30000, 20000,
        20000, 30000, 10000, 20000, 30000, 20000, 20000, 30000, 20000 ],
     "bq_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ]
    }
    return HalfHourTrend;
  }

  function getHalfHourTrendOfBuildingCrowdDensity(bdNumber, date) {
    let HalfHourTrend = new Object();
    HalfHourTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ],
     "bq_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ]
    }
    return HalfHourTrend;
  }

  function getHalfHourTrendOfBuildingFloorDensity(bdNumber, floor, date) {
    let HalfHourTrend = new Object();
    HalfHourTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ],
     "bq_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ]
    }
    return HalfHourTrend;
  }

  function getHalfHourTrendOfBuildingRoomDensity(bdNumber, floor, roomNumber, date) {
    let HalfHourTrend = new Object();
    HalfHourTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ],
     "bq_occupancy_trend" : [ //per 15 mins
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000,
        20000, 30000, 10000, 20000, 30000, 10000, 20000, 30000, 10000 ]
    }
    return HalfHourTrend;
  }

  function getDayTrendOfUniversityCrowdDensity(startDate,endDate) {
    let DayTrend = new Object();
    DayTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per day
        200000, 300000, 100000, 20000, 30000 ],
     "bq_occupancy_trend" : [ //per day
        20000, 30000, 10000, 20000, 30000 ]
    }
    return DayTrend;
  }

  function getDayTrendOfBuildingCrowdDensity(bdNumber, startDate,endDate) {
    let DayTrend = new Object();
    DayTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per day
        20000, 30000, 10000, 20000, 30000 ],
     "bq_occupancy_trend" : [ //per day
        20000, 30000, 10000, 20000, 30000 ]
    }
    return DayTrend;
  }

  function getDayTrendOfBuildingFloorDensity(bdNumber, floor, startDate,endDate) {
    let DayTrend = new Object();
    DayTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per day
      20000, 30000, 10000, 20000, 30000 ],
     "bq_occupancy_trend" : [ //per day
      20000, 30000, 10000, 20000, 30000 ]
    }
    return DayTrend;
  }

  function getDayTrendOfBuildingRoomDensity(bdNumber, floor, roomNumber, startDate,endDate) {
    let DayTrend = new Object();
    DayTrend = {
     "capacity" : 300000,
     "reserve_occupancy_trend" : [ //per day
      20000, 30000, 10000, 20000, 30000 ],
     "bq_occupancy_trend" : [ //per day
      20000, 30000, 10000, 20000, 30000 ]
    }
    return DayTrend;
  }


  useEffect(() => {

  }, []);



  return (
    <div style={{
      height: '1000px'
    }}>
      <div class="splotContainer01" z-index="9999" style={{
        height: '50px'
      }}>
        <ControlPanel
          nominal={props.nominal}
          ordinal={props.ordinal}
          quantitative={props.quantitative}
          height={controlHeight}
          width={controlWidth}
          selectedOptions={selectedOptions}
          update_f={update_new}
          stage={props.stage}
          UniversityCrowdDensity_o={UniversityCrowdDensity}
        />
      </div>
      <div class="splotContainer02" z-index="0" style={{
        width: '1450px',
        height: '560px'
      }}>
        <MapContainer
        callBack={callBack}
        update_trendView_f={update_trendView} // selectObject_o  값 갱신시 호출해주어야-1
        selectedOptions={selectedOptions}
        selectObject_o={selectObject_o}
        />
      </div>
      <div class="splotContainer03" z-index="0" style={{
        width: '1500px',
        height: '500px'
      }}>
        <TrendView
        callBack={trendCallBack}
        selectedOptions={selectedOptions}
        selectObject_o={selectObject_o}
        getHalfHourTrendOfUniversityCrowdDensity={getHalfHourTrendOfUniversityCrowdDensity}
        getHalfHourTrendOfBuildingCrowdDensity={getHalfHourTrendOfBuildingCrowdDensity}
        getHalfHourTrendOfBuildingFloorDensity={getHalfHourTrendOfBuildingFloorDensity}
        getHalfHourTrendOfBuildingRoomDensity={getHalfHourTrendOfBuildingRoomDensity}
        getDayTrendOfUniversityCrowdDensity={getDayTrendOfUniversityCrowdDensity}
        getDayTrendOfBuildingCrowdDensity={getDayTrendOfBuildingCrowdDensity}
        getDayTrendOfBuildingFloorDensity={getDayTrendOfBuildingFloorDensity}
        getDayTrendOfBuildingRoomDensity={getDayTrendOfBuildingRoomDensity}
        />
      </div>
    </div>
  )
};

export default MainPlot;
