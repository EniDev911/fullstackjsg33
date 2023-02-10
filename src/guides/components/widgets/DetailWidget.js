const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
  details {
    border: 2px solid #000;
    border-radius: 0;
    padding: 0.5em 0.5em 0;
    margin: 10px 0;
  }
  summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
    background: linear-gradient(#f26626 50%, #ed704b 0);
    color: #fff;
  }
</style>
<details>
  <summary></summary>
  <slot>void</slot> 
</details>
`;

class DetailWidget extends HTMLElement {
  constructor() {
    super();
  }
  title = this.getAttribute("data-title") ?? "detalle";
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    shadow.querySelector("summary").textContent = this.title;
    shadow.querySelector("details").setAttribute("open", "true");
  }
}

customElements.define("enidev-details", DetailWidget);
