const form = document.querySelector("form");
//const radius1 = document.getElementById("Radius1");
//const radius2 = document.getElementById("Radius2");
//const factor = document.getElementById("factor");
const color = document.getElementById("color");
const offset = document.getElementById("offset");
var radius1 = document.getElementById("Radius1");
var output1 = document.getElementById("Output1");
var radius2 = document.getElementById("Radius2");
var output2 = document.getElementById("Output2");
var factor = document.getElementById("factor");
var factor_value = document.getElementById("factor_value");
// Get drawing context
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var erase = document.getElementById("erase");

var download = document.getElementById("btn-download");
download.addEventListener("click", function (e) {
  var dataURL = canvas.toDataURL("image/jpg");
  download.href = dataURL;
});

output1.innerHTML = radius1.value;
output2.innerHTML = radius2.value;
factor_value.innerHTML = factor.value;

radius1.oninput = function () {
  output1.innerHTML = this.value;
};

radius2.oninput = function () {
  output2.innerHTML = this.value;
};

factor.oninput = function () {
  factor_value.innerHTML = this.value;
};

erase.onclick = function () {
  console.log("erase clicked");
  context.clearRect(0, 0, canvas.width, canvas.height);
};
form.addEventListener("submit", runEvent);

function runEvent(e) {
  var r1, r2, f, col, ofs;
  console.log(`Event Type: ${e.type}`);
  console.log(color);
  r1 = Number(radius1.value);
  r2 = Number(radius2.value);
  f = Number(factor.value);
  col = "#" + color.value;
  ofs = Number(offset.value);
  drawSpirograph(
    context,
    canvas.width / 2,
    canvas.height / 2,
    r1,
    r2,
    f,
    col,
    ofs
  );
  e.preventDefault();
}

function drawSpirograph(
  context,
  cx,
  cy,
  radius1,
  radius2,
  factor,
  color,
  offset
) {
  var x, y, theta, ratio, factor, ofs;
  ofs = (offset * Math.PI) / 180.0;
  console.log(ofs);
  ratio = radius1 / radius2 - 1;
  // Draw segments from theta = 0 to theta = 2PI
  x =
    cx +
    (radius1 - radius2) * Math.cos(0 + ofs) +
    factor * radius2 * Math.cos(0 * ratio);
  y =
    cy +
    (radius1 - radius2) * Math.sin(0 + ofs) -
    factor * radius2 * Math.sin(0 * ratio);
  context.moveTo(cx, cy);
  // Move to starting point (theta = 0)
  context.beginPath();
  for (theta = 0.01; theta <= Math.PI * radius2; theta += 0.01) {
    x =
      cx +
      (radius1 - radius2) * Math.cos(theta + ofs) +
      factor * radius2 * Math.cos(theta * ratio);
    y =
      cy +
      (radius1 - radius2) * Math.sin(theta + ofs) -
      factor * radius2 * Math.sin(theta * ratio);
    context.lineTo(x, y);
  }

  // Apply stroke
  context.strokeStyle = color;
  context.stroke();
}

// Draw spirograph
//drawSpirograph(context, canvas.width / 2, canvas.height / 2, 200, 70, 0.2);
