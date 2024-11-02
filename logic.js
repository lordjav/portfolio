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
sp1Height = adjustStyle("space1", "height"),
projectsNavbar = document.getElementById("Projects-navbar"),
experienceNavbar = document.getElementById("Experience-navbar"),
aboutMeNavbar = document.getElementById("Aboutme-navbar"),
contactNavbar = document.getElementById("Contact-navbar"),
initials = [J, M],
colorRed = ["rgb(242, 222, 222)", "rgb(210, 110, 110)", "rgb(26, 199, 199)", "rgb(122, 0, 0)", "rgb(64, 11, 11)"],
// colorRedHex = ["#F2DEDE", "#D26E6E", "#1AC7C7", "#7A0000", "#400B0B"];
colorGreen = ["rgb(182, 242, 222)", "rgb(90, 210, 170)", "rgb(222, 36, 76)", "rgb(0, 82, 56)", "rgb(2, 32, 22)"],
// colorGreenHex = ["#B6F2DE", "#5AD2AA", "#DE244C", "#005238", "#022016"];
colorBlue = ["rgb(182, 222, 242)", "rgb(90, 170, 210)", "rgb(199, 199, 26)", "rgb(0, 56, 82)", "rgb(2, 22, 32)"];
// colorBlueHex = ["#B6DEF2", "#5AAAD2", "#C7C71A", "#003852", "#021620"];
const colorArray = {'red': colorRed, 'green': colorGreen, 'blue': colorBlue};
//console.log(localStorage.getItem('choosedColor'));
var choosedColor;
if (localStorage.getItem('choosedColor') != null) {
    choosedColor = localStorage.getItem('choosedColor');
} else {
    choosedColor = 'blue';
}

var lightDarkMode;
if (localStorage.getItem('lightDarkMode') == 'true') {
        lightDarkMode = true;
} else {
    lightDarkMode = false;
}

window.addEventListener('resize', function() {
    if (this.document.documentElement.scrollTop < 500) {
        nameContainer.style.width = adjustStyle("header", "width") + "px";
    }
});

window.addEventListener('scroll', function() {
    const scroller = document.documentElement.scrollTop;
    document.getElementById("scrollmeter").innerHTML = scroller.toFixed();
  
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
    N.style.lineHeight = (138 - (scroller / 6.2)).toFixed() + "%";
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
        S.innerHTML = ""; //Delete subtitle from header
        changeNavbarColor(choosedColor); //Change navbar color
        document.getElementById("space1").style.height = "0"; //Delete <space1>
        H.style.flexDirection = "row"; //Change aspect of header into navbar
        projectsNavbar.innerHTML = "Projects"; // Show 'Projects' in navbar
        experienceNavbar.innerHTML = "Experience"; // Show 'Experience' in navbar
        aboutMeNavbar.innerHTML = "About me"; // Show 'About me' in navbar
        contactNavbar.innerHTML = "Contact"; // Show 'Contact' in navbar
        nameContainer.style.width = "140px"; //Fix name-container width 
        N.style.lineHeight = "58%"; //Fix name's line-height
        nameContainer.style.margin = "0"; //Fix name's margin
    } else {
        S.innerHTML = "Software development";
        H.style.flexDirection = "column";
        projectsNavbar.innerHTML = "";
        experienceNavbar.innerHTML = "";
        aboutMeNavbar.innerHTML = "";
        contactNavbar.innerHTML = "";
        H.style.backgroundColor = "initial";
        H.style.boxShadow = "initial";
        H.style.backdropFilter = "initial";
    }
});

//function for changing navbar color
function changeNavbarColor(choosedColor) {
    if (document.documentElement.scrollTop > 500) {
        var choosedNavbarColor;
        switch (choosedColor) {
            case 'blue':
                choosedNavbarColor = lightDarkMode ? "rgb(90, 170, 210, 0.6)" : "rgba(0, 56, 82, 0.6)";                
                break;
            
            case 'green':
                choosedNavbarColor = lightDarkMode ? "rgb(90, 210, 170, 0.6)" : "rgba(0, 82, 56, 0.6)";
                break;
            
            case 'red':
                choosedNavbarColor = lightDarkMode ? "rgb(210, 110, 110, 0.6)" : "rgba(122, 0, 0, 0.6)";
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

//Switch dark/light mode
function changeIconColor() {
    icons = ['light-icon-path', 'dark-icon-path', 'color-icon-path'];

    for (let i = 0; i < icons.length; i++) {
        document.getElementById(icons[i]).style.stroke = lightDarkMode ? colorArray[choosedColor][3] : colorArray[choosedColor][1];
        document.getElementById(icons[i]).style.fill = lightDarkMode ? colorArray[choosedColor][3] : colorArray[choosedColor][1];
    }
}

function changeMode() {
    lightDarkMode = !lightDarkMode;
    localStorage.setItem('lightDarkMode', lightDarkMode);
    lightMode.style.display = lightDarkMode ? "none" : "inline-block";
    darkMode.style.display = lightDarkMode ? "inline-block" : "none";
    document.getElementById("body").style.backgroundColor = lightDarkMode ? colorArray[choosedColor][0] : colorArray[choosedColor][4];
    N.style.color = lightDarkMode ? colorArray[choosedColor][3] : colorArray[choosedColor][1];
    S.style.color = lightDarkMode ? colorArray[choosedColor][4] : colorArray[choosedColor][0]; 
    changeNavbarColor(choosedColor);
    document.querySelectorAll("p").forEach((element) => {
        element.style.color = lightDarkMode ? colorArray[choosedColor][4] : colorArray[choosedColor][0];
    })
    changeIconColor();    
}

//Change theme
function changeTheme (color) {
    localStorage.setItem('choosedColor', color);
    choosedColor = color;
    changeNavbarColor(color);
    document.getElementById("body").style.backgroundColor = lightDarkMode ? colorArray[color][0] : colorArray[color][4];
    N.style.color = lightDarkMode ? colorArray[color][3] : colorArray[color][1];
    S.style.color = lightDarkMode ? colorArray[color][4] : colorArray[color][0];
    document.querySelectorAll("p").forEach((element) => {
        element.style.color = lightDarkMode ? colorArray[color][4] : colorArray[color][0];
    })
    document.querySelectorAll("h3").forEach((element) => {
        element.style.color = colorArray[color][2];
    })
    changeIconColor();
}

changeTheme(choosedColor);

N.addEventListener('mouseenter', () => {
    //N.style.textShadow = "0 15px 40px #5AAAD2";
    switch (choosedColor) {
    case 'blue':
        N.style.textShadow = lightDarkMode ? "0 15px 40px #003852" : "0 15px 40px #5AAAD2";
        break;
    
    case 'green':
        N.style.textShadow = lightDarkMode ? "0 0px 50px #005238" : "0 0px 50px #5AD2AA";
        break;
    
    case 'red':
        N.style.textShadow = lightDarkMode ? "0 15px 40px #7A0000" : "0 15px 40px #D26E6E";
        break;
    
    default:
        N.style.textShadow = "0 15px 40px #595959";
}
})
N.addEventListener('mouseleave', () => {
    N.style.textShadow = "none";
})

document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('body').style.visibility = 'visible'; 
});

/*Pendientes por avanzar
--Agregar hover a los elementos.
--Arreglar el menú.
--Agregar filtro al fondo.
--Agregar animación con el puntero.
--Arreglar subtitulos h3 que no coinciden con el scroll en ventanas pequeñas.
--Agregar más colores a la lista de temas.
--
*/