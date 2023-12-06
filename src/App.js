import './App.css';
import UserChart from "./UserChart";
import {useEffect, useState} from "react";
import PremiumChart from "./PremiumChart";

function App() {
  const [userCounts, setUserCounts] = useState([{
    "id": '신규 가입자 수',
    "color": "hsl(130, 70%, 50%)",
    "data": [
      { x: '2023-1', y: 0 },
      { x: '2023-2', y: 0 },
      { x: '2023-3', y: 0 },
      { x: '2023-4', y: 0 },
      { x: '2023-6', y: 0 },
      { x: '2023-7', y: 0 },
      { x: '2023-8', y: 0 },
      { x: '2023-9', y: 0 },
      { x: '2023-10', y: 0 },
      { x: '2023-11', y: 0 },
      { x: '2023-12', y: 0 }
    ]}]);

  const [premiumInfo, setPremiumInfo] = useState([
      {
      "id": "미가입자",
      "label": "미가입자",
      "value": 100,
      "color": "hsl(251, 70%, 50%)"
    },
    {
      "id": "가입자",
      "label": "가입자",
      "value": 100,
      "color": "hsl(247, 70%, 50%)"
    }
  ]);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/admins/users/count`)
        .then(data => data.json())
        .then(data => data.map(({date, count}) => ({ x: date, y: count })))
        .then(data => setUserCounts([{
          "id": '신규 가입자 수',
          "color": "hsl(130, 70%, 50%)",
          "data": data
        }]))
        .catch(err => console.error(err));


    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/admins/premium`)
        .then(data => data.json())
        .then(({premiumCount, userCount}) => setPremiumInfo([
          {
            "id": "미가입자",
            "label": "미가입자",
            "value": userCount,
            "color": "hsl(251, 70%, 50%)"
          },
          {
            "id": "가입자",
            "label": "가입자",
            "value": premiumCount,
            "color": "hsl(247, 70%, 50%)"
          }
        ]))
        .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header>
        <h1> 쓰자! 읏쨔~ 관리자 페이지 </h1>
      </header>
      <main>
        <div className={"mainContainer"}>
          <h2> 신규 가입자 수 </h2>
          <div style={{height: '500px'}}>
            <UserChart data={userCounts} />
          </div>
        </div>
        <div className={"mainContainer"}>
          <h2> 프리미엄 가입자 수 </h2>
          <div style={{height: '500px'}}>
            <PremiumChart data={premiumInfo} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
