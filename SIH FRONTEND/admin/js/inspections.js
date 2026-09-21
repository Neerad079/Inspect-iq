/* =========================================================
   SMARTINSPECT AI - INSPECTIONS PAGE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SIDEBAR
       ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const closeSidebarBtn = document.getElementById("closeSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");


    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("show");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("show");
        }

        document.body.style.overflow = "hidden";
    }


    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("show");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("show");
        }

        document.body.style.overflow = "";
    }


    /* OPEN MENU */

    if (menuBtn) {

        menuBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            openSidebar();

        });

    }


    /* CLOSE MENU */

    if (closeSidebarBtn) {

        closeSidebarBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            closeSidebar();

        });

    }


    /* CLOSE BY OVERLAY */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener("click", function () {

            closeSidebar();

        });

    }


    /* CLOSE AFTER CLICKING NAV ITEM ON MOBILE */

    document.querySelectorAll(".nav-item").forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 700) {
                closeSidebar();
            }

        });

    });


    /* ESC KEY */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });


    /* WINDOW RESIZE */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 700) {

            sidebar?.classList.remove("show");

            sidebarOverlay?.classList.remove("show");

            document.body.style.overflow = "";

        }

    });


    /* =====================================================
       INSPECTION DATA / ELEMENTS
       ===================================================== */

    const inspectionBody =
        document.getElementById("inspectionBody");

    const emptyState =
        document.getElementById("emptyState");

    const searchInput =
        document.getElementById("searchInput");

    const tabs =
        document.querySelectorAll(".tab");


    let currentFilter = "all";


    /* =====================================================
       FILTER FUNCTION
       ===================================================== */

    function filterInspections() {

        if (!inspectionBody) return;

        const rows =
            inspectionBody.querySelectorAll("tr");

        const searchValue =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        let visibleCount = 0;


        rows.forEach(function (row) {

            const status =
                row.dataset.status || "";

            const searchData =
                row.dataset.search
                    ? row.dataset.search.toLowerCase()
                    : row.textContent.toLowerCase();


            const filterMatch =
                currentFilter === "all" ||
                status === currentFilter;


            const searchMatch =
                searchValue === "" ||
                searchData.includes(searchValue);


            if (filterMatch && searchMatch) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        /* EMPTY STATE */

        if (emptyState) {

            if (visibleCount === 0) {
                emptyState.classList.add("show");
            } else {
                emptyState.classList.remove("show");
            }

        }


        /* PAGINATION TEXT */

        const paginationText =
            document.getElementById("paginationText");

        if (paginationText) {

            paginationText.textContent =
                `Showing ${visibleCount} of ${rows.length} inspections`;

        }

    }


    /* =====================================================
       TAB FILTERS
       ===================================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            tabs.forEach(function (item) {

                item.classList.remove("active");

            });


            tab.classList.add("active");


            currentFilter =
                tab.dataset.filter || "all";


            filterInspections();

        });

    });


    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            filterInspections();

        });

    }


    /* =====================================================
       ACTION MENUS
       ===================================================== */

    const actionButtons =
        document.querySelectorAll(".action-btn");


    actionButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const currentMenu =
                button
                    .closest(".action-wrapper")
                    ?.querySelector(".action-menu");


            /* Close other menus */

            document
                .querySelectorAll(".action-menu")
                .forEach(function (menu) {

                    if (menu !== currentMenu) {
                        menu.classList.remove("show");
                    }

                });


            if (currentMenu) {

                currentMenu.classList.toggle("show");

            }

        });

    });


    /* CLOSE ACTION MENUS */

    document.addEventListener("click", function () {

        document
            .querySelectorAll(".action-menu")
            .forEach(function (menu) {

                menu.classList.remove("show");

            });

    });


    /* =====================================================
       VIEW BUTTON
       ===================================================== */

    document.querySelectorAll(".view-btn").forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const row =
                button.closest("tr");

            if (!row) return;

            const id =
                row.querySelector(".inspection-id")?.textContent.trim();

            const institution =
                row.querySelector(".institution-cell strong")?.textContent.trim();

            alert(
                `Inspection Details\n\n` +
                `ID: ${id}\n` +
                `Institution: ${institution}`
            );

        });

    });


    /* =====================================================
       EDIT BUTTON
       ===================================================== */

    document.querySelectorAll(".edit-btn").forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const row =
                button.closest("tr");

            if (!row) return;

            const id =
                row.querySelector(".inspection-id")?.textContent.trim();

            alert(
                `Edit Inspection\n\nInspection ${id} can be edited here.`
            );

        });

    });


    /* =====================================================
       DELETE BUTTON
       ===================================================== */

    document.querySelectorAll(".delete-btn").forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const row =
                button.closest("tr");

            if (!row) return;

            const id =
                row.querySelector(".inspection-id")?.textContent.trim();


            const confirmed =
                confirm(
                    `Delete inspection ${id}?`
                );


            if (confirmed) {

                row.remove();

                filterInspections();

                updateStats();

            }

        });

    });


    /* =====================================================
       GENERATE SURPRISE INSPECTION
       ===================================================== */

    const generateBtn =
        document.getElementById("generateBtn");


    if (generateBtn) {

        generateBtn.addEventListener("click", function () {

            alert(
                "Surprise Inspection\n\n" +
                "The surprise inspection generator will be connected to the backend here."
            );

        });

    }


    /* =====================================================
       UPDATE STATISTICS
       ===================================================== */

    function updateStats() {

        const rows =
            inspectionBody
                ? inspectionBody.querySelectorAll("tr")
                : [];


        let completed = 0;
        let progress = 0;
        let pending = 0;


        rows.forEach(function (row) {

            const status =
                row.dataset.status;


            if (status === "completed") {
                completed++;
            }

            if (status === "progress") {
                progress++;
            }

            if (status === "pending") {
                pending++;
            }

        });


        const total =
            rows.length;


        const totalCount =
            document.getElementById("totalCount");

        const completedCount =
            document.getElementById("completedCount");

        const progressCount =
            document.getElementById("progressCount");

        const pendingCount =
            document.getElementById("pendingCount");


        if (totalCount) {
            totalCount.textContent = total;
        }

        if (completedCount) {
            completedCount.textContent = completed;
        }

        if (progressCount) {
            progressCount.textContent = progress;
        }

        if (pendingCount) {
            pendingCount.textContent = pending;
        }


        /* Update tab numbers */

        tabs.forEach(function (tab) {

            const filter =
                tab.dataset.filter;

            const countElement =
                tab.querySelector("span");

            if (!countElement) return;


            if (filter === "all") {

                countElement.textContent = total;

            } else {

                let count = 0;

                rows.forEach(function (row) {

                    if (row.dataset.status === filter) {
                        count++;
                    }

                });

                countElement.textContent = count;

            }

        });

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    filterInspections();

    updateStats();

});