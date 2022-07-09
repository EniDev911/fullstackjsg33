const module_1 = document.getElementById("module-1");
const module_2 = document.getElementById("module-2");
const module_3 = document.getElementById("module-3");

/**
 * 
 * @param {string} module - The module to change 
 */
function module_change(module) {
  this.module = module;
  if (this.module === 1) {
    module_1.classList.remove("collapse");
    module_2.classList.add("collapse");
    module_3.classList.add("collapse");
  }
  else if (this.module === 2) {
    module_1.classList.add("collapse");
    module_3.classList.add("collapse");
    module_2.classList.remove("collapse");
  }
  else if (this.module === 3){
    module_1.classList.add("collapse");
    module_2.classList.add("collapse");
    module_3.classList.remove("collapse");
  }
}
