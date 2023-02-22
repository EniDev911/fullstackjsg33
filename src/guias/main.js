import '../components/main.js'
import {hljs} from '../public/js/lib/highlight.min.js'

window.onload = () => {
    hljs.highlightAll()
    const theme = localStorage.getItem("theme");
    if(theme){
        document.body.classList.add(theme);
    }
    let estilos = document.querySelector('.highlight');
    estilos.addEventListener("click", () => alert('hola'))
}