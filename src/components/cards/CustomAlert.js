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
    color: var(--paragraph);
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
  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}