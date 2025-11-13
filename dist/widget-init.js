(function () {

    // URL CDN con i tuoi dati GitHub
    const CDN_BASE = "https://cdn.jsdelivr.net/gh/lauramarazzi-tech/enpal-slider-widget/dist";

    // Carica CSS dello slider
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = CDN_BASE + "/slider.css";
    document.head.appendChild(css);

    // Carica la logica dello slider
    const script = document.createElement("script");
    script.src = CDN_BASE + "/slider.js";
    script.defer = true;
    document.body.appendChild(script);

    // Tracking per GA4 + Meta Pixel
    window.sliderWidget = {
        track(eventName, payload = {}) {
            console.log("Slider event:", eventName, payload);

            // GA4
            if (typeof gtag === "function") {
                gtag("event", eventName, payload);
            }

            // Meta Pixel
            if (typeof fbq === "function") {
                fbq("trackCustom", eventName, payload);
            }
        }
    };

})();
