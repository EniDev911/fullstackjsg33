const module_1 = document.getElementById("module-1");
const module_2 = document.getElementById("module-2");

function module_change(module) {
  this.module = module;
  if (this.module === 1) {
    module_1.classList.remove("collapse");
    module_2.classList.add("collapse");
  }
  else if (this.module === 2) {
    module_1.classList.add("collapse");
    module_2.classList.remove("collapse");
  }
}