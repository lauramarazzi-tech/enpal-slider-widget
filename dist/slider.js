document.addEventListener("DOMContentLoaded", () => {

    const root = document.getElementById("my-custom-slider");
    if (!root) {
        console.error("Slider root element #my-custom-slider non trovato.");
        return;
    }

    // ====== CONFIGURAZIONE SLIDER ======
    const steps = [
        {
            id: "start",
            title: "Quale prodotto vuoi?",
            type: "single",
            options: [
                { label: "Fotovoltaico", value: "pv" },
                { label: "Pompa di Calore", value: "hp" },
                { label: "PV + Pompa di Calore", value: "combo" }
            ]
        },
        {
            id: "zip",
            title: "Qual è il tuo CAP?",
            type: "input",
            placeholder: "Inserisci il CAP",
            name: "zip"
        },
        {
            id: "name",
            title: "Come ti chiami?",
            type: "input",
            placeholder: "Nome e Cognome",
            name: "name"
        },
        {
            id: "phone",
            title: "Il tuo numero di telefono?",
            type: "input",
            placeholder: "Numero di cellulare",
            name: "phone"
        },
        {
            id: "final",
            title: "Richiesta inviata!",
            type: "info",
            html: "<p>Grazie! Ti contattiamo a breve.</p>"
        }
    ];

    let current = 0;
    const data = {};

    // ====== RENDER HTML ======
    function render() {
        root.innerHTML = "";

        const progress = document.createElement("div");
        progress.style = "width:100%;background:rgba(229,231,235,0.5);height:6px;border-radius:4px;margin-bottom:20px;";
        const bar = document.createElement("div");
        bar.id = "slider-progress-bar";
        bar.style = "width:0%;height:100%;background:#ffb000;border-radius:4px;transition:width 0.4s ease;";
        progress.appendChild(bar);
        root.appendChild(progress);

        const slide = buildSlide(steps[current]);
        root.appendChild(slide);

        updateProgress();
        sliderWidget.track("step_view", { step: steps[current].id });
    }

    // ====== CREA LA SLIDE ======
    function buildSlide(step) {
        const container = document.createElement("div");
        container.className = "slider-card";

        const title = document.createElement("h3");
        title.className = "wizard-title";
        title.textContent = step.title;
        container.appendChild(title);

        if (step.type === "single") {
            const grid = document.createElement("div");
            grid.className = "choice-grid";
