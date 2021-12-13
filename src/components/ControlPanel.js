import React, { useState, useRef, useEffect  } from 'react';
import * as d3 from "d3";
import Select from 'react-select'

const ControlPanel = (props) => {

  let options_x = []

  options_x.push({"value":'1 단계', "label":'1 단계'});
  options_x.push({"value":'2 단계', "label":'2 단계'});
  options_x.push({"value":'3 단계', "label":'3 단계'});
  options_x.push({"value":'4 단계', "label":'4 단계'});
  const [curStage, setCurStage] = useState('1 단계')
  function handleChange_x(evt) {
    if (evt.value === curStage) {
      //nothing
    } else {
      setCurStage(evt.value);
      console.log("update_f");
    }
  }

  const densityBarSvgRef = useRef();

  //props.selectedOptions.selectedOption_x = '1 단계';

  useEffect(() => {

    const densityBar = d3.select(densityBarSvgRef.current);

    densityBar.selectAll(".line1").remove();
    densityBar.selectAll(".line2").remove();
    densityBar.selectAll(".line3").remove();
    densityBar.selectAll(".text1").remove();
    densityBar.selectAll(".text2").remove();
    densityBar.selectAll(".text3").remove();
    densityBar.selectAll(".text4").remove();
    densityBar.selectAll(".text5").remove();

    let stageNum = curStage[0]-1;
    //console.log(stageNum);

    const xAxis = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ 10, 10+((props.stage[stageNum][0]+props.stage[stageNum][1]+props.stage[stageNum][2])*3)]);

    densityBar.selectAll(".line0")
              .data(props.stage)
              .enter()
              .append('line')
              .join('.line0')
              .attr('class','line0')
              .attr('x1',10)
              .attr('y1',10)
              .attr('x2',10+((props.stage[stageNum][0]+props.stage[stageNum][1]+props.stage[stageNum][2])*3))
              .attr('y2',10)
              .attr('stroke', 'black')
              .attr('stroke-width', 20)
              .attr('stroke-linecap','round');

    densityBar.selectAll(".line1")
              .data(props.stage)
              .enter()
              .append('line')
              .join('.line1')
              .attr('class','line1')
              .attr('x1',10)
              .attr('y1',10)
              .attr('x2',10+props.stage[stageNum][0]*3)
              .attr('y2',10)
              .attr('stroke', '#4CAF50')
              .attr('stroke-width', 18)
              .attr('stroke-linecap','round');
          //console.log(props.stage[stageNum][0]*3);

    densityBar.selectAll(".line3")
              .data(props.stage)
              .enter()
              .append('line')
              //.attr('transform', `translate(${props.margin}, ${props.margin})`)
              .join('.line3')
              .attr('class','line3')
              .attr('x1',10+(props.stage[stageNum][0]+props.stage[stageNum][1])*3)
              .attr('y1',10)
              .attr('x2',10+((props.stage[stageNum][0]+props.stage[stageNum][1]+props.stage[stageNum][2])*3))
              .attr('y2',10)
              .attr('stroke', '#F44336')
              .attr('stroke-width', 18)
              .attr('stroke-linecap','round');

    densityBar.selectAll(".line2")
              .data(props.stage)
              .enter()
              .append('line')
              //.attr('transform', `translate(${props.margin}, ${props.margin})`)
              .join('.line2')
              .attr('class','line2')
              .attr('x1',10+(props.stage[stageNum][0]*3))
              .attr('y1',10)
              .attr('x2',10+(props.stage[stageNum][0]+props.stage[stageNum][1])*3)
              .attr('y2',10)
              .attr('stroke', '#FFC107')
              .attr('stroke-width', 18)
              .attr('stroke-linecap','butt');;

    densityBar.selectAll(".text1")
              .data(props.stage)
              .enter()
              .append('text')
              //.attr('transform', `translate(${props.margin}, ${props.margin})`)
              .join('.text1')
              .attr('class','text1')
              .text('양호')
              .attr('x',props.stage[stageNum][0]*3/2)
              .attr('y',14)
              .attr("font-family", "sans-serif")
              .attr("font-size", "12px")
              .attr('fill','white');

    densityBar.selectAll(".text2")
                .data(props.stage)
                .enter()
                .append('text')
                //.attr('transform', `translate(${props.margin}, ${props.margin})`)
                .join('.text2')
                .attr('class','text2')
                .text('주의')
                .attr('x',(props.stage[stageNum][0]+props.stage[stageNum][0]+props.stage[stageNum][1])*3/2)
                .attr('y',14)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr('fill','black');

    densityBar.selectAll(".text3")
                .data(props.stage)
                .enter()
                .append('text')
                //.attr('transform', `translate(${props.margin}, ${props.margin})`)
                .join('.text3')
                .attr('class','text3')
                .text('위험')
                .attr('x',((props.stage[stageNum][0]+props.stage[stageNum][1]+props.stage[stageNum][0]+props.stage[stageNum][1]+props.stage[stageNum][2])*3/2))
                .attr('y',14)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr('fill','white');

    densityBar.selectAll(".text4")
                .data(props.stage)
                .enter()
                .append('text')
                //.attr('transform', `translate(${props.margin}, ${props.margin})`)
                .join('.text4')
                .attr('class','text4')
                .text(props.stage[stageNum][0]+"%")
                .attr('x',(props.stage[stageNum][0]*3))
                .attr('y',28)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr('fill','black');

    densityBar.selectAll(".text5")
                .data(props.stage)
                .enter()
                .append('text')
                //.attr('transform', `translate(${props.margin}, ${props.margin})`)
                .join('.text5')
                .attr('class','text5')
                .text((props.stage[stageNum][0]+props.stage[stageNum][1])+"%")
                .attr('x',((props.stage[stageNum][0]+props.stage[stageNum][1])*3))
                .attr('y',28)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr('fill','black');

    function drawSNUCrowdDensity(CrowdDensity) { // CrowdDensity = 0~100
      densityBar.append('line')
                  .attr('x1',xAxis(CrowdDensity))
                  .attr('y1',-13)
                  .attr('x2',xAxis(CrowdDensity))
                  .attr('y2',16)
                  .attr('stroke', '#0f0f70')
                  .attr('stroke-width', 4);
      densityBar.append('line')
                  .attr('x1',xAxis(CrowdDensity)-1)
                  .attr('y1',0)
                  .attr('x2',xAxis(CrowdDensity)-6)
                  .attr('y2',-4)
                  .attr('stroke', '#0f0f70')
                  .attr('stroke-width', 2);
      densityBar.append('line')
                  .attr('x2',xAxis(CrowdDensity)-10)
                  .attr('y2',0)
                  .attr('x1',xAxis(CrowdDensity)-5)
                  .attr('y1',-4)
                  .attr('stroke', '#0f0f70')
                  .attr('stroke-width', 2);
      densityBar.append('line')
                  .attr('x2',xAxis(CrowdDensity))
                  .attr('y2',-12)
                  .attr('x1',xAxis(CrowdDensity)-7)
                  .attr('y1',-12)
                  .attr('stroke', '#0f0f70')
                  .attr('stroke-width', 2);
      densityBar.append('line')
                  .attr('x2',xAxis(CrowdDensity)+5)
                  .attr('y2',-9)
                  .attr('x1',xAxis(CrowdDensity))
                  .attr('y1',-9)
                  .attr('stroke', '#0f0f70')
                  .attr('stroke-width', 2);
      densityBar.append('line')
                  .attr('x2',xAxis(CrowdDensity)+5)
                  .attr('y2',-5)
                  .attr('x1',xAxis(CrowdDensity))
                  .attr('y1',-5)
                  .attr('stroke', '#0f0f70')
                  .attr('stroke-width', 2);
    }

    drawSNUCrowdDensity(100*props.UniversityCrowdDensity_o.occupancy/props.UniversityCrowdDensity_o.capacity);

    props.selectedOptions.selectedOption_green = props.stage[stageNum][0];
    props.selectedOptions.selectedOption_yellow = props.stage[stageNum][0]+props.stage[stageNum][1];
    props.update_f();
  })

  return (
    <div class="selectionPanel">
      <div class="selection_label" style={{ display: "flex"}}>
        <b><label> <font color="0f0f70">서울대학교 안전모임 도우미 </font></label></b>
        <label> &nbsp;| 서울대 밀집도:</label>
        <svg  ref={densityBarSvgRef} width={335} height={50} viewBox="-7 -5 335 35"></svg>
        <label>| 거리두기:</label>
      </div>
      <div class="selection_item">
        <Select options={options_x} name="x"
        defaultValue={options_x[0]}
        onChange={(evt) => handleChange_x(evt)}/>
      </div>
    </div>
  )
};

export default ControlPanel
