
document.addEventListener("DOMContentLoaded", function () {
    runProgram();
});

let selected;
let selectedID;
let color;
let active;
let objekter;
let pos;

async function runProgram() {
   //hent json
   let data = await fetch("poi.json");
   objekter = await data.json();
   //console.log(steder);

    // 1. Load svg map
    //------------------------------------------------------------------------------------	
let rawSvg = await fetch('københavn-link.svg');
    let svg = await rawSvg.text();

    document.querySelector("#map").innerHTML = svg;


    // 2. Skift farve ved klik, og vis tekst
    //-----------------------------------------------------------------------

 document.querySelector('#map #poi').addEventListener("click", function (e) {
        clicked(e);
    });
};
    //function clicked
    //--------------------------------------------------------------------
function clicked(obj){
    document.querySelector("#info").classList.remove("vis");
   
    // a. find det klikkede element
    //----------------------------------------------

    selected = obj.target;

    // find elemets placering
    pos = selected.getBoundingClientRect();    
    console.log(pos);
    document.querySelector("#info").style.top = (pos.bottom)+"px";
    document.querySelector("#info").style.left = (pos.right)+"px";
    document.querySelector("#info").style.visibility = "visible";

    // b. find det klikkede elementets ID
    //---------------------------------------------

    selectedID = selected.id;
    
    // c. find  det klikkede elements fillfarve
    //---------------------------------------------
    color = selected.getAttribute("fill");
 console.log(color);

    //d. vis info

   objekter.forEach(objekt => {
    if(selectedID == objekt.poi){
        //console.log(objekt.poi)
        document.querySelector("#info p").textContent = objekt.tekst;
       document.querySelector("#info").classList.add("vis");
    }    
    });
    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
  if(active != undefined){
    active.setAttribute("fill",color );
  }

    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------
    if (color == "#ED0C0C"){
        document.querySelector("#"+selectedID).setAttribute("fill", "#123456");
    }
    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    else{
         document.querySelector("#"+selectedID).setAttribute("fill", "#ED0C0C");
         document.querySelector("#info").style.visibility = "hidden";
    }
    //--------------------------------------------------------------------------
};


