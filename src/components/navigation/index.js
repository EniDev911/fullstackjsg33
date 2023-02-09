const template = document.createElement('template')
template.innerHTML = `
	<style>
		label { 
			display: block;
			color: green; 
		}
		.description {
			font-size: 8px;
			color: red;
		}
	</style>
	<label>
	  <input type="checkbox">
	  <slot></slot>
	  <span class="description">
	  	<slot name="description"></slot>
	  </span>
	</label>
	`

class Nav extends HTMLElement {
	constructor(){
		super()
		const shadow = this.attachShadow({mode: "open"})
		shadow.append(template.content.cloneNode(true))
	}
}

customElements.define("nav-page", Nav)