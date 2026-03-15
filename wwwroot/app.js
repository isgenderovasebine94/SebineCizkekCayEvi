const API_BASE = "https://localhost:7294/api"; 

const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE_URL = isDev ? API_BASE : "https://api.sebibecizkek.az/api";

let USE_MOCK_DATA = false; 

const productsData = [
    {
        id: 1,
        name: "New York Cheesecake",
        description: "Klassik resept, kremli texture",
        price: 8,
        image: "/images/ny-cheesecake.jpg",
        category: "cheesecake",
        badge: "Populyar"
    },
    {
        id: 2,
        name: "Cherry Cheesecake",
        description: "Təzə vişnə ilə hazırlanıb",
        price: 9,
        image: "/images/cherry-cheesecake.jpg",
        category: "cheesecake",
        badge: ""
    },
    {
        id: 3,
        name: "Cherry Chocolate Cheesecake",
        description: "Təzə vişnə və şokolad ilə hazırlanıb",
        price: 10,
        image: "/images/cherry-chocolate-cheesecake.jpg",
        category: "cheesecake",
        badge: ""
    },

    {
        id: 4,
        name: "Strawberry Cheesecake",
        description: "Təzə çiyələk ilə hazırlanıb",
        price: 9,
        image: "/images/strawberry-cheesecake.jpg",
        category: "cheesecake",
        badge: ""
    },
    {
        id: 5,
        name: "Raspberry Cheesecake",
        description: "Təzə moruq ilə hazırlanıb",
        price: 9,
        image: "/images/raspberry-cheesecake.jpg",
        category: "cheesecake",
        badge: ""
    },
    {
        id: 6,
        name: "Raffaello Cheesecake",
        description: "Kokoslu krem qatları və ağ şokolad örtüyü",
        price: 9,
        image: "/images/rafaello-cheesecake.jpg",
        category: "cheesecake",
        badge: ""
    },
    {
        id: 7,
        name: "Oreo Cheesecake",
        description: "Oreo parça ve krem ilə",
        price: 9,
        image: "/images/oreo-cheesecake.jpg",
        category: "cheesecake",
        badge: "Yeni"
    },
    {
        id: 8,
        name: "Lotus Cheesecake",
        description: "Lotus biskvit və karamel",
        price: 10,
        image: "/images/lotus-cheesecake.jpg",
        category: "cheesecake",
        badge: "Premium"
    },
    {
        id: 9,
        name: "Chocolate Dream Cake",
        description: "Zəngin şokolad qatları",
        price: 7,
        image: "/images/chocolate-cake.jpg",
        category: "tort",
        badge: ""
    },
    {
        id: 10,
        name: "Red Velvet",
        description: "Krem peynir ilə klassik",
        price: 8,
        image: "/images/red-velvet.jpg",
        category: "tort",
        badge: "Populyar"
    },
    {
        id: 11,
        name: "Caramel Cake",
        description: "Karamel sous ilə hazırlanıb",
        price: 7,
        image: "/images/caramel-cake.jpg",
        category: "tort",
        badge: ""
    },
    {
        id: 12,
        name: "Azərbaycan Qara Çay",
        description: "Yerli plantasiyalardan",
        price: 3,
        image: "/images/black-tea.jpg",
        category: "çay",
        badge: ""
    },
    {
        id: 13,
        name: "Earl Grey",
        description: "Bergamot aromalı klassik",
        price: 4,
        image: "/images/earl-grey.jpg",
        category: "çay",
        badge: ""
    },
    {
        id: 14,
        name: "Yaşıl Çay",
        description: "Antioksidant zəngin seçim",
        price: 4,
        image: "/images/green-tea.jpg",
        category: "çay",
        badge: ""
    },
    {
        id: 15,
        name: "Meyvəli Çay",
        description: "Mövsümi meyvələrlə blend",
        price: 5,
        image: "/images/fruit-tea.jpg",
        category: "çay",
        badge: "Yeni"
    }
];


const header = document.getElementById("header");
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const slider = document.getElementById("slider");
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");
const sliderDots = document.getElementById("sliderDots");
const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutClose = document.getElementById("checkoutClose");
const checkoutForm = document.getElementById("checkoutForm");
const orderSummary = document.getElementById("orderSummary");
const reservationForm = document.getElementById("reservationForm");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");


let currentSlide = 0;
let sliderInterval;
let cart = JSON.parse(localStorage.getItem("sebine_cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    initSlider();
    renderProducts("all");
    initFilters();
    updateCartUI();
    initScrollEffects();
    initGalleryLightbox();
    initReservation();
    initCheckout();
    initMobileNav();
});


function initScrollEffects() {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        
        const sections = document.querySelectorAll("section[id]");
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}


function initMobileNav() {
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            burger.classList.remove("active");
            nav.classList.remove("active");
        });
    });
}


function initSlider() {
    const slides = document.querySelectorAll(".slide");

    
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("slider-dot");
        if (i === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", "Slayd " + (i + 1));
        dot.addEventListener("click", () => goToSlide(i));
        sliderDots.appendChild(dot);
    });

    sliderPrev.addEventListener("click", () => {
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    });

    sliderNext.addEventListener("click", () => {
        goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    });

    
    startSliderInterval();

    
    slider.addEventListener("mouseenter", () => clearInterval(sliderInterval));
    slider.addEventListener("mouseleave", startSliderInterval);

    
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
            } else {
                goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
            }
        }
    }, { passive: true });
}

function goToSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slider-dot");

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function startSliderInterval() {
    sliderInterval = setInterval(() => {
        const slides = document.querySelectorAll(".slide");
        goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    }, 5000);
}

function renderProducts(filter) {
    const filtered = filter === "all"
        ? productsData
        : productsData.filter((p) => p.category === filter);

    productsGrid.innerHTML = filtered.map((product) => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price} AZN</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})" aria-label="${product.name} Səbətə əlave et">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function initFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts(btn.dataset.filter);
        });
    });
}


function addToCart(productId) {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(product.name + " Səbətə əlavə edildi!");
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("sebine_cart", JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                <p>Səbət boşdur</p>
            </div>
        `;
        cartFooter.style.display = "none";
        return;
    }

    cartFooter.style.display = "block";
    cartTotal.textContent = getCartTotal() + " AZN";

    cartItems.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} AZN</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Azalt">-</button>
                <span class="cart-item-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Artır">+</button>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Sil">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join("");
}


cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});

function closeCart() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function initCheckout() {
    checkoutBtn.addEventListener("click", () => {
        closeCart();
        openCheckout();
    });

    checkoutClose.addEventListener("click", closeCheckout);
    checkoutOverlay.addEventListener("click", closeCheckout);

    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(checkoutForm);
        const name = formData.get("customerName");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const address = formData.get("address");
        const paymentType = formData.get("paymentType");

        if (!name || !email || !phone || !address || !paymentType) {
            showToast("Zəhmət olmasa bütün sahələri doldurun!");
            return;
        }

        const orderData = {
            customerName: name,
            email: email || "noemail@test.com",
            phoneNumber: phone,
            deliveryAddress: address,
            paymentMethod: paymentType,
            totalAmount: getCartTotal(),
            orderItems: cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                unitPrice: item.price
            }))
        };

        console.log("Order Data:", orderData);

        if (USE_MOCK_DATA) {
            
            console.log("MOCK MODE - Order accepted (local)");
            cart = [];
            saveCart();
            updateCartUI();
            closeCheckout();
            showToast("✓ Sifarişiniz UĞURLA qəbul edildi! (TEST MODE)");
            checkoutForm.reset();
            return;
        }

        try {
            console.log("Sending to backend:", API_BASE);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(`${API_BASE}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log("Response:", response.status, response.statusText);

            const result = await response.json();
            console.log("Result:", result);

            if (response.ok) {
                cart = [];
                saveCart();
                updateCartUI();
                closeCheckout();
                showToast("✓ Sifarişiniz UĞURLA qəbul edildi!");
                checkoutForm.reset();
            } else {
                showToast("❌ Xəta: " + (result.message || "Sifariş göndərilərkən xəta"));
            }
        } catch (error) {
            console.error("Error:", error.message);
            if (error.name === "AbortError") {
                showToast("❌ Backend cavab vermədi. Sonra yenidən cəhd edin.");
            } else {
                showToast("❌ Bağlantı xətası. Backend-i yoxlayın.");
            }
        }
    });
}

function openCheckout() {
    orderSummary.innerHTML = `
        ${cart.map((item) => `
            <div class="order-summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${item.price * item.quantity} AZN</span>
            </div>
        `).join("")}
        <div class="order-summary-total">
            <span>Umumi:</span>
            <span>${getCartTotal()} AZN</span>
        </div>
    `;

    checkoutModal.classList.add("active");
    checkoutOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCheckout() {
    checkoutModal.classList.remove("active");
    checkoutOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

function initReservation() {
    const dateInput = document.getElementById("resDate");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    reservationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(reservationForm);
        const name = formData.get("name");
        const phone = formData.get("phone");
        const date = formData.get("date");
        const time = formData.get("time");
        const peopleCount = parseInt(formData.get("peopleCount"));

        if (!name || !phone || !date || !time) {
            showToast("Zəhmət olmasa bütün sahələri doldurun!");
            return;
        }

        const reservationData = {
            guestName: name,
            phoneNumber: phone,
            reservationDate: date,
            reservationTime: time,
            numberOfGuests: peopleCount,
            status: "Pending"
        };

        console.log("Reservation Data:", reservationData);

        if (USE_MOCK_DATA) {
            console.log("MOCK MODE - Reservation accepted (local)");
            showToast("✓ Rezervasiyanız UĞURLA qəbul edildi! (TEST MODE)");
            reservationForm.reset();
            return;
        }

        try {
            console.log("Sending to backend:", API_BASE);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(`${API_BASE}/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log("Response:", response.status, response.statusText);

            const result = await response.json();
            console.log("Result:", result);

            if (response.ok) {
                showToast("✓ Rezervasiyanız UĞURLA qəbul edildi!");
                reservationForm.reset();
            } else {
                showToast("❌ Xəta: " + (result.message || "Rezervasiya göndərilərkən xəta"));
            }
        } catch (error) {
            console.error("Error:", error.message);
            if (error.name === "AbortError") {
                showToast("❌ Backend cavab vermədi. Sonra yenidən cəhd edin.");
            } else {
                showToast("❌ Bağlantı xətası. Backend-i yoxlayın.");
            }
        }
    });
}

function initGalleryLightbox() {
    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
            closeCart();
            closeCheckout();
        }
    });
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function showToast(message, duration = 5000) {
    console.log("Toast message:", message);
    toastMessage.textContent = message;
    toast.classList.add("active");
    
    if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
    }
    
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove("active");
        console.log("Toast hidden");
    }, duration);
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initVideoModal() {
    const playVideoBtn = document.getElementById("playVideoBtn");
    const videoModal = document.getElementById("videoModal");
    const videoOverlay = document.getElementById("videoOverlay");
    const videoClose = document.getElementById("videoClose");
    const videoPlayer = document.getElementById("videoPlayer");

    if (!playVideoBtn || !videoModal) return;

    playVideoBtn.addEventListener("click", () => {
        videoModal.classList.add("active");
        videoOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        if (videoPlayer) videoPlayer.play();
    });

    const closeVideoModal = () => {
        videoModal.classList.remove("active");
        videoOverlay.classList.remove("active");
        document.body.style.overflow = "";
        if (videoPlayer) videoPlayer.pause();
    };

    videoClose.addEventListener("click", closeVideoModal);
    videoOverlay.addEventListener("click", closeVideoModal);
}

document.addEventListener("DOMContentLoaded", () => {
    initVideoModal();
    document.querySelectorAll(".product-card, .gallery-item, .about-image, .about-content, .reservation-info, .reservation-form").forEach((el) => {
        el.style.opacity = "0";
        observer.observe(el);
    });
});