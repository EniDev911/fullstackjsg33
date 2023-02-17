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
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.button = this.shadowRoot.querySelector("button");

        if (this.getAttribute("data-btn") === "codepen") {
            this.button.style.background = "url(".concat(ASSETS, "codepen.svg", ")")
            this.button.style.right = "55px"
            this.button.title = "Ver en Codepen"
        } else if (this.getAttribute("data-btn") === "compiler") {
            this.button.style.background = "url(".concat(ASSETS, "compiler.svg", ")")
            this.button.style.right = "55px"
            this.button.title = "Ejecutar"
        }
        else {
            this.button.style.background = "url(".concat(ASSETS, "clone-regular.svg", ")")
            this.button.title = "Copiar"
        }
        // handleOnclick
        this.button.addEventListener("click", () => {
            if (this.getAttribute("data-btn") === "codepen") {
                this.createPen(this.getAttribute("data-lang"), this.parentNode.firstElementChild.textContent);
            } else if (this.getAttribute("data-btn") === "compiler") {
                this.openCompiler(this.parentNode.firstElementChild.textContent, this.getAttribute("data-lang"), this.getAttribute("data-ext"))
            } else {
                this.copyClipboard(this.parentNode.firstElementChild.textContent);
                this.button.style.background = "url(".concat(ASSETS, "clone-solid.svg", ")")
                setTimeout(() => {
                    this.button.style.background = "url(".concat(ASSETS, "clone-regular.svg", ")")
                }, 1000)
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
            o.value = JSON.stringify({ title: document.title, [lang]: content }),
            e.insertAdjacentElement("afterbegin", o),
            this.shadowRoot.appendChild(e),
            e.submit();
        this.shadowRoot.removeChild(e);
    }

    openCompiler(content, lang = "nodejs", ext = "js") {

        const ifr = document.createElement("iframe");
        ifr.src = 'https://onecompiler.com/embed/?hideNewFileOption=true&hideNew=true&hideLanguageSelection=true&theme=dark&hideStdin=true&hideTitle=true&listenToEvents=true&codeChangeEvent=true';
        ifr.width = "100%";
        ifr.frameBorder = "0"
        ifr.style.height = "100vh";
        ifr.allowFullscreen ="true";
        const childWindow = window.open("", "_blank");
        childWindow.document.body.style.boxSizing = "border-box"
        childWindow.document.body.style.padding = "0"
        childWindow.document.body.style.margin = "0"
        childWindow.document.body.appendChild(ifr);
        const eliminarCookies = () => {
            childWindow.document.cookie.split(";").forEach(function(c) {
            childWindow.document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
        }
         ifr.onload = () =>{
                ifr.contentWindow.postMessage({
                        eventType: 'populateCode',
                    language: lang,
                    files: [
                        {
                            "name": "911." + ext,
                            "content": content.trim()
                        }
                    ]
                }, "*");

                ifr.contentWindow.postMessage({
                    eventType: 'triggerRun'
                }, '*')
        }
        childWindow.document.onreadystatechange = () => {
            if (childWindow.document.readyState === "interactive") {
                eliminarCookies()
            } 
            if (childWindow.document.readyState === "complete"){
                childWindow.console.log(childWindow.document.cookie)
            }
        }
    }
}

customElements.define('custom-button', CustomButton)
