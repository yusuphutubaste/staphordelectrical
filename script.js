
/* ==========================================
   STAPHORD ELECTRICAL SOLUTIONS
   MAIN WEBSITE JAVASCRIPT
========================================== */


/* ==========================================
   1. WEBSITE INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();
    initializeQuoteForm();
    initializeLanguageSelector();
    loadGoogleTranslate();

});


/* ==========================================
   2. MOBILE NAVIGATION
========================================== */

function initializeNavigation() {

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("show");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

    }

    // Automatically highlight current page

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });

}


/* ==========================================
   3. WHATSAPP QUOTATION FORM
========================================== */

function initializeQuoteForm() {

    const quoteForm = document.getElementById("quoteForm");

    if (!quoteForm) return;

    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("clientName").value.trim();
        const phone = document.getElementById("clientPhone").value.trim();
        const service = document.getElementById("serviceType").value;
        const message = document.getElementById("clientMessage").value.trim();

        const companyWhatsApp = "255796416462";

        const text =
`Hello STAPHORD ELECTRICAL SOLUTIONS,

Name/Company: ${name}
Phone: ${phone}
Service Needed: ${service}
Project Details: ${message}`;

        const whatsappURL =
            `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");

    });

}


/* ==========================================
   4. GOOGLE TRANSLATE INITIALIZATION
========================================== */

window.googleTranslateElementInit = function () {

    if (!window.google || !google.translate) return;

    new google.translate.TranslateElement({

        pageLanguage: "en",
        includedLanguages: "en,sw,fr",
        autoDisplay: false

    }, "google_translate_element");

};


/* ==========================================
   5. LOAD GOOGLE TRANSLATE
========================================== */

function loadGoogleTranslate() {

    const translateElement =
        document.getElementById("google_translate_element");

    if (!translateElement) return;

    if (document.getElementById("google-translate-script")) return;

    const script = document.createElement("script");

    script.id = "google-translate-script";

    script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    script.async = true;

    document.body.appendChild(script);

}


/* ==========================================
   6. LANGUAGE SELECTOR
========================================== */

function initializeLanguageSelector() {

    const widget = document.querySelector(".language-widget");

    const toggle = document.getElementById("language-toggle");

    const menu = document.getElementById("language-menu");

    const currentLanguage =
        document.getElementById("current-language");

    const options =
        document.querySelectorAll(".language-option");

    if (!widget || !toggle || !menu || !currentLanguage) return;

    const languages = {

        en: "English",
        sw: "Kiswahili",
        fr: "Français"

    };

    // Update language display

    function updateLanguage(lang) {

        currentLanguage.textContent =
            languages[lang] || "English";

        options.forEach(function (option) {

            const selected = option.dataset.lang === lang;

            option.classList.toggle("selected", selected);

            option.setAttribute(
                "aria-pressed",
                selected ? "true" : "false"
            );

        });

    }

    // Open and close dropdown

    toggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen = widget.classList.toggle("open");

        toggle.setAttribute("aria-expanded", isOpen);

    });

    // Select language

    options.forEach(function (option) {

        option.addEventListener("click", function () {

            const lang = option.dataset.lang;

            if (!languages[lang]) return;

            localStorage.setItem("preferredLanguage", lang);

            updateLanguage(lang);

            widget.classList.remove("open");

            toggle.setAttribute("aria-expanded", "false");

            applyGoogleLanguage(lang);

        });

    });

    // Restore saved language

    const savedLanguage =
        localStorage.getItem("preferredLanguage") || "en";

    updateLanguage(savedLanguage);

    // Close dropdown when clicking outside

    document.addEventListener("click", function (event) {

        if (!widget.contains(event.target)) {

            widget.classList.remove("open");

            toggle.setAttribute("aria-expanded", "false");

        }

    });

    // Close dropdown with Escape

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            widget.classList.remove("open");

            toggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* ==========================================
   7. APPLY SELECTED LANGUAGE
========================================== */

function applyGoogleLanguage(lang) {

    const googleSelect = document.querySelector(".goog-te-combo");

    if (!googleSelect) {

        console.warn("Google Translate is not ready yet.");

        return;

    }

    googleSelect.value = lang;

    googleSelect.dispatchEvent(new Event("change"));

}

/* AUTOMATIC COPYRIGHT YEAR */

document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});

