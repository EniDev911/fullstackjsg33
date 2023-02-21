const GUIAS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("../", "guias/");
const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
  header {
    position: fixed;
    top:0;
    width: 100%;
    background-color: rgba(255, 255, 255, .4);
    backdrop-filter: blur(10px);
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    height: 70px;
  }
  nav.menu {
    height: 100%;
  }
  .nav {
    display: flex;
    flex-direction: column;
    list-style: none;
    background: transparent;
    position: relative;
    height: 100%;
    width: 100%;
    transition: transform .2s ease;
    padding:0;
    margin: 0 auto;
 }
 .nav li {
  height: 100%;
  width: 100%;

 }
 .nav li a {
  display: inline-flex;
  height: 100%;
  width:100%;
  align-items: center;
  text-decoration: none;
  margin: 0 20px;
 }


@media(min-width: 992px){
  .navbar {
    width: 90%;
    justify-content: flex-end;
  }
  .nav {
    flex-direction: row;
    width: auto;
    transform: translateX(0);
  }

}
</style>
<header>
<div class="navbar">
  <nav class="menu">
  <slot></slot>
    <ul class="nav">
      <li><a href=${GUIAS} class="nav-link">Guias</a></li>
      <li><a href="../">Blog</a></li>
      <li><a href="../">Contacto</a></li>
    <ul>
  </nav>
</div>
</header>
`

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('enidev-header', CustomHeader);