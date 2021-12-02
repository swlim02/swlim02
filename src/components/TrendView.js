import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";

const TrendView = (props) => {

	const [trendData, setTrendData] = useState(props.selectObject_o.state);
	// set the dimensions and margins of the graph
	props.callBack(setTrendData); // 갱신시 state 변경해서 rerendering 하려고 걸어 두었음.


// 1500 * 500 에 사이즈 맞춰주면 thx
	return (
		<div class="splotContainerx" style={{
			width: '1500px',
			height: '500px'
		}}>

		</div>
	)
};

export default TrendView;
