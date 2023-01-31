import { projects } from "./data.js";

const { href } = window.location;
const publicPATH = href + 'public/'

const module_1 = document.getElementById("module-1"),
  module_2 = document.getElementById("module-2"),
  module_3 = document.getElementById("module-3"),
  module_4 = document.getElementById("module-4"),
  module_5 = document.getElementById("module-5"),
  btns_clone = document.querySelectorAll(".fa-clone"),
  btns_copy = document.querySelectorAll("i.clone"),
  innerCarousel_1 = document.getElementById("inner-carousel-1"),
  innerCarousel_2 = document.getElementById("inner-carousel-2"),
  innerCarousel_3 = document.getElementById("inner-carousel-3"),
  innerCarousel_4 = document.getElementById("inner-carousel-4"),
  innerCarousel_5 = document.getElementById("inner-carousel-5"),
  btns_module = document.querySelectorAll(".module");

let template;

/**
 *
 * @param {integer} module - The module to change
 */

const module_change = function (module) {
    for (let i of [module_1, module_2, module_3, module_4, module_5]) {
      if (module === i.dataset.name){
        i.classList.remove("collapse"); // show
        console.log(i.classList);
      }else {
         i.classList.add("collapse");
      }
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

btns_copy.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.replace("clone", "cloned");
    setTimeout(() => {
      btn.classList.replace("cloned", "clone");
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
    <div class="carousel-item${active} border border-primary">
      <div class="bg-${obj.background} bg-gradient d-flex flex-column pt-1">
        <h2 class="h4 p-3 m-0 text-center text-${obj.color}">${obj.title}</h2>
          <ul class="nav nav-tabs nav-fill pb-0 justify-content-center">
            <li class="nav-item">
              <a title="Ver demo" href="${obj.url_demo}" target="_blank" class="nav-link rounded-0">
                <i class="fs-3 text-${obj.color} fa-solid fa-eye"></i>
              </a>
            </li>
            <li class="nav-item outline-light">
              <a title="Ver código" href="${obj.url_code}" target="_blank" class="nav-link rounded-0">
                <i class="fs-3 text-${obj.color} fa-brands fa-github"></i>
              </a>
           </li>`;
  if (typeof obj.url_zip != "undefined") {
    template += `<li class="nav-item"><a title="Descargar" href="${obj.url_zip}" target="_blank" class="nav-link rounded-0" download><i class="fs-3 text-${obj.color} fa-solid fa-download"></i></a></li>`;
  }

  template += `
        </ul>
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
    } else if (project.module === 5) {
      fillTemplate(project);
      innerCarousel_5.innerHTML += template;
    }
  });
};

const getTime = () => {
  const timeNow = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  }).format(new Date());
  document.querySelector("#clock").innerHTML = timeNow;
};


window.addEventListener("load", () => {
  if (window.location.pathname === '/' || '/fullstackjsg33/'){
    getTime();
    addProject();
    setInterval(() => {
      getTime();
    }, 60000);

  }else {
    console.log(window.location.pathname);
}
});
