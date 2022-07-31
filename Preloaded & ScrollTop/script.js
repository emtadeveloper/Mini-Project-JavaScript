const backToTop = document.getElementById("backToTop")


backToTop.addEventListener("click", function (e) {
    scrollTop(0, 1000)
    console.log("click")
})

function scrollTop(scroll, duration) {
    let doc = document.documentElement
    let currentTime = duration
    let speed = 10

    let animate = () => {
        if (currentTime < 0) return
        setTimeout(() => {
            doc.scrollTop -= doc.scrollTop / (currentTime / speed)
            currentTime -= speed
            animate()
        }, speed)
    }
    animate()
}

window.addEventListener("scroll", function (e) {
    if (this.document.documentElement.scrollTop > 250) {
        backToTop.style.display = "flex"
    } else {
        backToTop.style.display = "none"
    }
})


document.addEventListener("DOMContentLoaded", function () {
    let preloader = document.getElementById("preloader")
    let content = document.getElementById("content")
    setTimeout(() => {
        content.style.display = "block"
        preloader.style.display = "none"
    }, 1000)
})