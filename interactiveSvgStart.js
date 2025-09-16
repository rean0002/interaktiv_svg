document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;

  // 1. Load svg map
  //------------------------------------------------------------------------------------
  let mySvg = await fetch("kierkegaard.svg");
  let svg = await mySvg.text();

  document.querySelector("#map").innerHTML = svg;

  // 2. find infobokse og skjul dem
  //------------------------------------------------------------------------------
  let info_1 = document.querySelector("#map #info-1");
  let info_2 = document.querySelector("#map #info-2");
  let info_3 = document.querySelector("#map #info-3");
  let info_4 = document.querySelector("#map #info-4");
  let info_5 = document.querySelector("#map #info-5");

  info_1.style.visibility = "hidden";
  info_2.style.visibility = "hidden";
  info_3.style.visibility = "hidden";
  info_4.style.visibility = "hidden";
  info_5.style.visibility = "hidden";

  // 3. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------
  document.querySelector("#map #points").addEventListener("click", function (evt) {
    clicked(evt);
  });

  //function clicked
  //--------------------------------------------------------------------
  function clicked(obj) {
    // a. find det klikkede element
    //----------------------------------------------
    selected = obj.target;
    // b. find det klikkede elementets ID
    //---------------------------------------------
    selectedID = selected.getAttribute("id");
    console.log(selectedID);

    // c. find  det klikkede elements fillfarve
    //---------------------------------------------
    color = selected.getAttribute("fill");

    // d. vis infobokse
    //--------------------------------------------
    if (selectedID == "punkt1") {
      info_1.style.visibility = "visible";
    }

    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------

    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------

    //skift farve på det valgte
    //-------------------------------------------------------------------------

    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
  }
}
