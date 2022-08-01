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
  else if (this.module === 3) {
    module_1.classList.add("collapse");
    module_2.classList.add("collapse");
    module_3.classList.remove("collapse");
  }
}

function copy_clipboard(text) {
  if (typeof (text) != 'string') {
    throw TypeError("The argument must be a string")
  }
  let areaText = document.createElement('textarea');
  areaText.value = text
  areaText.setAttribute('readonly', '');
  areaText.style.position = 'absolute';
  areaText.style.left = '-9999px';
  document.body.appendChild(areaText);
  let selection = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

  areaText.select();

  document.execCommand('copy');
  document.body.removeChild(areaText);
  if (selection) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selection);
  }
}