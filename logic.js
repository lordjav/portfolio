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
let fontSizeInitials = adjustStyle("J", "font-size");
let fontSizeOtherletters = adjustStyle("avier", "font-size");
let marginTopName = adjustStyle("name", "margin-top"),
fontSizeName = adjustStyle("name", "font-size"),
lightDarkMode = 'false';
const J = document.getElementById("J"),
H = document.getElementById("header"),
M = document.getElementById("M"),
N = document.getElementById("name"),
V = document.querySelectorAll(".vanishing-letters"),
vanishingLetters = [document.getElementById("avier"), document.getElementById("eza")],
S = document.getElementById("subtitle"),
lightMode = document.getElementById("light-icon"),
darkMode = document.getElementById("dark-icon"),
sp1Height = adjustStyle("space1", "height"),
projectsNavbar = document.getElementById("Projects-navbar"),
experienceNavbar = document.getElementById("Experience-navbar"),
aboutMeNavbar = document.getElementById("Aboutme-navbar"),
contactNavbar = document.getElementById("Contact-navbar");
const initials = [J, M],
colorBlue = ["rgb(182, 222, 242)", "rgb(90, 170, 210)", "rgb(199, 199, 26)", "rgb(0, 56, 82)", "rgb(2, 22, 32)"],
// colorBlueHex = ["#B6DEF2", "#5AAAD2", "#C7C71A", "#003852", "#021620"];
colorGreen = ["rgb(182, 242, 222)", "rgb(90, 210, 170)", "rgb(222, 36, 76)", "rgb(0, 82, 56)", "rgb(2, 32, 22)"],
// colorGreenHex = ["#B6F2DE", "#5AD2AA", "#DE244C", "#005238", "#022016"];
colorRed = ["rgb(242, 222, 222)", "rgb(210, 110, 110)", "rgb(26, 199, 199)", "rgb(122, 0, 0)", "rgb(64, 11, 11)"];
// colorRedHex = ["#F2DEDE", "#D26E6E", "#1AC7C7", "#7A0000", "#400B0B"];
var choosedColor = colorBlue;

var flag = false;

window.addEventListener('resize', function() {
    document.getElementById("section-name").style.width = adjustStyle("header", "width") + "px";    
});

window.addEventListener('scroll', function() {
    const scroller = document.documentElement.scrollTop;
    document.getElementById("scrollmeter").innerHTML = scroller.toFixed();

    //Reduce initial's font size on scroll        
    initials.forEach((letter) => {
        letter.style.fontSize = (fontSizeInitials - ((fontSizeInitials - 60) / 500 * scroller)).toFixed() + "px";        
        if (scroller > 500) {letter.style.fontSize = "60px";}
    })
        
    //Reduce font size of letters: "avier" and "eza" on scroll    
    vanishingLetters.forEach((element) => {        
        element.style.fontSize = (fontSizeOtherletters - ((((scroller / 38)**2) * fontSizeOtherletters / 176))).toFixed() + "px";
        if (scroller > 500) {element.style.fontSize = "0";}
    })
    
    //Reduce name's margin on scroll
    document.getElementById("section-name").style.marginTop = (marginTopName * (1 - scroller / 500)).toFixed() + "px";
    document.getElementById("section-name").style.marginBottom = (marginTopName * (1 - scroller / 500)).toFixed() + "px";
    if (scroller > 500) {document.getElementById("section-name").style.margin = "0";}
    
    //Reduce name's line-height on scroll
    N.style.lineHeight = (138 - (scroller / 6.2)).toFixed() + "%";
    if (scroller > 500) {N.style.lineHeight = "58%";}

    //Reduce section-name's width on scroll
    widthName = adjustStyle("header", "width");
    document.getElementById("section-name").style.width = (widthName * (1 - ((scroller / 521)**2))).toFixed() + "px";
    if (scroller > 500) {document.getElementById("section-name").style.width = "140px";}
    
    //Subtitle and letters: "avier" and "eza" fade out on scroll
    V.forEach((element) => {
        element.style.opacity = (1 - (scroller / 300)).toFixed(2);        
    })
        
    //Delete subtitle from header on scroll
    if (scroller >= 500) {
        S.innerHTML = "";        
    } else {
        S.innerHTML = "Software development";
    }

    //Change aspect of header into navbar
    if (scroller > 500) {
        var choosedNavbarColor;   
        switch (choosedColor) {
            case colorBlue:
                choosedNavbarColor = lightDarkMode ? "rgb(90, 170, 210, 0.6)" : "rgba(0, 56, 82, 0.6)";                
                break;
            
            case colorGreen:
                choosedNavbarColor = lightDarkMode ? "rgb(90, 210, 170, 0.6)" : "rgba(0, 82, 56, 0.6)";
                break;
            
            case colorRed:
                choosedNavbarColor = lightDarkMode ? "rgb(210, 110, 110, 0.6)" : "rgba(122, 0, 0, 0.6)";
                break;
        }
        H.style.backgroundColor = choosedNavbarColor;
        H.style.boxShadow = "0 10px 50px #001216";   
        H.style.backdropFilter = "blur(10px)";
        H.style.justifyContent = "start";
    } else {
        H.style.backgroundColor = "initial";
        H.style.boxShadow = "initial";
        H.style.backdropFilter = "initial";
        H.style.justifyContent = "center";
    }

    //Reduce <space1> on scroll
    document.getElementById("space1").style.height = (sp1Height * (1 - scroller / 500)).toFixed() + "px";
    if (scroller > 500) {document.getElementById("space1").style.height = "0";}    

    if (scroller > 1020) {
        projectsNavbar.innerHTML = "Projects";
        projectsNavbar.style.margin = "10px 0";
        projectsNavbar.style.opacity = "1";
        H.style.flexDirection = "row";        
    } else {
        projectsNavbar.innerHTML = "";
        projectsNavbar.style.margin = "0";
        projectsNavbar.style.opacity = "0";
        H.style.flexDirection = "column";
    }

    if (scroller > 1490) {
        experienceNavbar.innerHTML = "Experience";
        experienceNavbar.style.margin = "10px 0";
        experienceNavbar.style.opacity = "1";
    } else {
        experienceNavbar.innerHTML = "";
        experienceNavbar.style.margin = "0";
        experienceNavbar.style.opacity = "0";
    }

    if (scroller > 1960) {
        aboutMeNavbar.innerHTML = "About me";
        aboutMeNavbar.style.margin = "10px 0";
        aboutMeNavbar.style.opacity = "1";
    } else {
        aboutMeNavbar.innerHTML = "";
        aboutMeNavbar.style.margin = "0";
        aboutMeNavbar.style.opacity = "0";
    }

    if (scroller > 2430) {
        contactNavbar.innerHTML = "Contact";
        contactNavbar.style.margin = "10px 0";
        contactNavbar.style.opacity = "1";
    } else {
        contactNavbar.innerHTML = "";
        contactNavbar.style.margin = "0";
        contactNavbar.style.opacity = "0";
    }

    console.log(getComputedStyle(document.getElementById("header")).getPropertyValue("justify-content"));
});

//Switch dark/light mode
function changeMode() {    
    lightDarkMode = !lightDarkMode;
    lightMode.style.display = lightDarkMode ? "none" : "inline-block";
    darkMode.style.display = lightDarkMode ? "inline-block" : "none";
    document.getElementById("body").style.backgroundColor = lightDarkMode ? choosedColor[0] : choosedColor[4];
    N.style.color = lightDarkMode ? choosedColor[3] : choosedColor[1];
    S.style.color = lightDarkMode ? choosedColor[4] : choosedColor[0];    
    document.querySelectorAll("p").forEach((element) => {
        element.style.color = lightDarkMode ? choosedColor[4] : choosedColor[0];
    })
    document.getElementById("light-icon-path").style.stroke = lightDarkMode ? choosedColor[3] : choosedColor[1];    
    document.getElementById("dark-icon-path").style.stroke = lightDarkMode ? choosedColor[3] : choosedColor[1];
    document.getElementById("light-icon-path").style.fill = lightDarkMode ? choosedColor[3] : choosedColor[1];
    document.getElementById("color-icon-path").style.fill = lightDarkMode ? choosedColor[3] : choosedColor[1];
}

//Change theme
function changeTheme (colorArray, lightDarkMode) {
    choosedColor = colorArray;
    document.getElementById("body").style.backgroundColor = lightDarkMode ? colorArray[0] : colorArray[4];
    N.style.color = lightDarkMode ? colorArray[3] : colorArray[1];
    S.style.color = lightDarkMode ? colorArray[4] : colorArray[0];    
    document.querySelectorAll("p").forEach((element) => {
        element.style.color = lightDarkMode ? colorArray[4] : colorArray[0];
    })
    document.querySelectorAll("h3").forEach((element) => {
        element.style.color = colorArray[2];
    })
    document.getElementById("light-icon-path").style.stroke = lightDarkMode ? choosedColor[3] : choosedColor[1];    
    document.getElementById("dark-icon-path").style.stroke = lightDarkMode ? choosedColor[3] : choosedColor[1];
    document.getElementById("light-icon-path").style.fill = lightDarkMode ? choosedColor[3] : choosedColor[1];
    document.getElementById("color-icon-path").style.fill = lightDarkMode ? choosedColor[3] : choosedColor[1];    
}

N.addEventListener('mouseenter', () => {
    //N.style.textShadow = "0 15px 40px #5AAAD2";
    switch (choosedColor) {
    case colorBlue:
        N.style.textShadow = lightDarkMode ? "0 15px 40px #003852" : "0 15px 40px #5AAAD2";
        break;
    
    case colorGreen:
        N.style.textShadow = lightDarkMode ? "0 0px 50px #005238" : "0 0px 50px #5AD2AA";
        break;
    
    case colorRed:
        N.style.textShadow = lightDarkMode ? "0 15px 40px #7A0000" : "0 15px 40px #D26E6E";
        break;
    
    default:
        N.style.textShadow = "0 15px 40px #595959";
}
})
N.addEventListener('mouseleave', () => {
    N.style.textShadow = "none";
})
console.log();

/*Pendientes por avanzar
--Agregar hover a los elementos.
--Arreglar el menú.
--Agregar filtro al fondo.
--Agregar animación con el puntero.
--Arreglar subtitulos h3 que no coinciden con el scroll en ventanas pequeñas.
--Agregar más colores a la lista de temas.
--
*/