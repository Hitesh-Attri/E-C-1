let slider = document.getElementById("sliderValue");
let output = document.getElementById("textField");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}