let aTags = document.querySelectorAll('nav.menu > ul > li > a')


// Setup the animation loop.
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);



for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop

        let currentTop = window.scrollY
        let targetTop = top - 80
        let s = targetTop - currentTop

        var coords = { y: currentTop }; // Start at (0, 0)
        var t = Math.abs((s / 100) * 300)
        if (t > 500) { t = 500 }
        var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({ y: targetTop }, t) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                window.scrollTo(0, coords.y)
            })
            .start(); // Start the tween immediately.
    }
}