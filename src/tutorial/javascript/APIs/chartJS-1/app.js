import { getDataColors } from "./helpers.js";
import { fetchCoasterData } from "./helpers.js";
import { getCoasterByYears } from "./helpers.js";
import enableEventHandlers from "./handlers.js";

// ENDPOINTS
// TODAS https://coasters-api.herokuapp.com/
// EJ: POR PAIS : https://coasters-api.herokuapp.com/country/Spain

const printCharts = () => {
  fetchCoasterData(
    "https://coasters-api.herokuapp.com/",
    "https://coasters-api.herokuapp.com/country/China"
  ).then(([allCoasters, nationalCoaster]) => {
    renderModelsChart(allCoasters);
    renderFeaturesChart(nationalCoaster);
    renderYearsChar(allCoasters);
    enableEventHandlers(nationalCoaster);
  });
};

const renderModelsChart = (coasters) => {
  // VALORES POR DEFECTO PARA TODOS LOS CHART
  Chart.defaults.color = "#f6c";
  Chart.defaults.borderColor = "#000";

  // const models = coaster.map((coaster) => coaster.model);
  // const uniqueModels = Array.from(
  //   new Set(coasters.map((coaster) => coaster.model))
  // );
  // Otra forma
  const uniqueModels = [...new Set(coasters.map((coaster) => coaster.model))];
  const data = {
    labels: uniqueModels,
    datasets: [
      {
        data: uniqueModels.map(
          (currentModel) =>
            coasters.filter((coaster) => coaster.model === currentModel).length
        ),
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20),
      },
    ],
  };
  const options = {
    plugins: {
      legend: { position: "left" },
    },
  };

  new Chart("modelsChart", { type: "doughnut", data, options });
};

const renderFeaturesChart = (coasters) => {
  Chart.defaults.borderColor = "#f6c";
  const data = {
    labels: coasters.map((coaster) => coaster.name),
    datasets: [
      {
        label: "Altura (m)",
        data: coasters.map((coaster) => coaster.height),
        borderColor: getDataColors(),
        backgroundColor: getDataColors()[0],
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        ticks: { display: false },
      },
    },
  };
  new Chart("featuresChart", { type: "radar", data, options });
};

const renderYearsChar = (coasters) => {
  const years = [
    "1998-2000",
    "2001-2003",
    "2004-2006",
    "2007-2009",
    "2013-2015",
    "2016-2018",
    "2019-2021",
  ];
  const data = {
    labels: years,
    datasets: [
      {
        data: getCoasterByYears(coasters, years),
        tension: 1,
        backgroundColor: getDataColors(),
        borderColor: getDataColors(),
      },
    ],
  };
  const options = {
    plugins: {
      legend: { display: false },
    },
  };
  new Chart("yearsChart", { type: "line", data, options });
};
printCharts();
