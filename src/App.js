import React from "react";
import MainPlot from "./components/MainPlot";
import movies from "./data/movie.json";
import "./App.css";

function App() {

  const name = "서울대 안전모임 도우미";

  const nominal = ["genre", "creative_type", "source"];
  const ordinal = ["release", "rating"];
  const quantitative = ["budget", "us_gross", "worldwide_gross", "rotten_rating", "imdb_rating", "imdb_votes"];

  const width = 500;
  const height = 350;
  const margin = 35;
  const pointSize = 3;
  const maxPointSize = 10;
  const stage = [[40,40,20],[40,30,30],[30,35,35],[20,40,40]];

  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <h2 style={{marginTop: 25}}>
          {name}
        </h2>
      </div>
      <div class="splotContainer">
        <MainPlot
          width={width}
          height={height}
          data={movies}
          margin={margin}
          pointSize={pointSize}
          maxPointSize={maxPointSize}
          nominal={nominal}
          ordinal={ordinal}
          quantitative={quantitative}
          stage={stage}
        />
      </div>
    </div>
  );
}

export default App;
