
const API_BASE = "https://localhost:7294/api"; 


let authToken = localStorage.getItem("adminToken") || null;

let products = [
    { id: 1, name: "New York Cheesecake", description: "Klassik resept, kremli texture", price: 8, imageUrl: "/images/ny-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 2, name: "Cherry Cheesecake", description: "Təzə vişnə ilə hazırlanıb", price: 9, imageUrl: "/images/cherry-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 3, name: "Cherry Chocolate Cheesecake", description: "Təzə vişnə və şokolad ilə hazırlanıb", price: 10, imageUrl: "/images/cherry-chocolate-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 4, name: "Strawberry Cheesecake", description: "Təzə çiyələk ilə hazırlanıb", price: 9, imageUrl: "/images/strawberry-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 5, name: "Raspberry Cheesecake", description: "Təzə moruq ilə hazırlanıb", price: 9, imageUrl: "/images/raspberry-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 6, name: "Raffaello Cheesecake", description: "Kokoslu krem qatları və ağ şokolad örtüyü", price: 9, imageUrl: "/images/rafaello-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 7, name: "Oreo Cheesecake", description: "Oreo parça ve krem ilə", price: 9, imageUrl: "/images/oreo-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 8, name: "Lotus Cheesecake", description: "Lotus biskvit və karamel", price: 10, imageUrl: "/images/lotus-cheesecake.jpg", category: "cheesecake", isActive: true },
    { id: 9, name: "Chocolate Dream Cake", description: "Zəngin şokolad qatları", price: 7, imageUrl: "/images/chocolate-cake.jpg", category: "tort", isActive: true },
    { id: 10, name: "Red Velvet", description: "Krem peynir ilə klassik", price: 8, imageUrl: "/images/red-velvet.jpg", category: "tort", isActive: true },
    { id: 11, name: "Caramel Cake", description: "Karamel sous ilə hazırlanıb", price: 7, imageUrl: "/images/caramel-cake.jpg", category: "tort", isActive: false },
    { id: 12, name: "Azərbaycan Qara Çay", description: "Yerli plantasiyalardan", price: 3, imageUrl: "/images/black-tea.jpg", category: "çay", isActive: false },
    { id: 13, name: "Earl Grey", description: "Bergamot aromalı klassik", price: 4, imageUrl: "/images/earl-grey.jpg", category: "çay", isActive: false },
    { id: 14, name: "Yaşıl Çay", description: "Antioksidant zəngin seçim", price: 4, imageUrl: "/images/green-tea.jpg", category: "çay", isActive: false },
    { id: 15, name: "Meyvəli Çay", description: "Mövsümi meyvələrlə blend", price: 5, imageUrl: "/images/fruit-tea.jpg", category: "çay", isActive: false },
];

let orders = [
    { id: 1001, customerName: "Solmaz Cəfərquliyeva", phone: "+994 50 111 22 33", address: "Bakı, Nəsimi r.", totalPrice: 25, paymentType: "Nağd", orderDate: "2026-03-10", status: "Yeni", items: [
        { productName: "New York Cheesecake", quantity: 2, price: 8 },
        { productName: "Earl Grey", quantity: 3, price: 3 }
    ]},
    { id: 1002, customerName: "Firəngiz Xudaverdiyeva", phone: "+994 55 444 55 66", address: "Bakı, Yasamal r.", totalPrice: 18, paymentType: "Kart", orderDate: "2026-03-09", status: "Hazırlanır", items: [
        { productName: "Lotus Cheesecake", quantity: 1, price: 10 },
        { productName: "Red Velvet", quantity: 1, price: 8 }
    ]},
    { id: 1003, customerName: "Sevinay Rzayeva", phone: "+994 70 777 88 99", address: "Bakı, Sabunçu r.", totalPrice: 32, paymentType: "Nağd", orderDate: "2026-03-08", status: "Çatdırılıb", items: [
        { productName: "Chocolate Dream Cake", quantity: 2, price: 7 },
        { productName: "Strawberry Cheesecake", quantity: 2, price: 9 }
    ]},
    { id: 1004, customerName: "Fidan Rzayeva", phone: "+994 51 333 44 55", address: "Bakı, Xətai r.", totalPrice: 14, paymentType: "Kart", orderDate: "2026-03-07", status: "Yolda", items: [
        { productName: "Caramel Cake", quantity: 2, price: 7 }
    ]},
    { id: 1005, customerName: "Aysel Mohbaliyeva", phone: "+994 55 999 00 11", address: "Bakı, Binəqədi r.", totalPrice: 10, paymentType: "Nağd", orderDate: "2026-03-06", status: "Ləğv", items: [
        { productName: "Lotus Cheesecake", quantity: 1, price: 10 }
    ]},
];

let reservations = [
    { id: 1, name: "Səriyyə Cəfərova", phone: "+994 50 222 33 44", date: "2026-03-15", time: "19:00", peopleCount: 4 },
    { id: 2, name: "Fidan Behbudova", phone: "+994 55 555 66 77", date: "2026-03-16", time: "20:00", peopleCount: 2 },
    { id: 3, name: "Mahirə Məmmədova", phone: "+994 70 111 22 33", date: "2026-03-17", time: "18:30", peopleCount: 6 },
];


const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


document.addEventListener("DOMContentLoaded", () => {
    initLogin();
    initNavigation();
    initProductModal();
    initOrderModal();
    initDeleteModal();
    initSidebar();
    initFilters();
});


function initLogin() {
    $("#loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = $("#loginUsername").value;
        const password = $("#loginPassword").value;

         
         try {
             const res = await fetch(`${API_BASE}/auth/login`, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ username, password })
             });
             if (!res.ok) throw new Error();
             const data = await res.json();
             authToken = data.token;
             localStorage.setItem("adminToken", authToken);
             showAdmin();
         } catch {
             $("#loginError").style.display = "block";
         }

        
        if (username === "Səbinə İsgəndərova" && password === "Sabina555@") {
            authToken = "demo-token";
            localStorage.setItem("adminToken", authToken);
            showAdmin();
        } else {
            $("#loginError").style.display = "block";
            setTimeout(() => { $("#loginError").style.display = "none"; }, 3000);
        }
    });

    
    if (authToken) showAdmin();
}

function showAdmin() {
    $("#loginScreen").style.display = "none";
    $("#adminPanel").style.display = "flex";
    renderDashboard();
    renderProducts();
    renderOrders();
    renderReservations();
}

function logout() {
    authToken = null;
    localStorage.removeItem("adminToken");
    $("#adminPanel").style.display = "none";
    $("#loginScreen").style.display = "flex";
    $("#loginUsername").value = "";
    $("#loginPassword").value = "";
}


function initNavigation() {
    $$(".nav-item[data-tab]").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;

           
            $$(".nav-item").forEach((n) => n.classList.remove("active"));
            item.classList.add("active");

            
            $$(".tab-content").forEach((t) => t.classList.remove("active"));
            $(`#tab-${tab}`).classList.add("active");

            
            const titles = { dashboard: "İdarə Paneli", products: "Məhsullar", orders: "Sifarişlər", reservations: "Rezervasiyalar" };
            $("#pageTitle").textContent = titles[tab];

            
            $(".sidebar").classList.remove("open");
        });
    });

    $("#logoutBtn").addEventListener("click", (e) => {
        e.preventDefault();
        logout();
    });
}


function initSidebar() {
    $("#sidebarToggle").addEventListener("click", () => {
        $(".sidebar").classList.toggle("open");
    });
}


function renderDashboard() {
    const activeProducts = products.filter((p) => p.isActive).length;
    const totalRevenue = orders.filter((o) => o.status !== "Ləğv").reduce((s, o) => s + o.totalPrice, 0);

    $("#statProducts").textContent = activeProducts;
    $("#statOrders").textContent = orders.length;
    $("#statRevenue").textContent = totalRevenue + " AZN";
    $("#statReservations").textContent = reservations.length;

    
    const recent = orders.slice(0, 5);
    $("#recentOrdersBody").innerHTML = recent.map((o) => `
        <tr>
            <td>${o.id}</td>
            <td>${o.customerName}</td>
            <td><strong>${o.totalPrice} AZN</strong></td>
            <td><span class="status-badge status-${getStatusClass(o.status)}">${o.status}</span></td>
            <td>${o.orderDate}</td>
        </tr>
    `).join("");

    
    drawSalesChart();
    drawCategoryChart();
}

function getStatusClass(status) {
    const map = { "Yeni": "yeni", "Hazırlanır": "hazırlanır", "Yolda": "yolda", "Çatdırılıb": "çatdırılıb", "Ləğv": "ləğv" };
    return map[status] || "yeni";
}


function drawSalesChart() {
    const canvas = $("#salesChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    
    const months = ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt", "Noy", "Dek"];
    const data = [120, 180, 240, 200, 310, 280, 350, 320, 290, 370, 410, 450];
    const max = Math.max(...data) * 1.2;

    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barW = chartW / data.length - 8;

    
    ctx.strokeStyle = "#e8d5c4";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();

        ctx.fillStyle = "#a1887f";
        ctx.font = "11px 'Open Sans'";
        ctx.textAlign = "right";
        ctx.fillText(Math.round(max - (max / 4) * i) + "", padding.left - 8, y + 4);
    }

    
    data.forEach((val, i) => {
        const barH = (val / max) * chartH;
        const x = padding.left + i * (chartW / data.length) + 4;
        const y = padding.top + chartH - barH;

        
        const grad = ctx.createLinearGradient(x, y, x, y + barH);
        grad.addColorStop(0, "#c2185b");
        grad.addColorStop(1, "#e91e90");
        ctx.fillStyle = grad;

        
        const r = 4;
        ctx.beginPath();
        ctx.moveTo(x, y + barH);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.lineTo(x + barW - r, y);
        ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
        ctx.lineTo(x + barW, y + barH);
        ctx.closePath();
        ctx.fill();

        
        ctx.fillStyle = "#8d6e63";
        ctx.font = "11px 'Open Sans'";
        ctx.textAlign = "center";
        ctx.fillText(months[i], x + barW / 2, h - padding.bottom + 18);
    });
}

function drawCategoryChart() {
    const canvas = $("#categoryChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const data = [
        { label: "Cheesecake", value: 45, color: "#c2185b" },
        { label: "Tort", value: 30, color: "#d4a574" },
        { label: "Çay", value: 25, color: "#2e7d32" },
    ];

    const total = data.reduce((s, d) => s + d.value, 0);
    const cx = w / 2;
    const cy = h / 2 - 15;
    const radius = Math.min(w, h) / 2 - 50;
    let startAngle = -Math.PI / 2;

    data.forEach((item) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        
        const midAngle = startAngle + sliceAngle / 2;
        const lx = cx + Math.cos(midAngle) * (radius * 0.65);
        const ly = cy + Math.sin(midAngle) * (radius * 0.65);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px 'Open Sans'";
        ctx.textAlign = "center";
        ctx.fillText(Math.round((item.value / total) * 100) + "%", lx, ly);

        startAngle = endAngle;
    });

    
    let legendY = h - 30;
    let legendX = 30;
    data.forEach((item) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY, 12, 12);
        ctx.fillStyle = "#3e2723";
        ctx.font = "13px 'Open Sans'";
        ctx.textAlign = "left";
        ctx.fillText(`${item.label} (${item.value}%)`, legendX + 18, legendY + 10);
        legendX += 140;
    });
}


function renderProducts(filter = "all", search = "") {
    let filtered = products;
    if (filter !== "all") filtered = filtered.filter((p) => p.category === filter);
    if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    $("#productsBody").innerHTML = filtered.map((p) => `
        <tr>
            <td>${p.id}</td>
            <td><img src="${p.imageUrl}" alt="${p.name}" class="product-img" onerror="this.src='https://via.placeholder.com/50x50?text=No+Img'"></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.description || "—"}</td>
            <td><span class="status-badge">${getCategoryLabel(p.category)}</span></td>
            <td><strong>${p.price} AZN</strong></td>
            <td><span class="status-badge status-${p.isActive ? 'aktiv' : 'deaktiv'}">${p.isActive ? 'Aktiv' : 'Deaktiv'}</span></td>
            <td>
                <button class="btn-icon edit" onclick="openEditProduct(${p.id})" title="Redaktə et">✏️</button>
                <button class="btn-icon delete" onclick="openDeleteProduct(${p.id})" title="Sil">🗑️</button>
            </td>
        </tr>
    `).join("");
}

function getCategoryLabel(cat) {
    const map = { cheesecake: "Cheesecake", cake: "Tort", tea: "Çay" };
    return map[cat] || cat;
}


let editingProductId = null;
let selectedImageFile = null;

function initProductModal() {
    
    $("#addProductBtn").addEventListener("click", () => {
        editingProductId = null;
        selectedImageFile = null;
        $("#modalTitle").textContent = "Yeni Məhsul Əlavə Et";
        $("#productForm").reset();
        $("#previewImg").style.display = "none";
        $("#imagePreview").style.display = "block";
        $("#productModal").style.display = "flex";
    });

    
    $("#closeProductModal").addEventListener("click", closeProductModal);
    $("#cancelProductModal").addEventListener("click", closeProductModal);

    $("#imageUploadArea").addEventListener("click", () => {
        $("#productImage").click();
    });

    
    const uploadArea = $("#imageUploadArea");
    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--primary)";
    });
    uploadArea.addEventListener("dragleave", () => {
        uploadArea.style.borderColor = "var(--border)";
    });
    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--border)";
        if (e.dataTransfer.files.length) {
            handleImageFile(e.dataTransfer.files[0]);
        }
    });

    $("#productImage").addEventListener("change", (e) => {
        if (e.target.files.length) {
            handleImageFile(e.target.files[0]);
        }
    });

    
    $("#productForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const productData = {
            name: $("#productName").value,
            description: $("#productDescription").value,
            price: parseFloat($("#productPrice").value),
            category: $("#productCategory").value,
            isActive: $("#productStatus").value === "true",
        };

         try {
             const formData = new FormData();
             formData.append("name", productData.name);
             formData.append("description", productData.description);
             formData.append("price", productData.price);
             formData.append("category", productData.category);
             formData.append("isActive", productData.isActive);
             if (selectedImageFile) formData.append("image", selectedImageFile);
        
             const url = editingProductId
                 ? `${API_BASE}/products/${editingProductId}`
                 : `${API_BASE}/products`;
             const method = editingProductId ? "PUT" : "POST";
        
             const res = await fetch(url, {
                 method,
                 headers: { "Authorization": `Bearer ${authToken}` },
                 body: formData
             });
             if (!res.ok) throw new Error();
             const saved = await res.json();
             showToast(editingProductId ? "Məhsul yeniləndi!" : "Məhsul əlavə edildi!", "success");
             await loadProducts(); 
         } catch (err) {
             showToast("Xəta baş verdi!", "error");
         }

        
        if (editingProductId) {
            const idx = products.findIndex((p) => p.id === editingProductId);
            if (idx !== -1) {
                products[idx] = { ...products[idx], ...productData };
                if (selectedImageFile) {
                    products[idx].imageUrl = URL.createObjectURL(selectedImageFile);
                }
            }
            showToast("Məhsul yeniləndi!", "success");
        } else {
            const newId = Math.max(...products.map((p) => p.id)) + 1;
            products.push({
                id: newId,
                ...productData,
                imageUrl: selectedImageFile ? URL.createObjectURL(selectedImageFile) : "https://via.placeholder.com/200x200?text=No+Image"
            });
            showToast("Yeni məhsul əlavə edildi!", "success");
        }

        closeProductModal();
        renderProducts();
        renderDashboard();
    });
}

function handleImageFile(file) {
    if (file.size > 5 * 1024 * 1024) {
        showToast("Şəkil 5MB-dan böyük ola bilməz!", "error");
        return;
    }
    if (!file.type.startsWith("image/")) {
        showToast("Yalnız şəkil faylları qəbul edilir!", "error");
        return;
    }
    selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        $("#previewImg").src = e.target.result;
        $("#previewImg").style.display = "block";
        $("#imagePreview").style.display = "none";
    };
    reader.readAsDataURL(file);
}

function openEditProduct(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    editingProductId = id;
    selectedImageFile = null;
    $("#modalTitle").textContent = "Məhsulu Redaktə Et";
    $("#productId").value = product.id;
    $("#productName").value = product.name;
    $("#productDescription").value = product.description || "";
    $("#productPrice").value = product.price;
    $("#productCategory").value = product.category;
    $("#productStatus").value = product.isActive.toString();

    if (product.imageUrl) {
        $("#previewImg").src = product.imageUrl;
        $("#previewImg").style.display = "block";
        $("#imagePreview").style.display = "none";
    } else {
        $("#previewImg").style.display = "none";
        $("#imagePreview").style.display = "block";
    }

    $("#productModal").style.display = "flex";
}

function closeProductModal() {
    $("#productModal").style.display = "none";
    editingProductId = null;
    selectedImageFile = null;
}


let deletingProductId = null;

function initDeleteModal() {
    $("#closeDeleteModal").addEventListener("click", () => { $("#deleteModal").style.display = "none"; });
    $("#cancelDelete").addEventListener("click", () => { $("#deleteModal").style.display = "none"; });

    $("#confirmDelete").addEventListener("click", async () => {
        if (!deletingProductId) return;

       
         try {
             await fetch(`${API_BASE}/products/${deletingProductId}`, {
                 method: "DELETE",
                 headers: { "Authorization": `Bearer ${authToken}` }
             });
             showToast("Məhsul silindi!", "success");
             await loadProducts();
         } catch { showToast("Xəta!", "error"); }

        
        products = products.filter((p) => p.id !== deletingProductId);
        showToast("Məhsul silindi!", "success");
        $("#deleteModal").style.display = "none";
        deletingProductId = null;
        renderProducts();
        renderDashboard();
    });
}

function openDeleteProduct(id) {
    deletingProductId = id;
    $("#deleteModal").style.display = "flex";
}


let selectedOrderId = null;

function renderOrders(statusFilter = "all") {
    let filtered = orders;
    if (statusFilter !== "all") filtered = filtered.filter((o) => o.status === statusFilter);

    $("#ordersBody").innerHTML = filtered.map((o) => `
        <tr>
            <td>${o.id}</td>
            <td><strong>${o.customerName}</strong></td>
            <td>${o.phone}</td>
            <td>${o.address}</td>
            <td><strong>${o.totalPrice} AZN</strong></td>
            <td>${o.paymentType}</td>
            <td>${o.orderDate}</td>
            <td><span class="status-badge status-${getStatusClass(o.status)}">${o.status}</span></td>
            <td>
                <button class="btn-icon edit" onclick="openOrderDetails(${o.id})" title="Detallar">👁️</button>
            </td>
        </tr>
    `).join("");
}

function initOrderModal() {
    $("#closeOrderModal").addEventListener("click", () => { $("#orderModal").style.display = "none"; });

    $("#updateOrderStatus").addEventListener("click", async () => {
        if (!selectedOrderId) return;
        const newStatus = $("#orderStatusChange").value;

        
         try {
             await fetch(`${API_BASE}/orders/${selectedOrderId}/status`, {
                 method: "PATCH",
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${authToken}`
                 },
                 body: JSON.stringify({ status: newStatus })
             });
             showToast("Status yeniləndi!", "success");
         } catch { showToast("Xəta!", "error"); }

        
        const order = orders.find((o) => o.id === selectedOrderId);
        if (order) {
            order.status = newStatus;
            showToast(`Sifariş #${selectedOrderId} statusu: ${newStatus}`, "success");
        }

        $("#orderModal").style.display = "none";
        renderOrders();
        renderDashboard();
    });
}

function openOrderDetails(id) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    selectedOrderId = id;

    $("#orderDetails").innerHTML = `
        <div class="detail-row"><span class="label">Sifariş №</span><span class="value">#${order.id}</span></div>
        <div class="detail-row"><span class="label">Müştəri</span><span class="value">${order.customerName}</span></div>
        <div class="detail-row"><span class="label">Telefon</span><span class="value">${order.phone}</span></div>
        <div class="detail-row"><span class="label">Ünvan</span><span class="value">${order.address}</span></div>
        <div class="detail-row"><span class="label">Ödəniş</span><span class="value">${order.paymentType}</span></div>
        <div class="detail-row"><span class="label">Tarix</span><span class="value">${order.orderDate}</span></div>
        <div class="detail-row"><span class="label">Status</span><span class="value"><span class="status-badge status-${getStatusClass(order.status)}">${order.status}</span></span></div>
        <div class="order-items-list">
            <h4>Məhsullar:</h4>
            ${order.items.map((item) => `
                <div class="order-item-row">
                    <span>${item.productName} x${item.quantity}</span>
                    <span>${item.price * item.quantity} AZN</span>
                </div>
            `).join("")}
            <div class="detail-row" style="margin-top:10px; font-weight:700;">
                <span class="label">CƏM</span>
                <span class="value" style="color:var(--primary)">${order.totalPrice} AZN</span>
            </div>
        </div>
    `;

    $("#orderStatusChange").value = order.status;
    $("#orderModal").style.display = "flex";
}


function renderReservations() {
    $("#reservationsBody").innerHTML = reservations.map((r) => `
        <tr>
            <td>${r.id}</td>
            <td><strong>${r.name}</strong></td>
            <td>${r.phone}</td>
            <td>${r.date}</td>
            <td>${r.time}</td>
            <td>${r.peopleCount} nəfər</td>
            <td>
                <button class="btn-icon delete" onclick="deleteReservation(${r.id})" title="Sil">🗑️</button>
            </td>
        </tr>
    `).join("");
}

function deleteReservation(id) {
    
    reservations = reservations.filter((r) => r.id !== id);
    showToast("Rezervasiya silindi!", "success");
    renderReservations();
    renderDashboard();
}


function initFilters() {
    $("#productFilter").addEventListener("change", (e) => {
        renderProducts(e.target.value, $("#productSearch").value);
    });

    $("#productSearch").addEventListener("input", (e) => {
        renderProducts($("#productFilter").value, e.target.value);
    });

    $("#orderStatusFilter").addEventListener("change", (e) => {
        renderOrders(e.target.value);
    });
}

function showToast(message, type = "success") {
    const toast = $("#toast");
    toast.textContent = message;
    toast.className = "toast " + type;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3000);
}


async function apiFetch(endpoint, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

    if (res.status === 401) {
        logout();
        showToast("Sessiya bitdi, yenidən daxil olun!", "error");
        throw new Error("Unauthorized");
    }

    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
}


 async function loadProducts() {
     products = await apiFetch("/products");
     renderProducts();
 }
 async function loadOrders() {
     orders = await apiFetch("/orders");
     renderOrders();
 }
 async function loadReservations() {
     reservations = await apiFetch("/reservations");
     renderReservations();
 }
