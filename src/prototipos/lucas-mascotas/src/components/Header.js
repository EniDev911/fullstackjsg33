const ASSETS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("../../public/");
const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
    header {
        width: 100%;
        font-family: sans-serif;
        position: fixed;
        height: 100px;
        top:0;
        right: 0;
        z-index: 100;
        background: black;
        transition: height .2s ease;
    }
    .container__header {
        max-width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        padding: 0 20px;
        
    }
    header .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #ccc;
    }
    header .logo img {
        width:90px;
    }
    .container__nav {
        position: relative;
        height: 100%;
        
    }
    nav {
        height: 100%;
        transition: right .2s ease;
        z-index: -1;
    }
    nav ul {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    nav ul li {
        margin: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
    }
    nav ul li a{
        color: #f6f6f6;
        text-decoration: none;
        font-size: 14px;
        transition-property: padding background;
        transition-duration: .3s;
        transition-timing-function: cubic-bezier(.5, .09, .1, -.8);
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    .btn__menu {
        width: 50px;
        height: 50px;
        font-size:22px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: background 300ms;
        cursor: pointer;
        display: none;
    }
    .btn__menu:hover {
        background:#333;
        z-index: 999;
    }
    .select {
        background: #00ceba;;
        padding: 10px 30px;
        border-radius: 20px;
        color: #000;
    }
    .nav_mod {
        height: 70px;
        box-shadow: 1px 1px 10px 0px #00000010;
        background:#000;
    }
    .show_menu {
        right: 0;
    }

    @media(max-width:760px){
        .container__header {
            display: flex;
            align-items: center;
        }
        .container__header {
            display: flex;
            align-items: center;
        }
        .btn__menu {
            display:flex;
        }
        nav {
            height: 100%;
            background:#111;
            position:fixed;
            top:0;
            width: 100%;
            right: -100%;
            padding: 0 10px;
            border: 1px solid red;
        }
        nav ul {
            flex-direction: column;
        }
        nav ul li {
            flex-basis: 20%;
            border: 1px solid red;
        }
        .select {
            border-radius: 0px;
        }

    } 
</style>
<header>
    <div class="container__header">
        <div class="logo">
            <img src=${ASSETS.concat("logo.png")} alt="logo"/>
        </div>
        <div class="container__nav">
            <nav>
                <ul>
                    <li><a href="#home" class="select">home</a></li>
                    <li><a href="#servicios">Servicios</a></li>
                    <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>
        </div>
        <div class="btn__menu" id="menu"><i class="fas fa-bars" style="color: #fff;"></i></div>
    </div>
</header>
`

class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelectorAll("a").forEach(link => {
            link.addEventListener('click', (e) => this.selectOption(e.target))
            console.log(link)
        })
        this.shadowRoot.getElementById("menu").addEventListener("click", () => {
            this.showMenu();
        })
        window.onscroll = () => {
            this.changeOnScroll();
        }
    }

    selectOption(currentLink) {
        this.shadowRoot.querySelectorAll("a").forEach(link => {
            link === currentLink ? link.classList.add("select") : link.classList.remove("select")
        })
    }

    changeOnScroll() {
        const scroll = document.documentElement.scrollTop;
        const header = this.shadowRoot.querySelector("header");
        scroll > 20 ? header.classList.add("nav_mod") : header.classList.remove("nav_mod")
    }

    showMenu() {
        const nav = this.shadowRoot.querySelector("nav");
        nav.classList.toggle("show_menu");
    }
}

customElements.define('custom-header', Header)