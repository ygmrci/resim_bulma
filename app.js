const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imageList-wrapper");

runEventListeners();
function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear() {
  searchInput.value = "";
  imageListWrapper.innerHTML = " ";
}
function search(e) {
  const value = searchInput.value.trim();
  fetch(`https://api.unsplash.com/search/collections?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID OKvMbvwhqkLf4Zh1EqbiEYr48gAu5a3I3qCjC6iMhfs",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        // console.log(image);
        addImageToUI(image.cover_photo.urls.small);
      });
    })
    .catch((err) => console.log(err));
  e.preventDefault();
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.appendChild(img);
  imageListWrapper.appendChild(div);
}
