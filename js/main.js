const wheel = document.getElementById("wheel"),
  spinBtn = document.getElementById("spin-btn"),
  finalValue = document.getElementById("final-value");

// значения минимального и максимального угла для value

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];

// размеры частей

const data = [16, 16, 16, 16, 16, 16];

// цвета фона этих частей

let pieColors = [
  "#1565c0",
  "#2196f3",
  "#1565c0",
  "#2196f3",
  "#1565c0",
  "#2196f3",
];

// исользуем круглую диаграмму для нашего колеса

let myChart = new Chart(wheel, {
  // Display text on pie chart
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    // Values on chart
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart design
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      // show labels inside of pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Отобразить value в зависимости от угла

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
// счетчик спиннера
let count = 0;

let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good luck</p>`;

  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  // время анимации
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    // прокрутка > 360deg вернем значение в 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
