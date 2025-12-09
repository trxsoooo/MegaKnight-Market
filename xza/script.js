// ===== ДАННЫЕ ТОВАРОВ =====
const products = [
  {
    id: 1,
    title: "Смартфон KnightPhone X15 128GB",
    brand: "KnightPhone",
    category: "smartphone",
    price: 69990,
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Смартфон KnightPhone Lite 64GB",
    brand: "KnightPhone",
    category: "smartphone",
    price: 34990,
    rating: 4.3,
    featured: false,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Ноутбук MegaTech 15 Gaming",
    brand: "MegaTech",
    category: "laptop",
    price: 129990,
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Ноутбук MegaTech 14 Ultra",
    brand: "MegaTech",
    category: "laptop",
    price: 99990,
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Наушники NeuroGear AirPods Maxx",
    brand: "NeuroGear",
    category: "audio",
    price: 32990,
    rating: 4.6,
    featured: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Игровая консоль KnightPlay 5",
    brand: "MegaTech",
    category: "gaming",
    price: 69990,
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=300&fit=crop"
  },
  {
    id: 7,
    title: "Гарнитура Knight Gaming Pro",
    brand: "NeuroGear",
    category: "gaming",
    price: 12990,
    rating: 4.5,
    featured: false,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop"
  },
  {
    id: 8,
    title: "Колонка Knight Smart Speaker",
    brand: "KnightPhone",
    category: "audio",
    price: 9990,
    rating: 4.2,
    featured: false,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop"
  },
  {
    id: 9,
    title: "VR Шлем NeuroVision X1",
    brand: "NeuroGear",
    category: "vr",
    price: 45990,
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop"
  },
  {
    id: 10,
    title: "Умные часы KnightWatch Pro",
    brand: "KnightPhone",
    category: "wearable",
    price: 24990,
    rating: 4.4,
    featured: false,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop"
  }
];

// ===== СОСТОЯНИЕ =====
let filteredProducts = [...products];
let visibleProducts = 8;
const cart = new Map(); // key: product.id, value: { product, qty }

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
const formatPrice = (value) =>
  new Intl.NumberFormat("ru-RU", { 
    style: "currency", 
    currency: "RUB", 
    maximumFractionDigits: 0 
  }).format(value);

function renderProducts() {
  const catalogGrid = document.getElementById("catalog-grid");
  const featuredGrid = document.getElementById("featured-grid");
  const countEl = document.getElementById("catalog-count");

  catalogGrid.innerHTML = "";
  featuredGrid.innerHTML = "";

  // Показываем только часть товаров для ленивой загрузки
  const productsToShow = filteredProducts.slice(0, visibleProducts);

  productsToShow.forEach((product) => {
    const card = createProductCard(product);
    catalogGrid.appendChild(card);

    if (product.featured) {
      const cardFeatured = createProductCard(product);
      featuredGrid.appendChild(cardFeatured);
    }
  });

  countEl.textContent = `Найдено товаров: ${filteredProducts.length}`;
  
  // Показываем/скрываем кнопку "Загрузить еще"
  const loadMoreBtn = document.getElementById("load-more");
  if (visibleProducts >= filteredProducts.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'flex';
  }
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = product.id;
  card.dataset.brand = product.brand;
  card.dataset.category = product.category;
  card.dataset.price = product.price;
  card.dataset.rating = product.rating;

  card.innerHTML = `
    <div class="product-card__image">
      <img src="${product.image}" alt="${product.title}" class="product-card__img" loading="lazy" />
    </div>
    <h3 class="product-card__title">${product.title}</h3>
    <div class="product-card__meta">
      <div class="product-card__price">${formatPrice(product.price)}</div>
      <div class="product-card__rating">
        <span>★</span>
        <span>${product.rating.toFixed(1)}</span>
      </div>
    </div>
    <div class="product-card__footer">
      <span class="product-card__brand">${product.brand}</span>
      <button class="btn btn--primary btn--small product-card__btn" type="button" aria-label="Добавить ${product.title} в корзину">
        <i class="fas fa-shopping-bag"></i> В корзину
      </button>
    </div>
  `;

  const btn = card.querySelector(".product-card__btn");
  btn.addEventListener("click", () => addToCart(product.id));
  
  // Анимация при наведении
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
  
  return card;
}

// ===== РАБОТА С ФИЛЬТРАМИ =====
function applyFilters() {
  const priceMin = Number(document.getElementById("price-min").value || 0);
  const priceMax = Number(document.getElementById("price-max").value || 9999999);
  const ratingMin = Number(document.getElementById("rating-min").value || 0);

  const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
  const activeBrands = Array.from(brandCheckboxes)
    .filter((c) => c.checked)
    .map((c) => c.value);

  filteredProducts = products.filter((p) => {
    const byBrand = activeBrands.length ? activeBrands.includes(p.brand) : true;
    const byPrice = p.price >= priceMin && p.price <= priceMax;
    const byRating = p.rating >= ratingMin;
    return byBrand && byPrice && byRating;
  });

  // Применяем сортировку
  applySorting();
  
  visibleProducts = 8;
  renderProducts();
}

function resetFilters() {
  document.getElementById("price-min").value = 0;
  document.getElementById("price-max").value = 200000;
  document.getElementById("rating-min").value = 0;
  
  // Сбрасываем звезды
  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector('.star-btn[data-rating="4.5"]').classList.add('active');

  document.querySelectorAll('input[name="brand"]').forEach((c) => (c.checked = true));

  filteredProducts = [...products];
  visibleProducts = 8;
  applySorting();
  renderProducts();
}

function applySorting() {
  const sortSelect = document.getElementById("sort-select");
  const sortValue = sortSelect.value;
  
  switch(sortValue) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Сбрасываем к оригинальному порядку
      const originalOrder = products.filter(p => 
        filteredProducts.some(fp => fp.id === p.id)
      );
      filteredProducts = originalOrder;
  }
}

// ===== ФИЛЬТР ПО КАТЕГОРИЯМ =====
function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll(".category-card");
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      filteredProducts = products.filter((p) => p.category === category);
      visibleProducts = 8;
      applySorting();
      renderProducts();
      
      // Подсветка активной категории
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ===== КОРЗИНА =====
const cartCountEl = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  if (cart.has(productId)) {
    cart.get(productId).qty += 1;
  } else {
    cart.set(productId, { product, qty: 1 });
  }

  animateCart();
  updateCartUI();
  showNotification(`${product.title} добавлен в корзину!`);
}

function updateCartUI() {
  // Счетчик
  let totalQty = 0;
  let totalSum = 0;
  cart.forEach(({ product, qty }) => {
    totalQty += qty;
    totalSum += product.price * qty;
  });
  cartCountEl.textContent = totalQty;
  cartTotalEl.textContent = formatPrice(totalSum);

  // Список
  cartItemsEl.innerHTML = "";
  if (cart.size === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag fa-3x"></i>
        <p>Корзина пуста. Добавьте товары из каталога.</p>
      </div>
    `;
    return;
  }

  cart.forEach(({ product, qty }) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.dataset.id = product.id;

    itemEl.innerHTML = `
      <div>
        <div class="cart-item__title">${product.title}</div>
        <div class="cart-item__meta">
          ${formatPrice(product.price)} • ${product.brand}
        </div>
      </div>
      <div class="cart-item__controls">
        <button class="cart-item__qty-btn" data-action="dec" aria-label="Уменьшить количество">–</button>
        <span class="cart-item__qty">${qty}</span>
        <button class="cart-item__qty-btn" data-action="inc" aria-label="Увеличить количество">+</button>
        <span class="cart-item__remove" data-action="remove" role="button" tabindex="0">убрать</span>
      </div>
    `;

    itemEl.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      if (action === "inc") {
        cart.get(product.id).qty += 1;
      } else if (action === "dec") {
        cart.get(product.id).qty -= 1;
        if (cart.get(product.id).qty <= 0) {
          cart.delete(product.id);
        }
      } else if (action === "remove") {
        cart.delete(product.id);
      }
      updateCartUI();
    });

    cartItemsEl.appendChild(itemEl);
  });
}

function animateCart() {
  cartCountEl.classList.add("cart-counter--pulse");
  setTimeout(() => cartCountEl.classList.remove("cart-counter--pulse"), 300);
}

function showNotification(message) {
  // Создаем уведомление
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  // Стили для уведомления
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(10, 10, 26, 0.95);
    border: 1px solid var(--border-color);
    border-left: 5px solid var(--success);
    color: white;
    padding: 15px 20px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: var(--shadow-glow);
    z-index: 10000;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
    animation-fill-mode: forwards;
  `;
  
  // Добавляем стили для анимации
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Удаляем уведомление через 3 секунды
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
    document.head.removeChild(style);
  }, 3000);
}

// ===== МОДАЛЬНОЕ ОКНО КОРЗИНЫ =====
const cartButton = document.getElementById("cart-button");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartClose = document.getElementById("cart-close");

function openCart() {
  cartModal.classList.add("cart-modal--open");
  cartModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartModal.classList.remove("cart-modal--open");
  cartModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = '';
}

cartButton.addEventListener("click", () => {
  openCart();
});

cartBackdrop.addEventListener("click", closeCart);
cartClose.addEventListener("click", closeCart);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
  }
});

// ===== ГАМБУРГЕР-МЕНЮ =====
const burgerButton = document.getElementById("burger-button");
const nav = document.getElementById("main-nav");

burgerButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("nav--open");
  burgerButton.setAttribute("aria-expanded", String(isOpen));
});

// Закрываем меню при клике вне его
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burgerButton.contains(e.target) && nav.classList.contains('nav--open')) {
    nav.classList.remove('nav--open');
    burgerButton.setAttribute('aria-expanded', 'false');
  }
});

// ===== ВАЛИДАЦИЯ ФОРМ =====
// Поиск
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchError = document.getElementById("search-error");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchInput.value.trim();
  if (value.length < 2) {
    searchError.textContent = "Минимум 2 символа для поиска.";
    searchInput.focus();
    return;
  }
  searchError.textContent = "";
  // Фильтрация по названию и описанию
  filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(value.toLowerCase()) ||
    p.brand.toLowerCase().includes(value.toLowerCase())
  );
  visibleProducts = 8;
  applySorting();
  renderProducts();
});

// Подписка
const subscribeForm = document.getElementById("subscribe-form");
const subscribeEmail = document.getElementById("subscribe-email");
const subscribeError = document.getElementById("subscribe-error");

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = subscribeEmail.value.trim();

  if (!value || !value.includes("@") || !value.includes(".")) {
    subscribeError.textContent = "Введите корректный email.";
    subscribeError.style.color = "var(--error)";
    return;
  }
  
  subscribeError.textContent = "Готово! Вы подписаны на акции.";
  subscribeError.style.color = "var(--success)";
  subscribeEmail.value = "";
  
  // Показываем уведомление
  showNotification("Вы успешно подписались на рассылку!");
});

// Фильтры
const filtersForm = document.getElementById("filters-form");
const resetFiltersBtn = document.getElementById("reset-filters");

filtersForm.addEventListener("submit", (e) => {
  e.preventDefault();
  applyFilters();
});

resetFiltersBtn.addEventListener("click", () => {
  resetFilters();
});

// Сортировка
const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", () => {
  applySorting();
  renderProducts();
});

// Кнопка "Загрузить еще"
const loadMoreBtn = document.getElementById("load-more");
loadMoreBtn.addEventListener("click", () => {
  visibleProducts += 4;
  renderProducts();
  
  // Плавная прокрутка к новым товарам
  const catalogSection = document.getElementById('catalog');
  catalogSection.scrollIntoView({ behavior: 'smooth' });
});

// Кнопка "Оформить заказ"
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) {
    alert("Корзина пуста. Добавьте товары.");
  } else {
    const total = Array.from(cart.values()).reduce((sum, {product, qty}) => sum + product.price * qty, 0);
    alert(`Заказ оформлен на сумму ${formatPrice(total)}! Спасибо за покупку в MegaKnight Market!`);
    cart.clear();
    updateCartUI();
    closeCart();
  }
});

// Звезды рейтинга
document.querySelectorAll('.star-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const rating = parseFloat(btn.dataset.rating);
    document.getElementById('rating-min').value = rating;
    
    // Обновляем визуал
    document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Применяем фильтры
    applyFilters();
  });
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener("DOMContentLoaded", () => {
  // Инициализация состояния
  filteredProducts = [...products];
  visibleProducts = 8;
  
  // Рендеринг
  renderProducts();
  setupCategoryFilters();
  updateCartUI();
  
  // Инициализация слайдера цен
  initPriceSlider();
  
  // Анимация элементов при загрузке
  animateOnScroll();
});

function initPriceSlider() {
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  const rangeMin = document.querySelector('.range-min');
  const rangeMax = document.querySelector('.range-max');
  
  function updatePriceInputs() {
    priceMin.value = rangeMin.value;
    priceMax.value = rangeMax.value;
  }
  
  rangeMin.addEventListener('input', updatePriceInputs);
  rangeMax.addEventListener('input', updatePriceInputs);
  
  priceMin.addEventListener('input', () => {
    rangeMin.value = priceMin.value;
  });
  
  priceMax.addEventListener('input', () => {
    rangeMax.value = priceMax.value;
  });
}

function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Наблюдаем за карточками товаров
  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
}

// Добавляем глобальные стили для анимаций
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  .product-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .product-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .banner__device {
    animation: float 6s ease-in-out infinite;
  }
`;
document.head.appendChild(animationStyles);