function onPointerOver(): void {
  
  const crosshair = document.getElementById("crosshair");
  if (crosshair) {
    crosshair.style.backgroundColor = "#ffffffd8";
    crosshair.style.width = "25px";
    crosshair.style.height = "25px";
    // crosshair.style.content = text;
  }
}

function onPointerOut(): void {
  const crosshair = document.getElementById("crosshair");
  if (crosshair) {
    crosshair.style.backgroundColor = "transparent";
    crosshair.style.width = "15px";
    crosshair.style.height = "15px";
    // crosshair.style.content = "";
  }
}

export { onPointerOver, onPointerOut }