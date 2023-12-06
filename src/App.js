import './App.css';
import UserChart from "./UserChart";

function App() {
  const data = [
    {
      "id": 1,
      "color": "hsl(130, 70%, 50%)",
      "data": [
        {
          "x": "2023-07",
          "y": 284
        },
        {
          "x": "2023-08",
          "y": 96
        },
        {
          "x": "2023-09",
          "y": 76
        },
        {
          "x": "2023-10",
          "y": 229
        },
        {
          "x": "2023-11",
          "y": 240
        },
        {
          "x": "2023-12",
          "y": 204
        }
      ]
    }
  ]

  return (
    <div className="App">
      <header>
        <h1> 쓰자! 읏쨔~ 관리자 페이지 </h1>
      </header>
      <main>
        <div className={"mainContainer"}>
          <h2> 사용자 수 </h2>
          <div style={{height: '500px'}}>
            <UserChart data={data} />
          </div>
        </div>
        <div className={"mainContainer"}>
          <h2> 프리미엄 가입자 수 </h2>
          <div style={{height: '500px'}}>
            <UserChart data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
