const GUIAS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("../", "guias/"),
      BLOG =  'blog',
      CONTACTO = 'contacto'
const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
  header {
    position: fixed;
    top:0;
    width: 100%;
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(10px);
    z-index: 2;
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
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
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
  color: var(--links);
  margin: 0 20px;
  font-family: sans-serif;
 }


@media(min-width: 992px){
  .navbar {
    width: 90%;
    justify-content: flex-end;
  }
  .nav {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
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
      <li><a href=${BLOG}>Blog</a></li>
      <li><a href=${CONTACTO}>Contacto</a></li>
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