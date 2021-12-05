import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import ControlPanel from './ControlPanel';
import MapContainer from "./MapContainer";
import TrendView from "./TrendView";

var selectedOptions = new Object();
let selectObject_o = new Object();
let today = new Date();

let year = today.getFullYear();
let month = today.getMonth()+1;
let date = today.getDate();
let day = today.getDay();

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
    cb_trend_f(selectObject_o.bdNumber + selectObject_o.floor + selectObject_o.roomNumber);
  }

  function update_trendView(){ // drlrvyObject (건물,층,룸) 정보 수정시 호출 되는 함수
    cb_trend_f(selectObject_o.bdNumber + selectObject_o.floor + selectObject_o.roomNumber);
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
      <div class="splotContainer01" z-index="9999">
        <ControlPanel
          nominal={props.nominal}
          ordinal={props.ordinal}
          quantitative={props.quantitative}
          height={controlHeight}
          width={controlWidth}
          selectedOptions={selectedOptions}
          update_f={update_new}
          stage={props.stage}
        />
      </div>
      <div class="splotContainer02" z-index="0" style={{
        width: '1500px',
        height: '800px'
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
