const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
</style>
<button>
</buton>
`

class CustomButton extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }
    
}