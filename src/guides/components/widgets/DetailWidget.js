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
  ::host(*) { 
    border: 1px solid red;
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
    const summary = shadow.querySelector("summary")
    summary.textContent = this.title;
    if (this.getAttribute("data-lang") === "postgresql") {
      summary.style.background = "linear-gradient(#31648c 50%, #11446c 0)"
      shadow.querySelector("details").style.border = "1px solid #ccc"
    }

    shadow.querySelector("details").setAttribute("open", "true");
  }
}

customElements.define("enidev-details", DetailWidget);
