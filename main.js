document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let active;
  let activeBox;

  // 1. Load SVG
  let mySvg = await fetch("kierkegaard.svg");
  let svg = await mySvg.text();
  document.querySelector("#map").innerHTML = svg;

  // 2. Gem originalfarve på hvert punkt
  const points = document.querySelectorAll("#map #points [id^='punkt']");
  points.forEach((p) => {
    const originalFill = p.getAttribute("fill");
    p.setAttribute("data-original-fill", originalFill);
  });

  // 3. Skjul infobokse
  const infobokse = [document.querySelector("#map #info-1"), document.querySelector("#map #info-2"), document.querySelector("#map #info-3"), document.querySelector("#map #info-4"), document.querySelector("#map #info-5")];
  infobokse.forEach((box) => (box.style.visibility = "hidden"));

  // 4. Klik-funktion
  document.querySelector("#map #points").addEventListener("click", function (evt) {
    clicked(evt);
  });

  function clicked(obj) {
    selected = obj.target;
    selectedID = selected.getAttribute("id");

    // Hvis man klikker på samme punkt → nulstil
    if (active === selected) {
      const originalFill = selected.getAttribute("data-original-fill");
      selected.setAttribute("fill", originalFill);
      if (activeBox) activeBox.style.visibility = "hidden";
      active = null;
      activeBox = null;
      return;
    }

    // Nulstil tidligere valgt punkt
    if (active) {
      const oldFill = active.getAttribute("data-original-fill");
      active.setAttribute("fill", oldFill);
    }

    // Skjul tidligere infoboks
    if (activeBox) {
      activeBox.style.visibility = "hidden";
    }

    // Vis ny infoboks
    const index = selectedID.replace("punkt", "info-");
    const box = document.querySelector(`#map #${index}`);
    if (box) {
      box.style.visibility = "visible";
      activeBox = box;
    }

    // Skift farve på det nye valgte punkt
    selected.setAttribute("fill", "#123456");
    active = selected;
  }
}
