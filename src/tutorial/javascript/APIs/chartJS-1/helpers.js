export const fetchCoasterData = (...urls) => {
  const promises = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );
  return Promise.all(promises);
};

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

export const getCoasterByYears = (coasters, years) => {
  const coastersByYear = years.map((yearsRange) => {
    const [from, to] = yearsRange.split("-");
    return coasters.filter(
      (eachCoaster) => eachCoaster.year >= from && eachCoaster.year <= to
    ).length;
  });
  return coastersByYear;
};

export const updateChartData = (chartId, data, label) => {
  const chart = Chart.getChart(chartId);
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].label = label;
  chart.update();
};
