const accordian = document.querySelector(".collapse-content");

let activeItem;
accordian.addEventListener("click", (event) => {
    const current = event.target.closest(".collapse");
    if (activeItem) {
        activeItem.classList.remove("open");
    }
    if (current) {
        activeItem = current;
        event.target.closest(".collapse").classList.add("open");
    }
});
