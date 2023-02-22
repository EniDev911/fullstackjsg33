import './buttons/CustomButton.js'
import './buttons/CustomToggleButton.js'
import './CustomDetails.js'
import './CustomHeader.js'

window.onload = () => {
        const theme = localStorage.getItem("theme");
        if(theme){
            document.body.classList.add(theme);
        }
}