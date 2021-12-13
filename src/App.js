import React from "react";
import MainPlot from "./components/MainPlot";
import "./App.css";

function App() {
  const demo_mode = 'y'; // 'y' or 'n'
  const demo_day = 'wed';
  const demo_time = '';

  const width = 500;
  const height = 350;
  const margin = 35;
  const pointSize = 3;
  const maxPointSize = 10;
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
          demo_day={demo_day}
          demo_time={demo_time}
        />
      </div>
    </div>
  );
}

export default App;
