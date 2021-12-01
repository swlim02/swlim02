import React, { Component, Fragment, useState  } from 'react';
import Select from 'react-select'

const ControlPanel = (props) => {

  let options_x = []

  options_x.push({"value":'1 단계', "label":'1 단계'});
  options_x.push({"value":'2 단계', "label":'2 단계'});
  options_x.push({"value":'3 단계', "label":'3 단계'});
  options_x.push({"value":'4 단계', "label":'4 단계'});

  function handleChange_x(evt) {
    props.selectedOptions.selectedOption_x = evt.value;
//    props.update_f();
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
