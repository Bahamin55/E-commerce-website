// برای اینکه تایمر فقط در صفحه اول که کلاس کانت داون داره اجرا بشه
const isHomePage = document.querySelector(".home-page");
// برای اینکه فقط در صفحه پروداکت دیتیل اجرا بشه
const isProductDetailPage = document.querySelector(".product-detail");
// اجرا فقط در صفحه کارت
const isCartPage = document.querySelector(".cart");

if (isHomePage) {
  updateCountDown();
  swiper();
} else if (isProductDetailPage) {
  displayProductDetail();
} else if (isCartPage) {
  displayCart();
}

// Set the date we're counting down to
function updateCountDown() {
  // select timer element
  const day = document.getElementById("days");
  const hour = document.getElementById("hours");
  const minute = document.getElementById("minutes");
  const second = document.getElementById("seconds");

  var countDownDate = new Date("Jan 5, 2026 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    day.innerText = days;
    hour.innerText = hours;
    minute.innerText = minutes;
    second.innerText = seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

//  Initialize Swiper
function swiper() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// arrow up btn
const arrowBtn = document.getElementById("arrow-up");
arrowBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

// cart tab
const cartIcon = document.getElementById("cart-icon");
const cartTab = document.getElementById("cart-tab");

let hideTimeout;

function showCart() {
  clearTimeout(hideTimeout);
  cartTab.classList.remove("hidden");
}

function hideCart() {
  hideTimeout = setTimeout(() => {
    cartTab.classList.add("hidden");
  }, 200);
}

cartIcon.addEventListener("mouseenter", showCart);
cartIcon.addEventListener("mouseleave", hideCart);
cartTab.addEventListener("mouseenter", showCart);
cartTab.addEventListener("mouseleave", hideCart);

//  api and add to cart

const selingCards = document.getElementById("bestSelingCards");
const productsCards = document.getElementById("OurProductCards");
const listCartHtml = document.querySelector(".list-cart");
const cartIconSpan = document.getElementById("cart-icon span");

let products = [];

// fetch products from api

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("network response not ok");
    products = await response.json();
    renderProducts(selingCards, products, 4);
    renderProducts(productsCards, products, 8);
  } catch (error) {
    console.log("error fetching products", error);
  }
};

// add products data to html

const renderProducts = (targetElement, products, limit = null) => {
  targetElement.innerHTML = "";

  if (products.length > 0) {
    let finalList = [...products];

    // برای اینکه بخوایم مقدار مشخصی از پروداکت انتخاب کنیم
    if (limit !== null) {
      finalList = finalList.slice(0, limit);
    }

    finalList.forEach((product) => {
      let slideItem = document.createElement("div");
      slideItem.classList.add("relative");

      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
      <a href="../pages/product.html?id=${product.id}" class="item-box">
         <div class="bg-gray-200 rounded-md overflow-hidden flex flex-col group relative">
          <img
            src="${product.image}"
            alt="${product.title}"
            loading="lazy"
            class="p-12 hover:scale-110 transition duration-300 h-[288px]"
          />
          <button
            class="bg-black text-white py-3 text-center text-2xl absolute bottom-0 left-0 w-full opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition duration-300"
          >
            Add to cart
          </button>
        </div>
        <div class="labels w-full px-4 flex justify-end absolute top-4">
          <div class="icons">
            <div class="heart bg-white text-black rounded-full flex items-center justify-center mb-3">
              <i class="ri-heart-line text-2xl p-2"></i>
            </div>
            <div class="eye bg-white text-black rounded-full flex items-center justify-center">
              <i class="ri-eye-line text-3xl p-2"></i>
            </div>
          </div>
        </div>
     </a>
        <div class="card-footer mt-5 text-[16px] font-semibold">
          <p class="truncate">${product.title}</p>
          <div class="price flex my-3 gap-x-4">
            <p class="text-red-600">$${product.price}</p>
          </div>
          <div class="star flex gap-x-2">
            <i class="ri-star-fill text-orange-400"></i>
            <i class="ri-star-fill text-orange-400"></i>
            <i class="ri-star-fill text-orange-400"></i>
            <i class="ri-star-fill text-orange-400"></i>
            <i class="ri-star-fill text-orange-400"></i>
            <p class="text-gray-500">(${product.rating.rate})</p>
          </div>
        </div>
      `;

      slideItem.appendChild(newProduct);
      targetElement.appendChild(slideItem);

      const itemBox = newProduct.querySelector(".item-box");
      itemBox.addEventListener("click", () => {
        sessionStorage.setItem("selectedProduct", JSON.stringify(product));
      });
    });
  }
};

fetchProducts();

// productDetailPage

function displayProductDetail() {
  const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

  const titleEl = document.querySelector(".title");
  const priceEl = document.querySelector(".price");
  const descriptionEl = document.querySelector(".desc");
  const mainImageContainer = document.querySelector(".main-img");
  const thumbnailContainer = document.querySelector(".thumbnail-list");
  const buyNowBtn = document.querySelector(".buy-now");

  mainImageContainer.innerHTML = `<img src="${productData.image}" class="max-h-full max-w-full object-contain rounded"/>`;

  thumbnailContainer.innerHTML = "";
  const allThumbnails = Array(4).fill(productData.image);
  allThumbnails.forEach((thumb) => {
    const img = document.createElement("img");
    img.src = thumb;
    img.classList.add(
      "cursor-pointer",
      "w-48",
      "h-40",
      "bg-gray-100",
      "p-3",
      "rounded",
      "object-contain"
    );
    thumbnailContainer.appendChild(img);

    img.addEventListener("click", () => {
      mainImageContainer.innerHTML = `<img src="${thumb}" class="max-h-full max-w-full object-contain rounded"/>`;
    });
  });

  titleEl.innerHTML = productData.title;
  priceEl.innerHTML = `$${productData.price}`;
  descriptionEl.innerHTML = productData.description;

  buyNowBtn.addEventListener("click", () => {
    addToCart(productData);
  });
  updateCartBadge();
}

function addToCart(product) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
}

function displayCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const cartItemsContainer = document.querySelector(".cart-items");
  const subtotalEl = document.querySelector(".total-price");
  const grantotalEl = document.querySelector(".grand-total");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p> Your cart is empty. </p>";
    subtotalEl.textContent = "$0.00";
    grantotalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  cart.forEach((item, index) => {
    const itemTotal = parseFloat(item.price) * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
    <div
            class="font-poppins_Regular flex items-center px-6 my-4 border border-gray-200 rounded-md shadow"
          >
            <div class="product flex flex-[2_2_0%] items-center">
              <img
                src="${item.image}"
                class="w-[80px] h-[80px] mr-4 py-2"
              />
              <p>${item.title}</p>
            </div>
            <span class="price flex-1 text-center">$${item.price}</span>
            <div class="quantity flex-1 text-center">
              <input
                type="number"
                value="${item.quantity}"
                min="1"
                data-index="${index}"
                class="w-[50px] p-2 border border-gray-100 rounded text-center"
              />
            </div>
            <span class="total-price flex-1 text-center">$${itemTotal}</span>
            <button data-index="${index}" class="remove flex-1 text-center cursor-default">
              <i class="ri-close-line text-2xl cursor-pointer"></i>
            </button>
          </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  grantotalEl.textContent = `$${subtotal.toFixed(2)}`;

  removeCartItem();
  updateCartQuantity();
  updateCartBadge();
}

function removeCartItem() {
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", function () {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartBadge();
    });
  });
}

function updateCartQuantity() {
  document.querySelectorAll(".quantity input").forEach((input) => {
    input.addEventListener("change", function () {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart[index].quantity = parseInt(this.value);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartBadge();
    });
  });
}

function updateCartBadge() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.querySelector("#cart-icon span");

  if (badge) {
    if (cartCount > 0) {
      badge.textContent = cartCount;
      badge.style.display = "block";
    } else {
      badge.style.display = "none";
    }
  }
}
updateCartBadge();
