const DEFAULT_LINKS = [{name: 'home', path: 'index.html'}, {name: 'about', path: 'about.html'}]
const template = document.createElement('template');
template.innerHTML = /*html*/`
	<style>
		* {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		nav {
			background-color: blueviolet;
		}
		ul {
			display: flex;
			list-style: none;
		}
		li {
			margin: 0 10px;
		}
		li:hover{
			background-color: #6d3;
		}
		li a.link {
			line-height: 40px;
			text-decoration: none;
		}
	</style>
		<nav>
		 <ul>
		 	<li><a class="link" href=""></a></li>
		 	<li><a class="link" href=""></a></li>
		 	<li><a class="link" href=""></a></li>
		 </ul>	
	</nav>
`


class NavElement extends HTMLElement {
	constructor(){
		super()
		this.curPath = window.location.pathname;
	}

	connectedCallback(){

		const shadow = this.attachShadow({mode: "open"})
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		  // find all slots with a hw-text class
  		Array.from(shadow.querySelectorAll('.link') )
    	// update links
    	.forEach((ele, index) => {
    		ele.textContent = DEFAULT_LINKS[index].name
    		ele.setAttribute('href', DEFAULT_LINKS[index].path) 
    	});
	}

}

customElements.define('web-nav', NavElement)