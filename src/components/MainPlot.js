import React, { useEffect} from "react";
import * as d3 from "d3";
import ControlPanel from './ControlPanel';
import MapContainer from "./MapContainer";
import TrendView from "./TrendView";
// TODO @hskim 데이터를, 실제 요일 데이터로 넣어주세요.
import SNUBuildingCrowdDensityInfo_Mon from "../data/SNUBuildingCrowdDensityInfo_Mon.json";
import SNUBuildingCrowdDensityInfo_Tue from "../data/SNUBuildingCrowdDensityInfo_Wed.json";
import SNUBuildingCrowdDensityInfo_WED from "../data/SNUBuildingCrowdDensityInfo_Wed.json";
import SNUBuildingCrowdDensityInfo_THU from "../data/SNUBuildingCrowdDensityInfo_Wed.json";
import SNUBuildingCrowdDensityInfo_FRI from "../data/SNUBuildingCrowdDensityInfo_Wed.json";
import SNUFloorCrowdDensityInfo_Tue from "../data/SNUFloorCrowdDensityInfo_Wed.json";
import SNUFloorCrowdDensityInfo_WED from "../data/SNUFloorCrowdDensityInfo_Wed.json";
import CrowdDensityTrendInfo from "../data/trend_sample_301.json"

var selectedOptions = new Object();
let selectObject_o = new Object();
let today = new Date();
let SNUBuildingCrowdDensityInfo;
let SNUFloorCrowdDensityInfo;

let year = today.getFullYear();
let month = today.getMonth()+1;
let date = today.getDate();
let day = today.getDay();
let UniversityCrowdDensity = new Object();

let time = 'SNU_09:30'; // default 값

let old_makers_o = new Object();
old_makers_o.old_makers =  new Array();

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

  // 오늘의 데이터 선택
  switch (day) {
    case 1:
      SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_Mon;
      console.log("월요일");
      break;
    case 2:
      SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_Tue;
      SNUFloorCrowdDensityInfo = SNUFloorCrowdDensityInfo_Tue;
      break;
    case 3:
      SNUBuildingCrowdDensityInfo = SNUBuildingCrowdDensityInfo_WED;
      SNUFloorCrowdDensityInfo = SNUFloorCrowdDensityInfo_WED;
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
  // 데이터에 있는 시간중 가장가까운 시간으로 time 셋팅
  let time_h = today.getHours();
  if (time_h === 9) time_h = '09';
  let time_m = parseInt((today.getMinutes()/15))*15;
  if (time_m === 0) time_m = '00';

  time = 'SNU_' + time_h + ":" + time_m; // 양자화
  console.log (time);
  if (       // 수업이 없는 시간으로 데모 데이터로 고정
      ((today.getHours() === 18) && (today.getMinutes()>14)) ||
      (today.getHours() > 18) ||
      (today.getHours() < 9) ||
      ((today.getHours() === 9) && (today.getMinutes()<30))
    ) {
    time = 'SNU_09:30';
  }

  // @swlim 개발 - 이해안가면 물어 보삼
  function getUniversityCrowdDensity() {
    let UniversityCrowdDensity = new Object();

    UniversityCrowdDensity = {
      "capacity": SNUBuildingCrowdDensityInfo[time][0].capacity,
      "occupancy": SNUBuildingCrowdDensityInfo[time][0].occupancy
    };
    return UniversityCrowdDensity;
  }

  UniversityCrowdDensity = getUniversityCrowdDensity();

  selectedOptions.selectedOption_green = props.stage[0][0];
  selectedOptions.selectedOption_yellow = props.stage[0][0]+props.stage[0][1];

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
    if (date === null ) return null;

    let HalfHourTrend = new Object();
    let selected_date = 'snu_'+date;
    selected_date = "snu_2021-12-01"; // 개발위해 임시 TODO 삭제
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    HalfHourTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(HalfHourTrend);
    return HalfHourTrend;
  }

  function getHalfHourTrendOfBuildingCrowdDensity(bdNumber, date) {
    if (date === null || bdNumber === null ) return null;

    let HalfHourTrend = new Object();
    let selected_date = bdNumber+"_"+date;
    console.log(selected_date);
    selected_date = "301_2021-12-01"; // 개발위해 임시 TODO 삭제
    console.log("CrowdDensityTrendInfo[selected_date][0].capacity");
    console.log(CrowdDensityTrendInfo[selected_date][0].capacity);
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    HalfHourTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(HalfHourTrend);
    return HalfHourTrend;
  }

  function getHalfHourTrendOfBuildingFloorDensity(bdNumber, floor, date) {
    if (date === null || bdNumber === null || floor === null) return null;

    let HalfHourTrend = new Object();
    let selected_date = bdNumber+"_"+floor+"_"+date;
    console.log("FloorDensity");
    console.log(selected_date);
    selected_date = "301_1_2021-12-01"; // 개발위해 임시 TODO 삭제
    console.log("CrowdDensityTrendInfo[selected_date][0].capacity");
    console.log(CrowdDensityTrendInfo[selected_date][0].capacity);
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    HalfHourTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(HalfHourTrend);
    return HalfHourTrend;
  }

  function getHalfHourTrendOfBuildingRoomDensity(bdNumber, floor, roomNumber, date) {
    if (date === null || bdNumber === null || floor === null || roomNumber === null) return null;

    let HalfHourTrend = new Object();
    let selected_date = bdNumber+"_"+floor+"_"+roomNumber+"_"+date;
    console.log("RoomDensity");
    console.log(selected_date);
    selected_date = "301_1_118_2021-12-01"; // 개발위해 임시 TODO 삭제
    console.log("CrowdDensityTrendInfo[selected_date][0].capacity");
    console.log(CrowdDensityTrendInfo[selected_date][0].capacity);
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    HalfHourTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(HalfHourTrend);
    return HalfHourTrend;
  }

  function getDayTrendOfUniversityCrowdDensity(startDate,endDate) {
    if (startDate === null ) return null;

    let DayTrend = new Object();
    let selected_date = 'snu_w_'+startDate;
    console.log("selected_date:"+selected_date);
    selected_date = "snu_w_2021-11-22"; // 개발위해 임시 TODO 삭제
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    DayTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log("DayTrend");
    console.log(DayTrend);
    return DayTrend;
  }

  function getDayTrendOfBuildingCrowdDensity(bdNumber, startDate,endDate) {
    if (startDate === null || bdNumber === null ) return null;

    let DayTrend = new Object();
    let selected_date = bdNumber+"_w_"+startDate;
    console.log("dayBuildingSelected_date:"+selected_date);
    selected_date = "301_w_2021-11-22"; // 개발위해 임시 TODO 삭제
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    DayTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(DayTrend);
    return DayTrend;
  }

  function getDayTrendOfBuildingFloorDensity(bdNumber, floor, startDate,endDate) {
    if (startDate === null || bdNumber === null || floor === null) return null;

    let DayTrend = new Object();
    let selected_date = bdNumber+"_"+floor+"_w_"+startDate;
    console.log("DayFloorDensity");
    console.log(selected_date);
    selected_date = "301_1_w_2021-11-22"; // 개발위해 임시 TODO 삭제
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    DayTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(DayTrend);
    return DayTrend;
  }

  function getDayTrendOfBuildingRoomDensity(bdNumber, floor, roomNumber, startDate,endDate) {
    if (startDate === null || bdNumber === null || floor === null || roomNumber === null) return null;

    let DayTrend = new Object();
    let selected_date = bdNumber+"_"+floor+"_"+roomNumber+"_w_"+startDate;
    console.log("DayRoomDensity");
    console.log(selected_date);
    selected_date = "301_1_118_w_2021-11-22"; // 개발위해 임시 TODO 삭제
    if (CrowdDensityTrendInfo[selected_date] == null) return null;
    DayTrend = {
     "capacity" : CrowdDensityTrendInfo[selected_date][0].capacity,
     "reserve_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].reserve_occupancy_trend,
     "bq_occupancy_trend" : CrowdDensityTrendInfo[selected_date][0].bq_occupancy_trend
    }
    console.log(DayTrend);
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
        SNUBuildingCrowdDensityInfo_o={SNUBuildingCrowdDensityInfo[time][0]}
        SNUFloorCrowdDensityInfo_o={SNUFloorCrowdDensityInfo}
        time={time}
        old_makers_o={old_makers_o}
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
