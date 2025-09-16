document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active; // gemmer tidligere valgt punkt
  let activeBox; // gemmer tidligere vist infoboks

  // 1. Load svg map
  //------------------------------------------------------------------------------------
  let mySvg = await fetch("kierkegaard.svg");
  let svg = await mySvg.text();
  document.querySelector("#map").innerHTML = svg;

  // 2. find infobokse og skjul dem
  //------------------------------------------------------------------------------
  const infobokse = [document.querySelector("#map #info-1"), document.querySelector("#map #info-2"), document.querySelector("#map #info-3"), document.querySelector("#map #info-4"), document.querySelector("#map #info-5")];

  infobokse.forEach((box) => (box.style.visibility = "hidden"));

  // 3. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------
  document.querySelector("#map #points").addEventListener("click", function (evt) {
    clicked(evt);
  });

  //function clicked
  //--------------------------------------------------------------------
  function clicked(obj) {
    selected = obj.target;
    selectedID = selected.getAttribute("id");
    color = selected.getAttribute("fill");

    console.log("Klikket på:", selectedID);

    // Skjul tidligere infoboks (hvis en var aktiv)
    if (activeBox) {
      activeBox.style.visibility = "hidden";
    }

    // Nulstil tidligere valgt punkt (hvis en var aktiv)
    if (active) {
      active.setAttribute("fill", color); // reset til oprindelig farve
    }

    // Find og vis den rigtige infoboks
    const index = selectedID.replace("punkt", "info-");
    const box = document.querySelector(`#map #${index}`);
    if (box) {
      box.style.visibility = "visible";
      activeBox = box;
    }

    // Skift farve på det nye valgte punkt
    selected.setAttribute("fill", "#123456");

    // Sæt det klikkede punkt som aktivt
    active = selected;
  }
}
