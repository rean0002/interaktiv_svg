document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active;
  let activeBox;

  // 1. Load svg map
  //------------------------------------------------------------------------------------
  let mySvg = await fetch("kierkegaard.svg");
  let svg = await mySvg.text();
  document.querySelector("#map").innerHTML = svg;

  // 2. Find infobokse og skjul dem
  //------------------------------------------------------------------------------------
  const infobokse = [document.querySelector("#map #info-1"), document.querySelector("#map #info-2"), document.querySelector("#map #info-3"), document.querySelector("#map #info-4"), document.querySelector("#map #info-5")];
  infobokse.forEach((box) => (box.style.visibility = "hidden"));

  // 3. Klikhåndtering
  //------------------------------------------------------------------------------------
  document.querySelector("#map #points").addEventListener("click", function (evt) {
    clicked(evt);
  });

  // 4. Klik-funktion med toggle
  //------------------------------------------------------------------------------------
  function clicked(obj) {
    selected = obj.target;
    selectedID = selected.getAttribute("id");
    color = selected.getAttribute("fill");

    console.log("Klikket på:", selectedID);

    // Hvis man klikker på det samme punkt igen → skjul infoboks og nulstil
    if (active === selected) {
      selected.setAttribute("fill", "#37934a"); // Skift evt. til din standardfarve
      if (activeBox) activeBox.style.visibility = "hidden";
      active = null;
      activeBox = null;
      return;
    }

    // Skjul tidligere infoboks
    if (activeBox) {
      activeBox.style.visibility = "hidden";
    }

    // Nulstil tidligere valgt punkt
    if (active) {
      active.setAttribute("fill", "#000"); // Skift evt. til din standardfarve
    }

    // Find og vis ny infoboks
    const index = selectedID.replace("punkt", "info-");
    const box = document.querySelector(`#map #${index}`);
    if (box) {
      box.style.visibility = "visible";
      activeBox = box;
    }

    // Marker nyt punkt
    selected.setAttribute("fill", "#123456");
    active = selected;
  }
}
