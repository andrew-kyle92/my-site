// All variables


// Tab Menu Function
function tabOptions(evt, Option) {
    var tabContent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    let tabLinks = document.getElementsByClassName('about-btn');
    for (let i = 0; i < tabLinks.length; i++){
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(Option).style.display = "flex";
    evt.currentTarget.className += " active";
}

// Checking Cookie for Site Changes
let cookieID = document.cookie;

if(cookieID === "null"){
    
}