export const getDataColors = (opacity) => {
  const colors = [
    "#7448c2",
    "#21c0d7",
    "#d99e2b",
    "#cd3a81",
    "#9c99cc",
    "#e14eca",
    "#ffffff",
    "#ff0000",
    "#d6ff00",
  ];

  return colors.map((color) => (opacity ? `${color + opacity}` : color));
};

const updateChartData = (chartId, data, label) => {
  const chart = Chart.getChart(charId);
  chart.data.datasets[0].data = data;
  chart.data.dataset[0].label = label;
  chart.update();
};
