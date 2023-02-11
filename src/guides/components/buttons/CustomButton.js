const ASSETS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("icons/");
const template = document.createElement('template');
template.innerHTML = /*html*/
`
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

</style>
 <button>
 </button>
`
class CustomButton extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.button = this.shadowRoot.querySelector("button");

        if (this.getAttribute("data-btn") === "codepen") {
            this.button.style.background = "url(".concat(ASSETS, "codepen.svg", ")")
            this.button.style.right = "55px"
        } else{
            this.button.style.background = "url(".concat(ASSETS, "clone-regular.svg", ")")
        }
        this.button.addEventListener("click", () => {
            if (this.getAttribute("data-btn") === "codepen") {
                this.createPen(this.getAttribute("data-lang"), this.parentNode.firstElementChild.textContent);
            } else {
                this.copyClipboard(this.parentNode.firstElementChild.textContent);
                this.button.style.background = "url(".concat(ASSETS, "clone-solid.svg", ")")
                setTimeout(() => {
                    this.button.style.background = "url(".concat(ASSETS, "clone-regular.svg", ")")
                }, 2000)
            }
        })
    }
    disconnectedCallback() {
        this.button.removeEventListener("click", this.copyClipboard.bind(this));
    }

    copyClipboard(content) {
        if (typeof content != "string") {
            throw TypeError("El argumento debe ser un String");
        }
        const areaText = document.createElement("textarea");
        areaText.value = content;
        areaText.setAttribute("readonly", "");
        areaText.style.position = "absolute";
        areaText.style.left = "-9999px";
        this.shadowRoot.appendChild(areaText);
        const selection = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

        areaText.select();
        document.execCommand("copy");
        this.shadowRoot.removeChild(areaText);

        if (selection) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selection);
        }
    }

    createPen(lang, content) {
        if (typeof content != "string") {
            throw TypeError("El argumento debe ser un String");
        }
        const e = document.createElement("form");
        e.action = "https://codepen.io/pen/define",
        e.method = "POST",
        e.target = "_blank",
        e.style.position = "absolute",
        e.style.left = "-9999px";
        const o = document.createElement("input");
        o.type = "hidden",
        o.name = "data",
        o.value = JSON.stringify({title: document.title, [lang]: content}),
        e.insertAdjacentElement("afterbegin", o),
        this.shadowRoot.appendChild(e),
        e.submit();
        this.shadowRoot.removeChild(e);
    }

}

customElements.define('custom-button', CustomButton)
