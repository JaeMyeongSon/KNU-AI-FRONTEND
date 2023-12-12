
export function getInitUserCount() {
  return [{
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
    ]}];
}

export function getInitPremiumInfo() {
  return [
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
  ];
}

export function getInitLogs() {
  return {
    docs: [],
    hasNextPage: true,
    hasPrevPage: false,
    nextPage: null,
    pagingCounter: 1,
    prevPage: null,
    totalPages: 1
  }
}

export function getUserCount() {
  return fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/admins/users/count`)
      .then(data => data.json())
      .then(data => data.map(({date, count}) => ({ x: date, y: count })))
      .then(data => [{
        "id": '신규 가입자 수',
        "color": "hsl(130, 70%, 50%)",
        "data": data
      }])
      .catch(err => err);
}

export function getPremiumCount() {
  return fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/admins/premium`)
      .then(data => data.json())
      .then(({premiumCount, userCount}) => [
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
      ])
      .catch(err => err);
}

export function getLogs(limit, page) {
  const params = { limit, page };

  const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다.
  const requestUrl = `${process.env.REACT_APP_SERVER_DOMAIN}/api/admins/logs?${queryString}`;

  return fetch(requestUrl)
      .then(data => data.json())
      .catch(err => err);
}