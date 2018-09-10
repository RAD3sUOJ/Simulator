$("#btnTimeStart").click(function() {
  var ctx = $("#myCanvas");

  var data = {
    labels: [
      'l1', 'l2', 'l3', 'l4', 'l5'
    ],
    datasets: [
      {
        label: 'Row data',
        data: [
          10, 15, 25, 45, 70
        ],
        backgroundColor: '#00E0C1',
        borderColor: '#006E5E',
        fill: false,
        lineTension: 0,
        pointRadius: 5
      }, {
        label: 'Away score',
        data: [
          30, 50, 95, 20, 70
        ],
        backgroundColor: '#009FE5',
        borderColor: '#005A84',
        fill: false,
        lineTension: 0,
        pointRadius: 5
      }
    ]
  };

  var options = {
    title: {
      display: true,
      position: 'top',
      text: 'Line Gragh',
      fontSize: 14,
      fontColor: '#111'
    },
    legend: {
      display: true,
      position: 'bottom'
    }
  }

  var chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  })
});

