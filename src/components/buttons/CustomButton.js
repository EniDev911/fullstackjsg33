const ASSETS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("icons/");
const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
button {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 28px;
    width: 28px;
    border: none;
    cursor: pointer;   
}
@media(max-width: 768px){
    button {
        display: none;
    }
}
</style>
<button>
</button>
`

class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        if (this.getAttribute("data-btn") === "codepen") {
            this.button.style.background = "url(".concat(ASSETS, "codepen.svg", ")")
            this.button.style.right = "55px"
            this.button.title = "Ver en Codepen"
        }
        // handleOnclick
        this.button.addEventListener("click", () => {
            if (this.getAttribute("data-btn") === "codepen") {
                this.createPen(this.getAttribute("data-lang"), this.parentNode.firstElementChild.textContent);
            }
        })
    }

    createPen(lang, content) {
        const form = document.createElement("form");
        form.action = "https://codepen.io/pen/define",
            form.method = "POST",
            form.target = "_blank",
            form.style.position = "absolute",
            form.style.left = "-9999px";
        const input = document.createElement("input");
        input.type = "hidden",
            input.name = "data",
            input.value = JSON.stringify({ title: document.title, [lang]: content }),
            form.insertAdjacentElement("afterbegin", input),
            this.shadowRoot.appendChild(form);
        form.submit();
        this.shadowRoot.removeChild(form);
    }
}

customElements.define('custom-button', CustomButton);    