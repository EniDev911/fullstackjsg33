const ASSETS = import.meta.url.substring(0, import.meta.url.lastIndexOf("/") + 1).concat("../../public/");
const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    .container__hero {
        width: 100%;
        margin-top: 100px;
        padding-bottom: 60px;
        overflow: hidden;
    }
    .container__cover {
        max-width: 1200px;
        margin: 0 auto;
        background: #ccc;
        display: flex;
        justify-content: space-between;
        padding: 40px 0;
        background-image: linear-gradient(#000 40%, #f9f9f9 70%);
    }
    .container__info {
        max-width:400px;
        margin-top: 40px;
        z-index: 2;
    }
    .container__info h1 {
        font-weight: 900;
        color: #00ceba;
        font-size: 50px;
        font-family: sans-serif;
    }
    .container__info h2 {
        font-size: 45px;
        font-weight: 900;
        color: #00ceba;
        margin-top: -25px;
    }
    .container__info p {
        margin-top: -15px;
    }
    .container__vector {
        position: relative;
        max-width: 600px;
        width: 600px;
    }
    .container__vector img {
        position: absolute;
        width: 60%;
        height: 100%;
        left: 130px;
        animation: move_vector 6s ease-in-out infinite;
    }

    @keyframes move_vector {
        0% {
            transform: translateY(10px); 
        }
        50%{
            transform: translateY(-10px); 
        }
        100%{
            transform: translateY(10px); 
        }
    }
</style>
<div class="container__hero">
    <div class="container__cover">
        <div class="container__info">
            <h1>Lucas Mascotas</h1>
            <h2>Distribuidora</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor earum, provident natus ea dolore autem perferendis corporis, incidunt dolorem veritatis optio distinctio est cupiditate accusantium, voluptate libero labore ab atque.</p>
            <a href="https://www.facebook.com/profile.php?id=100037925709543" target="_blank">Facebook</a>
            <a href="">Instagram</a>
        </div>
        <div class="container__vector">
            <img src=${ASSETS.concat('logo.png')} alt="" />
        </div>
    </div>
</div>
`

class Hero extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

}

customElements.define('custom-hero', Hero)