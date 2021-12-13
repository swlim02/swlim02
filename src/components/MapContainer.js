import React, { useEffect } from 'react';
import FloorOccu from "./FloorOccu"
import logo from '../data/logo.png';

let today = new Date();
const { kakao } = window;
const buildingsInfo = [
"24","자연과학관6",37.45942,126.94989,
"49","예술관연구동",37.46344,126.95425,
"10","사범관2",37.46031,126.95536,
"50","예술관(미대)1",37.46304,126.95234,
"301","제1공학관",37.45016,126.95259,
"5","인문관4",37.4606,126.95393,
"140-1","국제대학원2",37.46406,126.9546,
"15","법학관1",37.46233,126.95174,
"57-1","행정대학원",37.46519,126.95373,
"54","예술관(음대)2",37.4626,126.95335,
"222","생활과학대학",37.46437,126.95318,
"74","예술복합연구동",37.46193,126.95312,
"200","농업생명과학대학",37.45769,126.94868,
"75-1","제3학생식당",37.45647,126.94851,
"33","공학관4",37.45625,126.95084,
"39","대학원연구동(1단계)",37.45465,126.95157,
"25","자연과학관7",37.45856,126.94988,
"129","수리과학연구동",37.4578,126.94948,
"16","사회과학관",37.46353,126.95092,
"3","인문관3",37.46071,126.95355,
"4","신양인문학술정보관",37.46089,126.95326,
"82","환경대학원",37.46237,126.95409,
"83","인문사회계멀티미디어강의동",37.46344,126.95168,
"53","예술관(음대)1",37.46304,126.95344,
"203","SPC농생명과학 및 기초과학연구동",37.45834,126.94836,
"201","농업생명과학대학환경관",37.45687,126.94852,
"34","공학관5",37.45609,126.95149,
"32","공학관3",37.45648,126.95009,
"35","공학관6",37.45665,126.95211,
"500","대학원연구동(2단계)",37.4592190840394,126.948120067187,
"56","자연과학관10",37.4577,126.9514,
"102","정보화본부",37.45962,126.94927,
"57","행정대학원",37.46559,126.95314,
"21","약학관1",37.45784,126.95223,
"20","약학관3",37.45869,126.95289,
"207","야외조각실습장1",37.4640933271623,126.95294896735,
"52-2","야외조각실습장2",37.46404,126.95294,
"37","공학관8",37.45572,126.95075,
"31","공학관2",37.45702,126.95002,
"14","인문관7",37.46093,126.95499,
"2","인문관2",37.46038,126.95295,
"84","근대법학교육100주년기념관",37.46226,126.95233,
"9","사범관1",37.46017,126.9548,
"29","약학관2",37.4561,126.95368,
"38","글로벌공학교육센터",37.4549,126.95062,
"19","자연과학관2",37.45618,126.95277,
"105-2","유전공학연구소 신관",37.4540404461522,126.95336213875,
"64","IBK커뮤니케이션센터",37.46383,126.94937,
"7","인문관6",37.46022,126.95436,
"43-1","이공계멀티미디어강의동",37.45667,126.95145,
"221","보건대학원",37.46489,126.95469,
"15-1","법학강의동",37.46241,126.95126,
"143","약대신약개발연구센터",37.45828,126.95308,
"12","사범교육협력센터",37.45962,126.95479,
"44-1","신양학술정보관",37.4552,126.95206,
"36","공학관7",37.45554,126.95146,
"30","공학관1",37.45686,126.95085,
"22","자연과학관4",37.45792,126.95096,
"16-1","신양학술정보관Ⅲ",37.46271,126.951,
"101","아시아연구소",37.46328,126.95015,
"6","인문관5",37.46073,126.95452,
"220","종합교육연구동",37.46451,126.95424,
"8","두산인문관",37.46016,126.95398,
"86","치의학대학원 첨단교육연구복합단지",37.46899,126.95304,
"11","사범관3",37.45979,126.9552,
"13","과학교육관",37.45927,126.95389,
"73","문화관",37.46159,126.95104,
"302","제2공학관",37.44887,126.95265,
"942","LG연구동",37.46587,126.96088,
"25-1","자연대강의및실험연구동",37.45897,126.94941,
"1","인문관1",37.46027,126.95234,
"152-1","롯데국제교육관",37.46657,126.95119,
"85","수의과대학",37.46744,126.95365,
"140-2","국제회의동",37.46448,126.95497,
"140","국제대학원",37.46427,126.95487,
"18","자연과학관1",37.45678,126.95277,
"55","예술관(음대)3",37.46248,126.95287,
"10-1","사범대교육정보관",37.45996,126.95592,
"51","예술관(미대)2",37.46354,126.95268,
"17","법학관2",37.46284,126.95187,
"58","SK경영관",37.46568,126.95203,
"26","자연과학관8",37.45881,126.95036
];

const MapContainer = (props) => {
  var floor_o = new Object();
  floor_o.f = null;
  floor_o.roomData = null;

  const selectedOptions = props.selectedOptions;
  var current_data = null;

  var cb_f;
  function callBack(f) {
    cb_f = f;
  }

  function update() {
    makeMakers();
    console.log("MapContainerupdate_f")
    cb_f(null);
    cb_f(current_data);
  }

  props.callBack(update);

  var MARKER_WIDTH = 33, // 기본, 클릭 마커의 너비
  MARKER_HEIGHT = 36, // 기본, 클릭 마커의 높이
  OFFSET_X = 12, // 기본, 클릭 마커의 기준 X좌표
  OFFSET_Y = MARKER_HEIGHT, // 기본, 클릭 마커의 기준 Y좌표
  OVER_MARKER_WIDTH = 40, // 오버 마커의 너비
  OVER_MARKER_HEIGHT = 42, // 오버 마커의 높이
  OVER_OFFSET_X = 13, // 오버 마커의 기준 X좌표
  OVER_OFFSET_Y = OVER_MARKER_HEIGHT, // 오버 마커의 기준 Y좌표
  SPRITE_MARKER_URL = logo, // 스프라이트 마커 이미지 URL
//  SPRITE_MARKER_URL = 'http://mmlab.snu.ac.kr/~ghjeong/imking.png',
  SPRITE_WIDTH = 126, // 스프라이트 이미지 너비
  SPRITE_HEIGHT = 146, // 스프라이트 이미지 높이
  SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격

  var markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT), // 기본, 클릭 마커의 크기
      markerOffset = new kakao.maps.Point(OFFSET_X, OFFSET_Y), // 기본, 클릭 마커의 기준좌표
      overMarkerSize = new kakao.maps.Size(OVER_MARKER_WIDTH, OVER_MARKER_HEIGHT), // 오버 마커의 크기
      overMarkerOffset = new kakao.maps.Point(OVER_OFFSET_X, OVER_OFFSET_Y), // 오버 마커의 기준 좌표
      spriteImageSize = new kakao.maps.Size(SPRITE_WIDTH, SPRITE_HEIGHT); // 스프라이트 이미지의 크기

  let map;
  useEffect(() => {

    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.4545, 126.9530),
      level: 5
    };
    map = new kakao.maps.Map(container, options);
    console.log("MapContainer().useEffect()");
    makeMakers();
  });

    function makeMakers(){
      //console.log("makeMakers");
      props.old_makers_o.old_makers.forEach((item, i) => {
        item.map = null;
      });
      var selectedMarker = null; // 클릭한 마커를 담을 변수
      var positions = [];
      //console.log("enumerateBuildingCrowdDensitySummary()");
      //console.log(enumerateBuildingCrowdDensitySummary());
      enumerateBuildingCrowdDensitySummary().forEach((item, i) => {

//        console.log(item);
        let crowd = parseInt(item.occupancy)/parseInt(item.capacity)*100;
//        console.log("crowd");
//        console.log(crowd);
//        console.log("props.selectedOptions.selectedOption_green");
//        console.log(props.selectedOptions.selectedOption_green);
        let severity = 0; // 0=R,1=Y,2=G
        if (crowd < props.selectedOptions.selectedOption_yellow ) {
          severity = 1;
          if (crowd < props.selectedOptions.selectedOption_green) {
            severity = 2;
          }
        }

        let o = new Object();
        o = {
          "content": '<div>'+item.bdNumber+'동, '+item.bdName+'</div>',
          "latlng": new kakao.maps.LatLng(item.latitude,item.longitude),
//          "data": building[i%3],
          "data": getBuildingCrowdDensity(item.bdNumber),
          "severity": severity
        };
        positions.push(o);
      });

      //console.log(positions.length);
      // 지도 위에 마커를 표시합니다
      for (var i = 0; i < positions.length; i++) {
          var gapX = (MARKER_WIDTH + SPRITE_GAP), // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
              originY = (MARKER_HEIGHT + SPRITE_GAP) * positions[i].severity, // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
              overOriginY = (OVER_MARKER_HEIGHT + SPRITE_GAP) * positions[i].severity, // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
              normalOrigin = new kakao.maps.Point(0, originY), // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
              clickOrigin = new kakao.maps.Point(gapX, originY), // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
              overOrigin = new kakao.maps.Point(gapX * 2, overOriginY); // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

          // 마커를 생성하고 지도위에 표시합니다
          addMarker(positions[i], normalOrigin, overOrigin, clickOrigin);
      }

      function makeOverListener(map, marker, infowindow) {
          return function() {
              infowindow.open(map, marker);
          };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
          return function() {
              infowindow.close();
          };
      }

      // 마커를 생성하고 지도 위에 표시하고, 마커에 mouseover, mouseout, click 이벤트를 등록하는 함수입니다
      function addMarker(position, normalOrigin, overOrigin, clickOrigin) {

          // 기본 마커이미지, 오버 마커이미지, 클릭 마커이미지를 생성합니다
          var normalImage = createMarkerImage(markerSize, markerOffset, normalOrigin),
              overImage = createMarkerImage(overMarkerSize, overMarkerOffset, overOrigin),
              clickImage = createMarkerImage(markerSize, markerOffset, clickOrigin);

          // 마커를 생성하고 이미지는 기본 마커 이미지를 사용합니다
  //        console.log("추가");
  //        console.log(position);
          var marker = new kakao.maps.Marker({
              map: map,
              position: position.latlng,
              image: normalImage
          });

          props.old_makers_o.old_makers.push(marker);

          // 마커 객체에 마커아이디와 마커의 기본 이미지를 추가합니다
          marker.normalImage = normalImage;

          // 마커에 mouseover 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseover', function() {

              // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
              // 마커의 이미지를 오버 이미지로 변경합니다
              if (!selectedMarker || selectedMarker !== marker) {
                  marker.setImage(overImage);
              }
          });

          // 마커에 mouseout 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseout', function() {

              // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
              // 마커의 이미지를 기본 이미지로 변경합니다
              if (!selectedMarker || selectedMarker !== marker) {
                  marker.setImage(normalImage);
              }
          });

          // 마커에 click 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function() {

              // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
              // 마커의 이미지를 클릭 이미지로 변경합니다
              if (!selectedMarker || selectedMarker !== marker) {

                  // 클릭된 마커 객체가 null이 아니면
                  // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                  !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

                  // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                  marker.setImage(clickImage);
                  floor_o.roomData = null; // 개발중임시사용삭제 될 예정
                  current_data = position.data;
                  //console.log(current_data);
                  props.selectObject_o.bdNumber = current_data.bdNumber;
                  props.selectObject_o.floor = null;
                  props.selectObject_o.roomNumber = null;
                  props.update_trendView_f();
                  cb_f(current_data)
              }

              // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
              selectedMarker = marker;
          });

          var infowindow = new kakao.maps.InfoWindow({
              content: position.content // 인포윈도우에 표시할 내용
          });
          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      }
    }

    // MakrerImage 객체를 생성하여 반환하는 함수입니다
    function createMarkerImage(markerSize, offset, spriteOrigin) {
        var markerImage = new kakao.maps.MarkerImage(
            SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
            markerSize, // 마커의 크기
            {
                offset: offset, // 마커 이미지에서의 기준 좌표
                spriteOrigin: spriteOrigin, // 스트라이프 이미지 중 사용할 영역의 좌상단 좌표
                spriteSize: spriteImageSize // 스프라이트 이미지의 크기
            }
        );
        return markerImage;
    }


    // @ghjeong 2021-12-07
    //let time = +'_09:30'; // default 값
    function getBuildingCrowdDensity(bdNumber) {

      let BuildingCrowdDensity = new Object();
      // 데이터에 있는 시간중 가장가까운 시간으로 time 셋팅
      let time_h = today.getHours();
      if (time_h === 9) time_h = '09';
      let time_m = parseInt((today.getMinutes()/15))*15;
      if (time_m === 0) time_m = '00';

      let time = bdNumber +'_' + time_h + ":" + time_m; // 양자화
      console.log (time);
      if (       // 수업이 없는 시간으로 데모 데이터로 고정
          ((today.getHours() === 18) && (today.getMinutes()>14)) ||
          (today.getHours() > 18) ||
          (today.getHours() < 9) ||
          ((today.getHours() === 9) && (today.getMinutes()<30))
        ) {
        time = bdNumber +'_14:00';
      }
      // 데모영상준비를 위해 임시 TODO 지워야함
      time = bdNumber +'_14:00';

      console.log("herehrehrherherherhere");
      //console.log(props.SNUFloorCrowdDensityInfo_o[time][0]);

      //let bd_index = buildingsInfo.indexOf(bdNumber);

      BuildingCrowdDensity = props.SNUFloorCrowdDensityInfo_o[time][0];
      console.log(BuildingCrowdDensity);
     return BuildingCrowdDensity;
    }

    //console.log(props.selectObject_o.bdNumber);

    // swlim 2021-12-07
    function enumerateBuildingCrowdDensitySummary() {
      let BuildingCrowdDensitySummary_arr = new Array();

      for (let i=0 ; i < props.SNUBuildingCrowdDensityInfo_o.buildings.length ; i++) {
        let o = new Object();
        let bd_index = buildingsInfo.indexOf(props.SNUBuildingCrowdDensityInfo_o.buildings[i].bdNumber);
        if (bd_index !== -1) {
          o = {
            "bdNumber": props.SNUBuildingCrowdDensityInfo_o.buildings[i].bdNumber,
            "bdName": buildingsInfo[bd_index+1],
            "latitude": buildingsInfo[bd_index+2],
            "longitude": buildingsInfo[bd_index+3],
            "capacity": props.SNUBuildingCrowdDensityInfo_o.buildings[i].capacity,
            "occupancy": props.SNUBuildingCrowdDensityInfo_o.buildings[i].occupancy
          };
          BuildingCrowdDensitySummary_arr.push(o);
        } else {
          console.log ("망했음.없는건물번호임")
        }
      }
      //console.log(BuildingCrowdDensitySummary_arr)
      return BuildingCrowdDensitySummary_arr;
    }
//  });

  //  ghjeong 2021-12-07
  function getFloorDensity(bdNumber, floor) {
    let FloorCrowdDensity = new Object();
    // 데이터에 있는 시간중 가장가까운 시간으로 time 셋팅
    let time_h = today.getHours();
    if (time_h === 9) time_h = '09';
    let time_m = parseInt((today.getMinutes()/15))*15;
    if (time_m === 0) time_m = '00';

    let time = bdNumber +'_' + floor +'_' + time_h + ":" + time_m; // 양자화
    console.log (time);
    if (       // 수업이 없는 시간으로 데모 데이터로 고정
        ((today.getHours() === 18) && (today.getMinutes()>14)) ||
        (today.getHours() > 18) ||
        (today.getHours() < 9) ||
        ((today.getHours() === 9) && (today.getMinutes()<30))
      ) {
    time = bdNumber +'_' + floor +'_14:00';
    }
    // 데모영상준비를 위해 임시 TODO 지워야함
    time = bdNumber +'_' + floor +'_14:00';

    console.log("here!!");
    console.log("here!!");
    //console.log(props.SNUFloorCrowdDensityInfo_o[time][0]);

    //let bd_index = buildingsInfo.indexOf(bdNumber);
    FloorCrowdDensity = props.SNURoomCrowdDensityInfo_o[time][0];
    console.log(FloorCrowdDensity);
    return FloorCrowdDensity;
  }

  return (
    <div>
      <div id='myMap' class="splotContainer1" style={{
        width: '420px',
        height: '510px'
      }}></div>
      <div id='floorView' class="splotContainer2" style={{
        width: '900px',
        height: '500px'
      }}>
        <FloorOccu
          data={current_data}
          callBack={callBack}
          selectedOptions={selectedOptions}
          floor_o={floor_o}
          getFloorDensity={getFloorDensity}
          selectObject_o={props.selectObject_o}
          update_trendView_f={props.update_trendView_f} // selectObject_o  값 갱신시 호출해주어야함
        />
      </div>
    </div>
  );
}

export default MapContainer;
