const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
  blockquote {
    background: #6dc4d259;
    color: #222222;
    padding: 15px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    border-left: 8px solid #6dc4d2;
    position: relative;
  }
  ::slotted(p){
    color: var(--paragraphs);
  }
  ::slotted(p):before {
    content: url('data:image/svg+xml;utf8,<svg width=\"46\" height=\"46\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"%23cccccc\" stroke-width=\"2\" fill=\"transparent\"><path d=\"M12,17 L12,19 M12,10 L12,16 M12,3 L2,22 L22,22 L12,3 Z\"/></svg>');
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: var(--main-background);
    right: -40px;
    bottom: -60px;
  }
</style>
<blockquote>
  <slot></slot>
</blockquote>
`
export class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  alert = this.getAttribute("data-alert");

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.blockquote = this.shadowRoot.querySelector("blockquote");
    if (this.alert === "danger") {
      this.blockquote.style.background = "#f4563959";
      this.blockquote.style.borderLeftColor = "#f4484999"
    }
  }
}