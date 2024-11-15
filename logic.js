//function for adjusting style, returns value of property in number
function adjustStyle(HTMLelement, CSSelement) {
    let variable = getComputedStyle(document.getElementById(HTMLelement)).getPropertyValue(CSSelement);
    var value = "", unit = "";
    for (let i = 0; i < variable.length; i++) {        
        if (variable[i] == ".") {
            value += variable[i];
        }
        else if (isNaN(parseInt(variable[i]))) {
            unit += variable[i];
        } else {
            value += variable[i];
        }
    }
    return parseInt(value);
};

//Variables
const nameContainer = document.getElementById("name-container"),
fontSizeInitials = adjustStyle("J", "font-size"),
fontSizeOtherletters = adjustStyle("avier", "font-size"),
marginTopName = adjustStyle("name", "margin-top"),
fontSizeName = adjustStyle("name", "font-size"),
J = document.getElementById("J"),
H = document.getElementById("header"),
M = document.getElementById("M"),
N = document.getElementById("name"),
V = document.querySelectorAll(".vanishing-letters"),
vanishingLetters = [document.getElementById("avier"), document.getElementById("eza")],
S = document.getElementById("subtitle"),
lightMode = document.getElementById("light-icon"),
darkMode = document.getElementById("dark-icon"),
space4 = document.getElementById('space4'),
sp1Height = adjustStyle("space1", "height"),
sectionsContainer = document.getElementById("sections-container"),
projectsNavbar = document.getElementById("Projects-navbar"),
certificationsNavbar = document.getElementById("Certifications-navbar"),
aboutMeNavbar = document.getElementById("Aboutme-navbar"),
contactNavbar = document.getElementById("Contact-navbar"),
cert1 = document.getElementById("cert1"),
initials = [J, M],
colorRed = ["rgb(242, 222, 222)", "rgb(210, 110, 110)", "rgb(55, 175, 175)", "rgb(122, 0, 0)", "rgb(48, 0, 0)"],
colorGreen = ["rgb(222, 242, 222)", "rgb(110, 210, 110)", "rgb(175, 55, 175)", "rgb(0, 122, 0)", "rgb(0, 48, 0)"],
colorBlue = ["rgb(222, 222, 242)", "rgb(110, 110, 210)", "rgb(175, 175, 55)", "rgb(0, 0, 122)", "rgb(0, 0, 48)"],
colorGrey = ["rgb(222, 222, 222)", "rgb(150, 150, 150)", "rgb(0, 0, 0)", "rgb(90, 90, 90)", "rgb(48, 48, 48)"];
const colorArray = {'red': colorRed, 'green': colorGreen, 'blue': colorBlue, 'grey': colorGrey};
var chosenColor;
if (localStorage.getItem('chosenColor') != null) {
    chosenColor = localStorage.getItem('chosenColor');
} else {
    chosenColor = 'blue';
}

var lightDarkMode;
if (localStorage.getItem('lightDarkMode') == 'light') {
        lightDarkMode = 'light';
} else {
    lightDarkMode = 'dark';
}

window.addEventListener('resize', function() {
    if (this.document.documentElement.scrollTop < 500) {
        nameContainer.style.width = adjustStyle("header", "width") + "px";
    }
});

window.addEventListener('scroll', function() {
    const scroller = document.documentElement.scrollTop;
    //document.getElementById("scrollmeter").innerHTML = scroller.toFixed();
  
    //Reduce initial's font size on scroll        
    initials.forEach((letter) => {
        letter.style.fontSize = (fontSizeInitials - ((fontSizeInitials - 60) / 500 * scroller)).toFixed() + "px";
        if (scroller > 500) {letter.style.fontSize = "60px";}
    });

    //Reduce font size of letters: "avier" and "eza" on scroll    
    vanishingLetters.forEach((element) => {
        element.style.fontSize = (fontSizeOtherletters - ((((scroller / 35)**2) * fontSizeOtherletters / 176))).toFixed() + "px";
        if (scroller > 400) {element.style.fontSize = "0";}
    });
    
    //Reduce name's margin on scroll
    nameContainer.style.marginTop = (marginTopName * (1 - scroller / 500)).toFixed() + "px";
    nameContainer.style.marginBottom = (marginTopName * (1 - scroller / 500)).toFixed() + "px";
    if (scroller > 500) {}
    
    //Reduce name's line-height on scroll
    N.style.lineHeight = (138 - (scroller / 4.7)).toFixed() + "%";
    if (scroller > 500) {}

    //Reduce name-container width on scroll
    nameWidth = adjustStyle("header", "width");
    nameContainer.style.width = (nameWidth - ((nameWidth - 140) / 500 * scroller)).toFixed() + "px";
    if (scroller > 500) {}
    
    //Subtitle and letters: "avier" and "eza" fade out on scroll
    V.forEach((element) => {
        element.style.opacity = (1 - (scroller / 300)).toFixed(2);        
    });
        
    //Reduce <space1> on scroll
    document.getElementById("space1").style.height = (sp1Height * (1 - scroller / 500)).toFixed() + "px";
    
    if (scroller > 500) {
        S.style.display = "none"; //Delete subtitle from header
        changeNavbarColor(chosenColor); //Change navbar color
        document.getElementById("space1").style.height = "0"; //Delete <space1>
        H.style.flexDirection = "row"; //Change aspect of header into navbar
        sectionsContainer.classList.remove('display-none'); //Show sections-container
        nameContainer.style.width = "140px"; //Fix name-container width 
        N.style.lineHeight = "31%"; //Fix name's line-height
        nameContainer.style.margin = "0"; //Fix name's margin
        space4.style.display = "inline-block";
    } else {
        S.style.display = "block";
        H.style.flexDirection = "column";
        sectionsContainer.classList.add('display-none');
        H.style.backgroundColor = "initial";
        H.style.boxShadow = "initial";
        H.style.backdropFilter = "initial";
        space4.style.display = "none";
    }
});

//function for changing navbar color
function changeNavbarColor(chosenColor) {
    if (document.documentElement.scrollTop > 500) {
        var choosedNavbarColor;
        switch (chosenColor) {
            case 'blue':
                choosedNavbarColor = lightDarkMode === 'light' ? "rgb(110, 110, 210, 0.6)" : "rgba(0, 0, 122, 0.6)";                
                break;
            
            case 'green':
                choosedNavbarColor = lightDarkMode === 'light' ? "rgb(110, 210, 110, 0.6)" : "rgba(0, 122, 0, 0.6)";
                break;
            
            case 'red':
                choosedNavbarColor = lightDarkMode === 'light' ? "rgb(210, 110, 110, 0.6)" : "rgba(122, 0, 0, 0.6)";
                break;

            case 'grey':
                choosedNavbarColor = lightDarkMode === 'light' ? "rgb(150, 150, 150, 0.6)" : "rgba(90, 90, 90, 0.6)";
                break;
        }
        H.style.backgroundColor = choosedNavbarColor;
        H.style.boxShadow = "0 10px 50px #001216";   
        H.style.backdropFilter = "blur(10px)";
    } else {
        H.style.backgroundColor = "initial";
        H.style.boxShadow = "initial";
        H.style.backdropFilter = "initial";
    }
}

// Show/hide tools
function tools() {
    let tools = document.getElementById('tools');
    tools.classList.toggle('tools-visible');
}

//Switch dark/light mode
function changeIconColor(color) {
    icons = ['light-icon-path', 'dark-icon-path', 'color-icon-path', 'tools-icon-path'];

    for (let i = 0; i < icons.length; i++) {
        document.getElementById(icons[i]).style.stroke = lightDarkMode === 'light' ? colorArray[color][3] : colorArray[color][1];
        document.getElementById(icons[i]).style.fill = lightDarkMode === 'light' ? colorArray[color][3] : colorArray[color][1];
    }
    lightMode.style.display = lightDarkMode === "light" ? "none" : "inline-block";
    darkMode.style.display = lightDarkMode === "dark" ? "none" : "inline-block";
}

//Show some elements only when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('body').style.visibility = 'visible';
   H.style.visibility = 'visible';
});

// Modal
function showModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "flex";
    modal.classList.remove('hide');
    modal.classList.add('show');
}
function closeModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "none";
    modal.classList.remove('show');
    modal.classList.add('hide');
}
window.onclick = function(event) {
    if (event.target.id == "modal") {
        modal.classList.remove('show');
        modal.classList.add('hide');
        modal.addEventListener('animationend', (event) => {
            if (event.animationName === 'close-modal') {
                modal.style.display = 'none';
            }
        });
    }
}

var DOMElements = ['body', 'header', 'name', 'subtitle'];
var DOMCollections = ['h3', 'h4', 'p', '.project-action'];

DOMElements.forEach((element) => {
    document.getElementById(element).classList.add(chosenColor);
    document.getElementById(element).classList.add(lightDarkMode);
});

DOMCollections.forEach((name) => {
    document.querySelectorAll(name).forEach((element) => {
        element.classList.add(chosenColor);
        element.classList.add(lightDarkMode);
    });
});

changeNavbarColor(chosenColor);
changeIconColor(chosenColor);

function changeColor(color) {
    var colors = ['red', 'green', 'blue', 'grey'];
    colors.forEach((element) => {
        DOMElements.forEach((DOMElement) => {
            document.getElementById(DOMElement).classList.remove(element);
        });
    });
    DOMElements.forEach((DOMElement) => {
        document.getElementById(DOMElement).classList.add(color);
        if (lightDarkMode == 'light') {
            document.getElementById(DOMElement).classList.add('light');
            document.getElementById(DOMElement).classList.remove('dark');
        } else {
            document.getElementById(DOMElement).classList.add('dark');
            document.getElementById(DOMElement).classList.remove('light');
        }
    });
    DOMCollections.forEach((name) => {
        document.querySelectorAll(name).forEach((element) => {
            for (let i = 0; i < colors.length; i++) {
                element.classList.remove(colors[i]);
            }
            element.classList.add(color);
        });
    });
    changeNavbarColor(color);
    changeIconColor(color);
    chosenColor = color;
    localStorage.setItem('chosenColor', color);
}

function changeMode() {
    lightDarkMode = lightDarkMode == 'light' ? 'dark' : 'light';
    lightMode.style.display = lightDarkMode === "light" ? "inline-block" : "none";
    darkMode.style.display = lightDarkMode === "dark" ? "inline-block" : "none";
    DOMElements.forEach((element) => {
        document.getElementById(element).classList.toggle('light');
        document.getElementById(element).classList.toggle('dark');
    });
    DOMCollections.forEach((name) => {
        document.querySelectorAll(name).forEach((element) => {
            element.classList.toggle('light');
            element.classList.toggle('dark');
        });
    });
    changeNavbarColor(chosenColor);
    changeIconColor(chosenColor);
    localStorage.setItem('lightDarkMode', lightDarkMode);
};

const copyText = document.getElementById('contact-text-copy');
function copyEmail() {
    const email = 'javiermezadev@gmail.com';
    navigator.clipboard.writeText(email);
    if (navigator.language == 'es') {
        copyText.innerHTML = 'Copiado';
    } else {
        copyText.innerHTML = 'Copied';
    }
}

function changeLanguage() {
    englishText = document.querySelectorAll('.english');
    spanishText = document.querySelectorAll('.spanish');
    if (navigator.language == 'es') {
        englishText.forEach(element => {
            element.style.display = 'none';
        })
        spanishText.forEach(element => {
            element.style.display = 'block';
        })
    } else {
        spanishText.forEach(element => {
            element.style.display = 'none';
        })
        englishText.forEach(element => {         
            element.style.display = 'block';
        })
    }
}
changeLanguage();

/*Pendientes por avanzar
--Agregar filtro grainy al fondo.
--Agregar botón de lenguaje.
--Agregar cambio de color al botón en hover o active.
*/