const template = document.createElement("template");
template.innerHTML =/*html*/`
<style>
</style>
<div class="carrousel">
  <div class="grande">
    <img src="#" alt="" class="img" />
    <img src="#" alt="" class="img" />
  </div>
  <ul class="puntos">
    <li class="punto"></li>
    <li class="punto"></li>
  </ul>
</div>
`

class Carrousel extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("custom-carrousel", Carrousel)