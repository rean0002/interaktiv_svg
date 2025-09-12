document.addEventListener("DOMContentLoaded", runProgram);

async function runProgram() {
    let selectedID;
    let active;
    let selected;
    let color;
    let infobox;

    // Hent JSON --------------------------------------------
    let jsondata = await fetch("museum.json");
    let objekter = await jsondata.json();
    console.log(objekter);
    
    // 1. Load svg map
    //------------------------------------------------------------------------------------	

    let rawSvg = await fetch('Kunstpakhuset3.svg');
    let svg = await rawSvg.text();

    document.querySelector("#map").innerHTML = svg;

    // 2. find infobokse og skjul dem
    //------------------------------------------------------------------------------
    let info_1 = document.querySelector('#map #info-1');
    let info_2 = document.querySelector('#map #info-2');
    let info_3 = document.querySelector('#map #info-3');
    let info_4 = document.querySelector('#map #info-4');

    info_1.style.visibility = "hidden";
    info_2.style.visibility = "hidden";
    info_3.style.visibility = "hidden";
    info_4.style.visibility = "hidden";


    // 3. Skift farve ved klik, og vis tekst
    //------------------------------------------------------------------------
    document.querySelector('#map #points').addEventListener("click", function (e) {
        clicked(e);
    });


    function clicked(obj) {
      document.querySelector("#info").style.visibility= "visible";
     
       // console.log("tjek");
        if (infobox != undefined) {
            infobox.style.visibility = "hidden";
            //infobox.classList.remove("vis");
        } 
        // a. find det klikkede element
        //----------------------------------------------
        selected = obj.target;
        
        // b. find det klikkede elementets ID
        //---------------------------------------------
        selectedID = selected.getAttribute("id");
        
        // c. find  det klikkede elements fillfarve
        //---------------------------------------------
        color = selected.getAttribute('fill');
 
        // d. vis infobokse
        //--------------------------------------------
        objekter.forEach(objekt=> {
        if(selectedID == objekt.sted){
          document.querySelector("#info p").textContent = objekt.tekst;
          document.querySelector("#info img").src = "/billeder/"+objekt.billede+".jpeg";
          document.querySelector("#info").addEventListener("click", function(){ 
            document.querySelector("#info").style.visibility= "hidden";
             document.querySelector("#" + selectedID).setAttribute('fill', '#b62300');
            infobox.style.visibility = "hidden";
          })
        

        if (selectedID === "punkt1") {
          info_1.style.visibility = "visible";
          infobox = info_1;
         // infobox.classList.add("vis");
          console.log(selectedID);
        }
        if (selectedID === "punkt2") {
            info_2.style.visibility = "visible";
          infobox = info_2;
         console.log(selectedID);
         // infobox.classList.add("vis");
        }
        if (selectedID === "punkt3") {
            info_3.style.visibility = "visible";
          infobox = info_3;
         console.log(selectedID);
          //infobox.classList.add("vis");
        }
        if (selectedID === "punkt4") {
          info_4.style.visibility = "visible";
          infobox = info_4;
         console.log(selectedID);
          //infobox.classList.add("vis");
        }

}
});

        // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
        //------------------------------------------------------------------------------------
        if (active != undefined) {
            active.setAttribute('fill', color);
           
        }
        //gør det klikkede til det aktive
        //-------------------------------------------------------------------------
        active = selected;

        //skift farve på det valgte
        //-------------------------------------------------------------------------
        if (color == '#b62300') {
            document.querySelector("#" + selectedID).setAttribute('fill', '#123456');

        }
        //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
        //--------------------------------------------------------------------------
        else {

            document.querySelector("#" + selectedID).setAttribute('fill', '#b62300');
            infobox.style.visibility = "hidden";
      //infobox.classList.remove("vis");
        }


    }

    // runProgram end      
} 
