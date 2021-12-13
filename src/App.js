import React from "react";
import MainPlot from "./components/MainPlot";
import "./App.css";

function App() {
  /* 데모모드 관련 설정 */
  const demo_mode = 'y'; // 'y' or 'n'
  // year 은 2021년으로 고정되어 있음.
  // month 12로 고정되어 있음. (참고로 9~12월 실제데이터가 매주 반복됨. 대학수업 정보이기 때문)
  const demo_date = 1 // 일, 실제 (요일) day와 맞게 설정해야함.
  const demo_day = 3; // 요일, 0~6 일요일=0, 월요일=1 ~ 토요일=6
  const demo_time = '14:00'; // 9:30~18:00, 30분단위 설정, 데이터 제약으로 이외시간 사용 금지
  const exception_time = '14:00' // 9:30~18:00 이외 시간에 사용할 값

  const width = 500;
  const height = 350;
  const margin = 35;
  const stage = [[40,40,20],[40,30,30],[30,35,35],[20,40,40]];

  return (
    <div className="App">
      <div class="splotContainer">
        <MainPlot
          width={width}
          height={height}
          margin={margin}
          stage={stage}
          demo_mode={demo_mode}
          demo_date={demo_date}
          demo_day={demo_day}
          demo_time={demo_time}
          exception_time={exception_time}
        />
      </div>
    </div>
  );
}

export default App;
