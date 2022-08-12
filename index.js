import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const profilePicture = document.querySelector(".profile-picture");
const name = document.querySelectorAll(".name");
const description = document.querySelector(".description");

const imageCarousel = document.querySelector(".swiper-wrapper");

const likeButton = document.querySelector("#like");
const commentButton = document.querySelector("#comment");

const commentSection = document.querySelector("#comment-section");
const form = document.querySelector(".input");
const input = document.querySelector("#text-field");
let images = [];

/*  -- INITIALIZE SWIPER --*/
const swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  lazy: true,
});

/*  -- GETTING CHARACTER --*/

(async () => {
  let url = "https://simpsons-quotes-api.herokuapp.com/quotes";
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    profilePicture.setAttribute("src", data[0].image);
    name.forEach((name) => (name.innerHTML = `${data[0].character} `));
    description.innerHTML = data[0].quote;
  } catch (error) {
    console.error(error)
    profilePicture.setAttribute("src", "media/homer.jpg");
    name.forEach((name) => (name.innerHTML = "Homer Simpson"));
    description.innerHTML = "Gah, stupid sexy Flanders!";
  }
})();

/*  -- GETTING IMAGES --*/
(async function () {
  try {
    const resp = await fetch(
      `https://picsum.photos/v2/list?page=${generateRandom()}&limit=${generateRandom()}`
    );
    const data = await resp.json();
    images = data;
    appendImages();
  } catch (error) {
    console.error(error);
  }
})();

//generates random number between range
function generateRandom(min = 1, max = 10) {
  // find diff
  let difference = max - min;
  // generate random number
  let rand = Math.random();
  // multiply with difference
  rand = Math.floor(rand * difference);
  // add with min value
  rand = rand + min;
  return rand;
}

function appendImages() {
  images.forEach((image) => {
    addCarouselImage(image);
  });
}

const addCarouselImage = (image) => {
  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "swiper-slide");

  const img = document.createElement("img");
  img.setAttribute("src", image.download_url);
  img.setAttribute("class", "swiper-lazy");

  const div = document.createElement("div");
  div.setAttribute("class", "swiper-lazy-preloader");

  containerDiv.append(img);
  containerDiv.append(div);
  imageCarousel.append(containerDiv);
};

/*--  EVENTS --*/
imageCarousel.addEventListener("dblclick", () => like());
likeButton.addEventListener("click", () => like());

function like() {
  likeButton.dataset.liked === "true"
    ? (likeButton.dataset.liked = false)
    : (likeButton.dataset.liked = true);
}

commentButton.addEventListener("click", () => input.focus());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "" || input.value == null) return;
  addComment(input.value);
  input.value = "";
});

const addComment = (text) => {
  const span1 = document.createElement("span");
  span1.innerText = "Comment ";
  span1.setAttribute("class", "fw-semi-bold");

  const span2 = document.createElement("span");
  span2.innerText = text;

  const li = document.createElement("li");
  li.append(span1, span2);
  commentSection.append(li);
  li.scrollIntoView({ behavior: "smooth" });
};
