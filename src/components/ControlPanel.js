import React, { Component, Fragment, useState, useRef  } from 'react';
import Select from 'react-select'
import * as d3 from "d3";

const ControlPanel = (props) => {
  const [severitylevel, setSeveritylevel] = useState(1); // 기본값 1단계
  const controlSvg = useRef(null);
  // TODO @ghjeong
  // 디폴트 레벨로 레벨바 이미지 그리기
  // 사각형, 라운드사각형 이용

  let options_x = []

  options_x.push({"value":1, "label":'1 단계'});
  options_x.push({"value":2, "label":'2 단계'});
  options_x.push({"value":3, "label":'3 단계'});
  options_x.push({"value":4, "label":'4 단계'});

  function handleChange_x(evt) {
    props.selectedOptions.selectedOption_x = evt.value;
//    props.update_f();
// TODO @ghjeong
// 레벨 변경시 이미지 변경되도록 작성
// state 변경시 렌더링다시되는 것을 이용하면 됨 "setSeveritylevel(n)" 호출
  }

  return (
    <div class="selectionPanel">
      <div class="selection_label">
        <label>[_______밀집도 레벨 바 이미지 자리_______] 거리두기:</label>
      </div>
      <div class="selection_item"  z-index="9999">
        <Select options={options_x} name="x" z-index="9999"
        defaultValue={options_x[0]}
        onChange={(evt) => handleChange_x(evt)}/>
      </div>
    </div>
  )
};

export default ControlPanel
