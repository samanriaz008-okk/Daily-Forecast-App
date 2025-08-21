function search(display) {
  display.preventDefault();
  let city = document.querySelector("h2");
  let inputValue = document.querySelector("#search-input");
  city.innerHTML = inputValue.value;
}
let button = document.querySelector("#search-button");
button.addEventListener("click", search);
