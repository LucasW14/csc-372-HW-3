
const favButtons = document.querySelectorAll(".fav-btn");
const favoriteSection = document.querySelector("#favorites");
const priceSection = document.querySelector("#total-price");

for (let btn of favButtons) {
  btn.addEventListener("click", toggleFavorite);
}

function toggleFavorite(event) {
  const button = event.currentTarget;

  button.classList.toggle("active");

  const card = button.closest(".dish-card");

  if (button.classList.contains("active")) {
    button.textContent = "❤️";
    addFavorite(card);
  } else {
    button.textContent = "♡";
    removeFavorite(card);
  }

  card.classList.toggle("favorited-card");
}


function addFavorite(dishCard) {

  const id = dishCard.dataset.id;

  const alreadyExists = favoriteSection.querySelector(`[data-id="${id}"]`);
  if (alreadyExists) return;

  const clone = dishCard.cloneNode(true);

  const image = clone.querySelector("img");

  if(image) image.remove();

  const caption = clone.querySelector(".caption");

  if(caption) caption.remove();

  const credit = clone.querySelector(".credit");

  if(credit) credit.remove();

  // remove the heart button from the clone (optional)
  clone.querySelector(".fav-btn").remove();

  favoriteSection.appendChild(clone);

  totalPrice();
}





function removeFavorite(dishCard) {

  const id = dishCard.dataset.id;

  const itemToRemove = favoriteSection.querySelector(`[data-id="${id}"]`);

  if (itemToRemove) {
    itemToRemove.remove();
  }

  totalPrice();
}


function totalPrice(){

  let total = 0;

  const allPrices = favoriteSection.querySelectorAll(".price");

  for (let price of allPrices) {
    total += Number(price.textContent);
  }

  priceSection.textContent = `Total: $${total}`;
}

