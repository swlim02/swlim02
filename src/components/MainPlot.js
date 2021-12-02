import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import ControlPanel from './ControlPanel';
import MapContainer from "./MapContainer"

var selectedOptions = new Object();

const MainPlot = (props) => {
  var cb_f;
  function callBack(f) {
    cb_f = f;
  }

  selectedOptions.selectedOption_green = props.stage[0][0];
  selectedOptions.selectedOption_yellow = props.stage[0][0]+props.stage[0][1];
  const splotSvg = useRef(null);

  const svgWidth = props.margin * 2 + props.width;
  const svgHeight = props.margin * 2 + props.height;

  const controlWidth = svgWidth * 2;
  const controlHeight = 50;

  function update_new(){
    console.log("update_new");
    cb_f();
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
        selectedOptions={selectedOptions}
        callBack={callBack}
        />
      </div>
    </div>
  )
};

export default MainPlot;
