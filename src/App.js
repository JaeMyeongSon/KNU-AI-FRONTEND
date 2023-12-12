import './App.css';
import UserChart from "./UserChart";
import {useEffect, useState} from "react";
import PremiumChart from "./PremiumChart";
import {getInitLogs, getInitPremiumInfo, getInitUserCount, getLogs, getPremiumCount, getUserCount} from "./datas";

function App() {
  const [userCounts, setUserCounts] = useState(getInitUserCount());
  const [premiumInfo, setPremiumInfo] = useState(getInitPremiumInfo());
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState(getInitLogs());

  useEffect(() => {
    getUserCount()
        .then(data => setUserCounts(data))
        .catch(err => console.error(err));


    getPremiumCount()
        .then(data => setPremiumInfo(data))
        .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getLogs(10, page)
        .then(data => setLogs(data))
        .catch(err => console.log(err));
  }, [page]);

  const startPage = Math.floor(page / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, logs.totalPages);

  const onClickPage = (clickedPage) => {
    setPage(clickedPage);
  }

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
        <div className={"mainContainer logContainer"}>
          <h2> 로그 </h2>
          <table className={"logTable"}>
            <th> 레벨 </th>
            <th> 메시지 </th>
            <th> 시간 </th>
            {
              logs.docs.map(log =>
                <tr className={"logElement"}>
                  <td className={"logLevel"}> { log.level } </td>
                  <td className={"logMessage"}> { log.message } </td>
                  <td className={"logTimestamp"}> { log.timestamp } </td>
                </tr>
              )
            }
          </table>
          <div className={"logNavigator"}>
            {
              [...Array(endPage - startPage + 1).keys()]
                  .map(key => key + startPage)
                  .map(key => {
                    let className = "pageBtn";
                    if (key === page) {
                      className += " curPageBtn";
                    }

                    return <a
                        className={className}
                        onClick={() => onClickPage(key)}> {key} </a>
                  })
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
