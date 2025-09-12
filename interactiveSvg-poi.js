document.addEventListener("DOMContentLoaded", function () {
    runProgram();
});

let selected;//det valgte punkt
let selectedID;//det valgte punkts ID
let color;// punktets fyldfarve
let active;// det aktive punkt
let steder;// json objekter

async function runProgram() {
   
    // Load json
    const json = await fetch("poi.json");
    steder = await json.json();

    console.log(steder);

    // 1. Load svg map
    //------------------------------------------------------------------------------------	
let mySvg = await fetch("københavn-link.svg");
let cph = await mySvg.text();
// vis kort

document.querySelector("#map").innerHTML = cph;


    // 3. Skift farve ved klik, og vis tekst
    //-----------------------------------------------------------------------
    document.querySelector("#poi").addEventListener("click",(e) =>{clicked(e)})

};

    //function clicked
    //--------------------------------------------------------------------
function clicked(obj){
    
    // a. find det klikkede element
    //----------------------------------------------
    selected = obj.target;
//console.log({selected});

    
    // b. find det klikkede elementets ID
    //---------------------------------------------
selectedID = selected.getAttribute("id");
//console.log(selectedID);

    
    // c. find  det klikkede elements fillfarve
    //---------------------------------------------
color = selected.getAttribute("fill");
//console.log(color);

    // d. vis infobokse
    //--------------------------------------------

steder.forEach(sted => {
    if (sted.poi == selectedID ){
        //console.log(sted.tekst);
        document.querySelector("#infotekst h2").textContent = sted.tekst;    }
    
});
  
    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
if(active != undefined){
    active.setAttribute("fill", color)
}
  
    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------
    if (color == "#ED0C0C"){
        selected.setAttribute("fill", "#123456");
    }

    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
    else{
        selected.setAttribute("fill","#ED0C0C");
         document.querySelector("#infotekst h2").textContent = "";
    }
};



