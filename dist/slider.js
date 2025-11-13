document.addEventListener("DOMContentLoaded", () => {

    // Cambiato ID root per evitare conflitti con altri slider Enpal
    const root = document.getElementById("mini-slider");
    if (!root) {
        console.error("SmallSlider: elemento #mini-slider non trovato.");
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

        // Progress bar
        const progress = document.createElement("div");
        progress.style = "width:100%;background:rgba(229,231,235,0.5);height:6px;border-radius:4px;margin-bottom:20px;";

        const bar = document.createElement("div");
        bar.id = "small-slider-progress-bar";
        bar.style = "width:0%;height:100%;background:#ffb000;border-radius:4px;transition:width 0.4s ease;";

        progress.appendChild(bar);
        root.appendChild(progress);

        const slide = buildSlide(steps[current]);
        root.appendChild(slide);

        updateProgress();
        smallSlider.track("step_view", { step: steps[current].id });
    }

    // ====== CREA UNA SLIDE ======
    function buildSlide(step) {
        const container = document.createElement("div");
        container.className = "slider-card";

        const title = document.createElement("h3");
        title.className = "wizard-title";
        title.textContent = step.title;
        container.appendChild(title);

        // Scelte singole
        if (step.type === "single") {
            const grid = document.createElement("div");
            grid.className = "choice-grid";

            step.options.forEach(opt => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "choice-option";
                btn.textContent = opt.label;

                btn.onclick = () => {
                    data[step.id] = opt.value;
                    smallSlider.track("step_answer", { step: step.id, value: opt.value });
                    next();
                };

                grid.appendChild(btn);
            });

            container.appendChild(grid);
        }

        // Input (CAP, nome, telefono)
        if (step.type === "input") {
            const form = document.createElement("form");
            form.className = "form-group";

            const input = document.createElement("input");
            input.className = "w-input";
            input.placeholder = step.placeholder;
            input.name = step.name;
            input.required = true;

            const btn = document.createElement("button");
            btn.type = "submit";
            btn.className = "btn-next";
            btn.textContent = "Avanti";

            form.appendChild(input);
            form.appendChild(btn);

            form.onsubmit = e => {
                e.preventDefault();
                data[step.id] = input.value;
                smallSlider.track("step_answer", { step: step.id, value: input.value });
                next();
            };

            container.appendChild(form);
        }

        // Slide finale
        if (step.type === "info") {
            const html = document.createElement("div");
            html.innerHTML = step.html;
            container.appendChild(html);
        }

        // Bottone indietro
        if (current > 0 && step.type !== "info") {
            const back = document.createElement("button");
            back.type = "button";
            back.className = "btn-prev";
            back.textContent = "Indietro";
            back.onclick = prev;
            container.appendChild(back);
        }

        return container;
    }

    // ====== PROGRESS BAR ======
    function updateProgress() {
        const bar = document.getElementById("small-slider-progress-bar");
        const percentage = (current / (steps.length - 1)) * 100;
        bar.style.width = percentage + "%";
    }

    // ====== AVANTI ======
    function next() {
        if (current < steps.length - 1) {
            current++;
            render();
        } else {
            smallSlider.track("complete", data);
        }
    }

    // ====== INDIETRO ======
    function prev() {
        if (current > 0) {
            current--;
            render();
        }
    }

    render();
});
