const template = document.createElement("template");
template.innerHTML = /*html*/`
<table>
	<thead></head>
	<tbody></tbody>
</table>
`

export class CustomTable extends HTMLElement {
    constructor(){
        super();
		this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}