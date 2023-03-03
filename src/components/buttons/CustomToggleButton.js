const ICONS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("icons/");
const template = document.createElement("template")
template.innerHTML = /*html*/`
<style>
    .wrap-toggle {
        padding: 5rem;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 70px;
        height: 30px;
        background: #fdfcf3;
        border-radius: 40px;
        cursor: pointer;
        border: 1px solid #ccc;
    }
    .switch::after {
        content: url(${ICONS.concat("sun.svg")});
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 30px;
        top: 5px;
        left: 5px;
        background-color: #000;
        filter: invert(1);
        transition: transform .2s ease;
    }
    .offscreen {
        position: absolute;
        left: -9999999px;
    }
    input[type='checkbox']:checked + .switch::after{
        content: url(${ICONS.concat("moon.svg")});
        transform: translateX(40px);
        text-align: center;
        background: #ddd;
    }
    input[type='checkbox']:checked + .switch {
        background:  #333;
    }
</style>
<div className="wrap-toggle">
    <input type="checkbox" id="toggle" class="offscreen"/>
    <label for="toggle" class="switch"></label>
</div>
`
export class CustomToggleButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector("input[type='checkbox']").addEventListener("click", () => {
            this.changeTheme();
        })
        this.checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
        if (localStorage.getItem('theme') === 'dark') {
            this.checkbox.checked = true;
        } else {
            this.checkbox.checked = false;
        }
    }

    changeTheme() {
        this.checkbox = this.shadowRoot.querySelector("input[type='checkbox']");
        const isDark = localStorage.getItem('theme') === 'dark' ? '' : 'dark'
        localStorage.setItem('theme', isDark)
        document.body.classList.toggle("dark");
    }
}
