const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
a {
  display: inline-block;
  text-decoration: none;
  margin: 10px 0;
}
img {
  border: 2px solid black;
}
</style>
<a href="#top" role="button">
  <img alt="button img" src="">
</a>
`
class GuideButtonTop extends HTMLElement {
	color = this.getAttribute('data-color') ?? 'orange';
	logo = this.getAttribute('data-logo') ?? 'html5'
	logoColor = '%23FAC173'
	badgeUrl = `https://img.shields.io/badge/regresar%20contenido%20principal-%E2%86%A9-${this.color}?style=for-the-badge&amp;logo=${this.logo}&amp;logoColor=${this.logoColor}`
	constructor() {
		super()
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" })
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		shadow.querySelector('a').setAttribute('href', this.getAttribute('data-href'))
		shadow.querySelector('img').setAttribute('src', this.badgeUrl)
	}

}

customElements.define('guide-button', GuideButtonTop)