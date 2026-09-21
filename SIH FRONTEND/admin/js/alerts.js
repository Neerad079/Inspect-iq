/* =========================================================
   SMARTINSPECT AI - ALERTS PAGE JS
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SIDEBAR
       SAME FUNCTIONALITY AS INSPECTIONS PAGE
       ===================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");

    const closeSidebarBtn =
        document.getElementById("closeSidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    /* =====================================================
       OPEN SIDEBAR
       ===================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("show");

        if (sidebarOverlay) {

            sidebarOverlay.classList.add("show");

        }

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLOSE SIDEBAR
       ===================================================== */

    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("show");

        if (sidebarOverlay) {

            sidebarOverlay.classList.remove("show");

        }

        document.body.style.overflow = "";

    }


    /* =====================================================
       OPEN MENU BUTTON
       ===================================================== */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                openSidebar();

            }
        );

    }


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (closeSidebarBtn) {

        closeSidebarBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeSidebar();

            }
        );

    }


    /* =====================================================
       CLOSE BY OVERLAY
       ===================================================== */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* =====================================================
       CLOSE AFTER NAVIGATION
       ===================================================== */

    document
        .querySelectorAll(".nav-item")
        .forEach(function (item) {

            item.addEventListener(
                "click",
                function () {

                    if (window.innerWidth <= 700) {

                        closeSidebar();

                    }

                }
            );

        });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

                closeModal();

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 700) {

                sidebar?.classList.remove("show");

                sidebarOverlay?.classList.remove("show");

                document.body.style.overflow = "";

            }

        }
    );



    /* =====================================================
       ALERT ELEMENTS
       ===================================================== */

    const alertsList =
        document.getElementById("alertsList");

    const alertCards =
        document.querySelectorAll(".alert-card");

    const searchInput =
        document.getElementById("searchInput");

    const severityFilter =
        document.getElementById("severityFilter");

    const typeFilter =
        document.getElementById("typeFilter");

    const emptyState =
        document.getElementById("emptyState");

    const paginationText =
        document.getElementById("paginationText");



    /* =====================================================
       FILTER ALERTS
       ===================================================== */

    function filterAlerts() {

        if (!alertsList) return;


        const searchValue =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const severityValue =
            severityFilter
                ? severityFilter.value
                : "all";


        const typeValue =
            typeFilter
                ? typeFilter.value
                : "all";


        let visibleCount = 0;


        alertCards.forEach(
            function (card) {


                const cardSeverity =
                    card.dataset.severity || "";


                const cardType =
                    card.dataset.type || "";


                const searchData =
                    card.dataset.search
                        ? card.dataset.search.toLowerCase()
                        : card.textContent.toLowerCase();


                const severityMatch =
                    severityValue === "all" ||
                    cardSeverity === severityValue;


                const typeMatch =
                    typeValue === "all" ||
                    cardType === typeValue;


                const searchMatch =
                    searchValue === "" ||
                    searchData.includes(searchValue);


                if (
                    severityMatch &&
                    typeMatch &&
                    searchMatch
                ) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            }
        );


        /* =================================================
           EMPTY STATE
           ================================================= */

        if (emptyState) {

            if (visibleCount === 0) {

                emptyState.classList.add("show");

            } else {

                emptyState.classList.remove("show");

            }

        }


        /* =================================================
           PAGINATION TEXT
           ================================================= */

        if (paginationText) {

            paginationText.textContent =
                `Showing ${visibleCount} of ${alertCards.length} alerts`;

        }

    }



    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterAlerts();

            }
        );

    }



    /* =====================================================
       SEVERITY FILTER
       ===================================================== */

    if (severityFilter) {

        severityFilter.addEventListener(
            "change",
            function () {

                filterAlerts();

            }
        );

    }



    /* =====================================================
       TYPE FILTER
       ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            function () {

                filterAlerts();

            }
        );

    }



    /* =====================================================
       STATISTICS
       ===================================================== */

    function updateStats() {

        let total = alertCards.length;

        let high = 0;

        let medium = 0;

        let recent = 0;


        alertCards.forEach(
            function (card) {


                const severity =
                    card.dataset.severity;


                if (severity === "high") {

                    high++;

                }


                if (severity === "medium") {

                    medium++;

                }


                /*
                 * First four alerts are treated
                 * as recent prototype alerts.
                 */

                if (
                    !card
                        .querySelector(".alert-time")
                        ?.textContent
                        .includes("days ago")
                ) {

                    recent++;

                }

            }
        );


        const totalCount =
            document.getElementById("totalCount");

        const highCount =
            document.getElementById("highCount");

        const mediumCount =
            document.getElementById("mediumCount");

        const recentCount =
            document.getElementById("recentCount");


        if (totalCount) {

            totalCount.textContent = total;

        }


        if (highCount) {

            highCount.textContent = high;

        }


        if (mediumCount) {

            mediumCount.textContent = medium;

        }


        if (recentCount) {

            recentCount.textContent = recent;

        }

    }



    /* =====================================================
       VIEW INSTITUTION
       ===================================================== */

    const viewButtons =
        document.querySelectorAll(
            ".view-institution"
        );


    const modal =
        document.getElementById("alertModal");


    const modalClose =
        document.getElementById("modalClose");


    const modalInstitution =
        document.getElementById("modalInstitution");


    const modalLocation =
        document.getElementById("modalLocation");


    const modalScore =
        document.getElementById("modalScore");


    const modalOpenBtn =
        document.getElementById("modalOpenBtn");



    let selectedInstitution = "";



    /* =====================================================
       OPEN MODAL
       ===================================================== */

    viewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const institution =
                        button.dataset.institution || "Institution";


                    const location =
                        button.dataset.location || "Location";


                    const score =
                        button.dataset.score || "0";


                    selectedInstitution =
                        institution;


                    if (modalInstitution) {

                        modalInstitution.textContent =
                            institution;

                    }


                    if (modalLocation) {

                        modalLocation.textContent =
                            location;

                    }


                    if (modalScore) {

                        modalScore.textContent =
                            `${score}/100`;

                    }


                    if (modal) {

                        modal.classList.add("show");

                    }


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );



    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal() {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }



    /* =====================================================
       MODAL CLOSE BUTTON
       ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            function () {

                closeModal();

            }
        );

    }



    /* =====================================================
       CLICK OUTSIDE MODAL
       ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }



    /* =====================================================
       OPEN INSTITUTION BUTTON
       ===================================================== */

    if (modalOpenBtn) {

        modalOpenBtn.addEventListener(
            "click",
            function () {

                /*
                 * Prototype behavior.
                 * Replace this with your actual
                 * institution page URL later.
                 */

                if (selectedInstitution) {

                    alert(
                        `Opening Institution\n\n${selectedInstitution}`
                    );

                }

            }
        );

    }



    /* =====================================================
       INITIALIZE
       ===================================================== */

    filterAlerts();

    updateStats();


});