const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll(".btn");
let allProductsdata = []

const filters = {
    searchItems: ""
}

document.addEventListener("DOMContentLoaded", () => {
    axios
        .get("http://localhost:3004/items")
        .then((res) => {
            allProductsdata = res.data;
            renderProducts(res.data, filters);
        })
        .catch(err => console.log(err))
})


function renderProducts(_products, _filters) {
    console.log(_products, _filters.searchItems.toLowerCase())
    const filteredProducts = _products.filter((p) => {
        return p.title
            .toLowerCase()
            .includes(_filters.searchItems.toLowerCase());
    });
    productsDOM.innerHTML = " ";
    filteredProducts.forEach((items, index) => {
        const productsDiv = document.createElement("div");
        productsDiv.classList.add("product");
        productsDiv.innerHTML = `
        <div class="img-container">
        <img
            class="product-img"
            src=${items.image}
            alt=${index}
        />
    </div>
    <div class="product-desc">
        <p class="product-price">${items.price}</p>
        <p class="product-title">${items.title}</p>
    </div>        
        `;
        productsDOM.appendChild(productsDiv);
    });
}

searchInput.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProductsdata, filters);
});

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const filter = e.target.dataset.filter
        filters.searchItems = filter;
        renderProducts(allProductsdata, filters);
    });
});
