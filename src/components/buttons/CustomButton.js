const ASSETS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("icons/");
const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
button {
    position: absolute;
    right: 10px;
    height: 28px;
    width: 28px;
    border: none;
    cursor: pointer;   
    pointer-events: all;
    z-index: 2;
}

@keyframes pulse {
    from { transform: scale(1); } 
    to { transform: scale(1.06); } 
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

export class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    btn = this.getAttribute("data-btn");

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        if (this.btn === "codepen") {
            this.button.style.background = "url(".concat(ASSETS, "codepen.svg", ")")
            this.button.style.top = "10px"
            this.button.style.right = "55px"
            this.button.title = "Ver en Codepen"
        } else if (this.btn === "compiler") {
            console.log("compiler")
        } else if (this.btn === "top"){
            this.button.style.bottom = "-20px"
            this.button.style.right = "50%";
            this.button.style.background = "url(".concat(ASSETS, "arrow-up.svg", ")")
            this.button.style.backgroundRepeat = "no-repeat";
            this.button.style.backgroundPosition = "center"
            this.button.style.backgroundColor = "#fff";
            this.button.style.padding = "20px";
            this.button.style.borderRadius = "30px";
            this.button.style.animation = "pulse .9s ease infinite alternate"
        } 
        else {
            this.button.style.top = "10px"
            this.button.style.background = "url(".concat(ASSETS, "clone-regular.svg", ")")
            this.button.title = "Copiar"
        }
        // handleOnclick
        this.button.addEventListener("click", () => {
            if (this.btn === "codepen") {
                this.createPen(this.getAttribute("data-lang"), this.parentNode.firstElementChild.textContent);
            } else if (this.btn === "compiler") {
              console.log("compiler")
            } else if(this.btn === "top") {
                window.scrollTo({top: 0, behavior: 'smooth'})
            }
            else {
                this.copyClipboard(this.parentNode.firstElementChild.textContent);
                this.button.style.background = "url(".concat(ASSETS, "clone-solid.svg", ")")
                setTimeout(() => {
                    this.button.style.background = "url(".concat(ASSETS, "clone-regular.svg", ")")
                }, 1000)
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
            input.value = JSON.stringify({ title: document.title, [lang]: content.trim() }),
            form.insertAdjacentElement("afterbegin", input),
            this.shadowRoot.appendChild(form);
        form.submit();
        this.shadowRoot.removeChild(form);
    }
    copyClipboard(content) {
        if (typeof content != "string") {
            throw TypeError("El argumento debe ser un String");
        }
        const areaText = document.createElement("textarea");
        areaText.value = content.trim();
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
}