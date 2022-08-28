import { projects } from "./data.js";

const module_1 = document.getElementById("module-1"),
  module_2 = document.getElementById("module-2"),
  module_3 = document.getElementById("module-3"),
  module_4 = document.getElementById("module-4"),
  btns_clone = document.querySelectorAll(".fa-clone"),
  innerCarousel_1 = document.getElementById("inner-carousel-1"),
  innerCarousel_2 = document.getElementById("inner-carousel-2"),
  innerCarousel_3 = document.getElementById("inner-carousel-3"),
  innerCarousel_4 = document.getElementById("inner-carousel-4"),
  btns_module = document.querySelectorAll(".module");

let template;

/**
 *
 * @param {integer} module - The module to change
 */

const module_change = function (module) {
  if (module === "m-1") {
    module_1.classList.remove("collapse"); // show
    module_2.classList.add("collapse");
    module_3.classList.add("collapse");
    module_4.classList.add("collapse");

  } else if (module === "m-2") {
    module_1.classList.add("collapse");
    module_2.classList.remove("collapse"); // show
    module_3.classList.add("collapse");
    module_4.classList.add("collapse");
  } else if (module == "m-3") {
    module_1.classList.add("collapse");
    module_2.classList.add("collapse");
    module_3.classList.remove("collapse"); // show
    module_4.classList.add("collapse");
  } else if (module === "m-4") {
    module_1.classList.add("collapse");
    module_2.classList.add("collapse");
    module_3.classList.add("collapse");
    module_4.classList.remove("collapse"); // show
  }
};

btns_module.forEach((btn) => {
  btn.addEventListener("click", () => {
    module_change(btn.dataset.name);
  });
});

const copy_clipboard = (text) => {
  if (typeof text != "string") {
    throw TypeError("The argument must be a string");
  }
  let areaText = document.createElement("textarea");
  areaText.value = text;
  areaText.setAttribute("readonly", "");
  areaText.style.position = "absolute";
  areaText.style.left = "-9999px";
  document.body.appendChild(areaText);
  let selection =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  areaText.select();

  document.execCommand("copy");
  document.body.removeChild(areaText);

  if (selection) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selection);
  }
};

window.copy_clipboard = copy_clipboard;

btns_clone.forEach((btn) => {
  btn.classList.replace("fa-solid", "fa-regular");
  btn.addEventListener("click", () => {
    btn.classList.replace("fa-regular", "fa-solid");
    setTimeout(() => {
      btn.classList.replace("fa-solid", "fa-regular");
    }, 1000);
  });
});

const fillTemplate = (obj) => {
  template = "";
  let active = "";
  if (obj.active) {
    active = " active";
  }
  template += `
      <div class="carousel-item${active}">
        <div class="options bg-${obj.background} bg-gradient rounded-top py-2 text-center">
          <h2 class="h5 text-${obj.color}">${obj.title}</h2>
          <a href="${obj.url_demo}" target="_blank" class="btn btn-outline-${obj.color} me-1">Ver demo <i class="fa-solid fa-eye"></i></a>
          <a href="${obj.url_code}" target="_blank" class="btn btn-outline-${obj.color} me-2">Ver código <i class="fa-solid fa-file-code"></i></a>`;
  if (typeof obj.url_zip != "undefined") {
    template += `<a href="${obj.url_zip}" target="_blank" class="btn btn-outline-${obj.color} select-bg" download>Descargar <i class="fa-solid fa-download"></i></a>`;
  }
  template += `
        </div>
        <img src="${obj.image}" alt="${obj.title}" title="${obj.title}" class="d-block w-100">
      </div>`;
};
const addProject = () => {
  projects.forEach((project) => {
    if (project.module === 1) {
      fillTemplate(project);
      innerCarousel_1.innerHTML += template;
    } else if (project.module === 2) {
      fillTemplate(project);
      innerCarousel_2.innerHTML += template;
    } else if (project.module === 3) {
      fillTemplate(project);
      innerCarousel_3.innerHTML += template;
    } else if (project.module === 4) {
      fillTemplate(project);
      innerCarousel_4.innerHTML += template;
    }
  });
};

const getTime = () => {
  const timeNow = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  }).format(new Date());
  document.querySelector("#clock").innerHTML = timeNow;
};

setInterval(() => {
  getTime();
}, 60000);

window.addEventListener("load", () => {
  getTime();
});

addProject();
