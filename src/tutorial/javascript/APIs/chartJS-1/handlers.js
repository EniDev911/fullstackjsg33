import { updateChartData } from "./helpers.js";

export default (coasters) => {
  document.getElementById("featuresOptions").onchange = (e) => {
    const { value: property, text: label } = e.target.selectedOptions[0];
    const newData = coasters.map((coaster) => coaster[property]);
    console.log(property, label);
    updateChartData("featuresChart", newData, label);
  };
};
