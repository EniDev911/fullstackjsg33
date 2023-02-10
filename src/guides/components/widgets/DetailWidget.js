const template = document.createElement('template');
template.innerHTML = `
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
  	cursor: pointer;
    color: #fff;
  	transition: margin .2s ease-in;
   }
  details[open] {
    padding: 0.5em;
   }

  details[open] summary {
  	margin-bottom: 10px;
  }
</style>
   <details>
      <summary>Introducción a HTML5</summary>
      <slot>desconocido</slot> 
   </details>
`

class DetailWidget extends HTMLElement {
	constructor(){
		super();
	}
	title=this.getAttribute('data-title') ?? 'detalle';
	connectedCallback(){
		const shadow = this.attachShadow({mode: "open"})
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		shadow.querySelector('summary').textContent =  this.title
	}
}

customElements.define('enidev-details', DetailWidget)