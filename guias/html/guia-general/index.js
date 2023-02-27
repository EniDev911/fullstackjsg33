import { CustomDetails } from "../../../src/components/CustomDetails.js";
import { CustomHeader } from "../../../src/components/CustomHeader.js";
import { CustomToggleButton } from "../../../src/components/buttons/CustomToggleButton.js";
import { CustomButton } from "../../../src/components/buttons/CustomButton.js";
import { CustomAlert } from "../../../src/components/cards/CustomAlert.js";
import { hljs } from "../../../src/assets/js/libs/highlight.min.js";

customElements.define('enidev-switch', CustomToggleButton);
customElements.define('enidev-details', CustomDetails);
customElements.define('enidev-header', CustomHeader);
customElements.define('enidev-button', CustomButton);
customElements.define('enidev-alert', CustomAlert);

document.querySelectorAll(".highlight pre code").forEach(ele => {
    const formateado = ele.textContent.trim();
    ele.textContent = formateado;
})

window.onload = () => {
    hljs.highlightAll()
    const theme = localStorage.getItem("theme");
    if (theme) {
        document.body.classList.add(theme);
    }
}