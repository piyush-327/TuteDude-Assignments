let cart = [];

function toggleItem(name, price, button) {
  let index = cart.findIndex((item) => item.name === name);
  if (index === -1) {
    cart.push({ name, price });
    button.innerHTML = 'Remove Item <i class="fa-solid fa-circle-minus"></i>';
    button.style.color = "red";
  } else {
    cart.splice(index, 1);
    button.innerHTML = 'Add Item <i class="fa-solid fa-circle-plus"></i>';
    button.style.color = "black";
  }
  updateCart();
}
function updateCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const emptyMessage = document.querySelector(".center-text");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "";
    emptyMessage.style.display = "flex";
  } else {
    emptyMessage.style.display = "none";
    cartItemsDiv.innerHTML = "";

        cart.forEach((item, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="cart-item">
              <span>${index + 1}</span>
              <span>${item.name}</span>
              <span>₹${item.price}</span>
            </div>
          `;
          li.style.listStyle = 'none';
          cartItemsDiv.appendChild(li);
        });
      }
      updateTotal();
    }

function updateTotal() {
  const totalElement = document.getElementById("total");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalElement.innerText = total;
}

function sendMail(){
  let parms = {
    name : document.getElementById("form-name").value,
    email : document.getElementById("form-email").value,
    number : document.getElementById("form-number").value,
  }

  emailjs.send("service_x8fryhl","template_a8jkerb",parms).then(alert("Email Sent!!!"))
}