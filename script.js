let cart = [];

function validateBookingForm() {
  const bookingForm = document.getElementById("booking-form");
  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const numberInput = document.getElementById("form-number");

  if (!bookingForm || !nameInput || !emailInput || !numberInput) return false;

  [nameInput, emailInput, numberInput].forEach((input) =>
    input.setCustomValidity(""),
  );

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const numberValue = numberInput.value.trim();
  let errorMessage = "";

  if (!nameValue) {
    errorMessage = "Please enter your name";
    nameInput.setCustomValidity(errorMessage);
  } else if (nameValue.length < 5) {
    errorMessage = "Name must be at least 5 characters";
    nameInput.setCustomValidity(errorMessage);
  } else if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    errorMessage = "Please enter a valid email address";
    emailInput.setCustomValidity(errorMessage);
  } else if (!numberValue || !/^\d{10}$/.test(numberValue)) {
    errorMessage = "Please enter a valid 10-digit phone number";
    numberInput.setCustomValidity(errorMessage);
  }

  if (errorMessage) {
    alert(errorMessage);
    bookingForm.reportValidity();
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateBookingForm()) {
        return;
      }

      sendMail();
    });

    ["input", "change"].forEach((eventType) => {
      bookingForm.addEventListener(eventType, () => {
        if (bookingForm.checkValidity()) {
          ["form-name", "form-email", "form-number"].forEach((id) => {
            const input = document.getElementById(id);
            if (input) input.setCustomValidity("");
          });
        }
      });
    });
  }
});

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
      li.style.listStyle = "none";
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

function sendMail() {
  if (!validateBookingForm()) {
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) bookingForm.reportValidity();
    return;
  }

  const serviceId = "service_ynyok23";
  const templateId = "template_hdv4pxz";
  const nameInput = document.getElementById("form-name").value.trim();
  const emailInput = document.getElementById("form-email").value.trim();
  const numberInput = document.getElementById("form-number").value.trim();

  const parms = {
    name: nameInput,
    email: emailInput,
    number: numberInput,
  };

  emailjs
    .send(serviceId, templateId, parms)
    .then((response) => console.log("SUCCESS:" + response.status))
    .catch((error) => console.log("ERROR:", error));
}
