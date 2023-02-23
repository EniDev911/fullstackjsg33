const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
  details {
    border-radius: 0;
    padding: 0.5em 0.5em 0;
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
<details open>
  <summary></summary>
  <slot></slot> 
</details>
`;

export class CustomDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  title = this.getAttribute("data-title") ?? "detalle";

  connectedCallback() {
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const summary = this.shadowRoot.querySelector("summary")
    summary.textContent = this.title;
    if (this.getAttribute("data-lang") === "postgresql") {
      summary.style.background = "linear-gradient(#31648c 50%, #11446c 0)"
      shadow.querySelector("details").style.border = "1px solid #ccc"
    }
    this.shadowRoot.querySelector("details").setAttribute("open", "true");
  }
}