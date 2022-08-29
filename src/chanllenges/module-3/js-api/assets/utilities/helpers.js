const getDataColors = (opacity) => {
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

export const prepareConfigChart = (chartId, data) => {
  document.getElementById(chartId).parentNode.style.opacity = "1";
  const ctx = document.getElementById(chartId).getContext("2d");
  // gradient
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(250, 220, 0, 1)");
  gradient.addColorStop(1, "rgba(250, 130, 0, 0.3)");
  // delayed -> animation
  let delayed;

  const firstTenEntries = data.serie.filter((value, index) => index < 10),
    xLabels = firstTenEntries.map((ele) => ele.fecha.substring(0, 10)),
    yLabels = firstTenEntries.map((ele) => ele.valor);
  const title = "Historial 10 últimos cambios";

  const config = {
    type: "line",
    data: {
      labels: xLabels,
      datasets: [
        {
          label: title,
          data: yLabels,
          backgroundColor: gradient,
          borderColor: getDataColors()[8],
          pointBorderColor: getDataColors()[6],
          fill: true,
          borderWidth: 2,
          pointBorderWidth: 5,
          tension: 0.2,

        },
      ],
    },
    options: {
      radius: 3,
      hoverRadius: 12,
      responsive: true,
      animation: {
        duration: 2000,
        onProgress: function (context) {
          if (context.initial) {
            initProgress.value = context.currentStep / context.numSteps;
          } else {
            progress.value = context.currentStep / context.numSteps;
          }
        },
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === "data" && context.mode === "default" && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        }
      },
      scales: {
        x: {
          ticks: {
            color: getDataColors()[8],
          },
        },
        y: {
          ticks: {
            color: getDataColors()[2],
            callback: function (value) {
              value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
              return "$" + value + " CLP"
            }
          },
        },
      },
    },
  };
  return config;
};

const getMessageAlert = (text, icon) => {
  return Swal.fire({
    stopKeydownPropagation: true,
    icon: icon,
    title: "Oops...",
    text: text,
    background: "#393939",
    color: "#ccc",
  });
};

export const validate = (value) => {
  if (value === 0) {
    getMessageAlert("Debe ingresar valores decimales mayores a 0", "info");
  } else if (value === "") {
    getMessageAlert("Debe ingresar un valor para buscar", "info");
  } else if (value < 0) {
    getMessageAlert(
      "Debe ingresar solo valores decimales positivos mayores a 0",
      "info"
    );
  }
  return value > 0 && value != "";
};
