/* =====================================================
   UJASCODE.IN
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   DOM ELEMENTS
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");

const navItems =
    document.querySelectorAll(".nav-link");

const header =
    document.getElementById("header");

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const processSteps =
    document.querySelectorAll(
        ".process-step"
    );

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle(
                    "active"
                );

            menuButton.classList.toggle(
                "open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );


    /* -----------------------------------------
       CLOSE MENU AFTER NAVIGATION
    ----------------------------------------- */

    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "active"
                );

                menuButton.classList.remove(
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }
        );

    });

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function updateActiveNavigation() {

    if (
        !sections.length ||
        !navItems.length
    ) {
        return;
    }

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = null;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.getAttribute(
                    "id"
                );

        }

    });


    if (!currentSection) {
        return;
    }


    navItems.forEach((item) => {

        item.classList.remove(
            "active"
        );

        const target =
            item.getAttribute(
                "href"
            );

        if (
            target ===
            `#${currentSection}`
        ) {

            item.classList.add(
                "active"
            );

        }

    });

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

function updateHeader() {

    if (!header) {
        return;
    }


    if (window.scrollY > 30) {

        header.style.background =
            "rgba(5, 5, 5, 0.94)";

        header.style.borderBottomColor =
            "rgba(255, 255, 255, 0.13)";

    } else {

        header.style.background =
            "rgba(5, 5, 5, 0.82)";

        header.style.borderBottomColor =
            "rgba(255, 255, 255, 0.09)";

    }

}


/* =====================================================
   SCROLL EVENTS
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        updateHeader();

        updateActiveNavigation();

    },
    {
        passive: true
    }
);


/* =====================================================
   PROCESS INTERACTION
===================================================== */

processSteps.forEach((step) => {

    step.addEventListener(
        "mouseenter",
        () => {

            processSteps.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );

            step.classList.add(
                "active"
            );

        }
    );

});


/* =====================================================
   CONTACT FORM
===================================================== */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* -----------------------------------------
               GET SUBMIT BUTTON
            ----------------------------------------- */

            const submitButton =
                contactForm.querySelector(
                    ".contact-submit"
                );


            if (!submitButton) {
                return;
            }


            const buttonText =
                submitButton.querySelector(
                    "span"
                );


            /* -----------------------------------------
               CHECK FORM STATUS
            ----------------------------------------- */

            if (!formStatus) {
                return;
            }


            /* -----------------------------------------
               LOADING STATE
            ----------------------------------------- */

            submitButton.disabled = true;


            if (buttonText) {

                buttonText.textContent =
                    "SENDING...";

            }


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            /* -----------------------------------------
               FORM DATA
            ----------------------------------------- */

            const formData =
                new FormData(
                    contactForm
                );


            /* -----------------------------------------
               SUBMIT TO FORMSPREE
            ----------------------------------------- */

            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /* -------------------------------------
                   SUCCESS
                ------------------------------------- */

                if (response.ok) {

                    formStatus.textContent =
                        "Your enquiry has been sent successfully.";

                    formStatus.classList.add(
                        "success"
                    );

                    contactForm.reset();


                }

                /* -------------------------------------
                   ERROR
                ------------------------------------- */

                else {

                    formStatus.textContent =
                        "Something went wrong. Please try again.";

                    formStatus.classList.add(
                        "error"
                    );

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                formStatus.textContent =
                    "Unable to send your enquiry. Please try again.";

                formStatus.classList.add(
                    "error"
                );


            } finally {

                /* -------------------------------------
                   RESTORE BUTTON
                ------------------------------------- */

                submitButton.disabled =
                    false;


                if (buttonText) {

                    buttonText.textContent =
                        "SEND ENQUIRY";

                }

            }

        }
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

updateHeader();

updateActiveNavigation();