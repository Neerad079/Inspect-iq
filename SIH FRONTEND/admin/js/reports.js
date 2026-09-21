/* =====================================================
   SMARTINSPECT AI - REPORTS PAGE JS
===================================================== */


/* =====================================================
   SIDEBAR
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const closeSidebarBtn =
    document.getElementById("closeSidebar");


function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}


/* Hamburger */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            if (
                sidebar.classList.contains("open")
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );

}


/* Close button */

if (closeSidebarBtn) {

    closeSidebarBtn.addEventListener(
        "click",
        closeSidebar
    );

}


/* Overlay */

if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* Close after navigation */

document
    .querySelectorAll(".nav-item")
    .forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 700
                ) {

                    closeSidebar();

                }

            }
        );

    });



/* =====================================================
   GENERATE REPORT MODAL
===================================================== */

const generateReportBtn =
    document.getElementById(
        "generateReportBtn"
    );

const reportModal =
    document.getElementById(
        "reportModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


if (generateReportBtn) {

    generateReportBtn.addEventListener(
        "click",
        function () {

            reportModal.classList.add("show");

        }
    );

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            reportModal.classList.remove("show");

        }
    );

}


/* Click outside */

if (reportModal) {

    reportModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === reportModal
            ) {

                reportModal.classList.remove(
                    "show"
                );

            }

        }
    );

}



/* =====================================================
   CREATE REPORT
===================================================== */

const createReport =
    document.getElementById(
        "createReport"
    );

const institutionSelect =
    document.getElementById(
        "institutionSelect"
    );


if (createReport) {

    createReport.addEventListener(
        "click",
        function () {

            const institution =
                institutionSelect.value;


            if (!institution) {

                alert(
                    "Please select an institution."
                );

                return;
            }


            const reportType =
                document.getElementById(
                    "reportType"
                ).value;


            alert(
                `Report generated successfully for ${institution}.\n\nType: ${reportType}`
            );


            reportModal.classList.remove(
                "show"
            );

        }
    );

}



/* =====================================================
   VIEW REPORT
===================================================== */

const viewModal =
    document.getElementById(
        "viewModal"
    );

const viewInstitution =
    document.getElementById(
        "viewInstitution"
    );


function viewReport(institution) {

    viewInstitution.textContent =
        institution + " Report";

    viewModal.classList.add("show");

}


function closeViewModal() {

    viewModal.classList.remove(
        "show"
    );

}


if (viewModal) {

    viewModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === viewModal
            ) {

                closeViewModal();

            }

        }
    );

}



/* =====================================================
   SEARCH + FILTER
===================================================== */

const reportSearch =
    document.getElementById(
        "reportSearch"
    );

const topSearch =
    document.getElementById(
        "topSearch"
    );

const reportsTable =
    document.getElementById(
        "reportsTable"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const monthFilter =
    document.getElementById(
        "monthFilter"
    );

const resultText =
    document.getElementById(
        "resultText"
    );


function filterReports() {

    const searchValue =
        reportSearch.value
            .toLowerCase()
            .trim();


    const statusValue =
        statusFilter.value;


    const monthValue =
        monthFilter.value;


    const rows =
        reportsTable.querySelectorAll(
            "tr"
        );


    let visible = 0;


    rows.forEach(function (row) {


        const rowText =
            row.textContent
                .toLowerCase();


        const rowStatus =
            row.dataset.status;


        const rowMonth =
            row.dataset.month;


        const searchMatch =
            rowText.includes(
                searchValue
            );


        const statusMatch =
            statusValue === "all" ||
            rowStatus === statusValue;


        const monthMatch =
            monthValue === "all" ||
            rowMonth === monthValue;


        if (
            searchMatch &&
            statusMatch &&
            monthMatch
        ) {

            row.style.display = "";

            visible++;

        } else {

            row.style.display = "none";

        }

    });


    if (resultText) {

        resultText.textContent =
            `Showing ${visible} report${visible !== 1 ? "s" : ""}`;

    }

}


/* Search */

if (reportSearch) {

    reportSearch.addEventListener(
        "input",
        filterReports
    );

}


/* Status */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterReports
    );

}


/* Month */

if (monthFilter) {

    monthFilter.addEventListener(
        "change",
        filterReports
    );

}


/* Top search */

if (topSearch) {

    topSearch.addEventListener(
        "input",
        function () {

            reportSearch.value =
                topSearch.value;

            filterReports();

        }
    );

}



/* =====================================================
   FILTER BUTTON
===================================================== */

const filterBtn =
    document.getElementById(
        "filterBtn"
    );


if (filterBtn) {

    filterBtn.addEventListener(
        "click",
        function () {

            filterReports();

        }
    );

}



/* =====================================================
   PAGINATION
===================================================== */

const paginationButtons =
    document.querySelectorAll(
        ".pagination button"
    );


paginationButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    button.classList.contains(
                        "prev-page"
                    ) ||
                    button.classList.contains(
                        "next-page"
                    )
                ) {

                    return;

                }


                paginationButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "page-active"
                        );

                    }
                );


                button.classList.add(
                    "page-active"
                );

            }
        );

    }
);



/* =====================================================
   NAVIGATION ACTIVE STATE
===================================================== */

document
    .querySelectorAll(".nav-item")
    .forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".nav-item"
                    )
                    .forEach(
                        function (nav) {

                            nav.classList.remove(
                                "active"
                            );

                        }
                    );


                this.classList.add(
                    "active"
                );

            }
        );

    });



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeSidebar();


            if (reportModal) {

                reportModal.classList.remove(
                    "show"
                );

            }


            if (viewModal) {

                viewModal.classList.remove(
                    "show"
                );

            }

        }

    }
);



/* =====================================================
   WINDOW RESIZE
===================================================== */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 700
        ) {

            closeSidebar();

        }

    }
);


/* =====================================================
   INITIAL FILTER
===================================================== */

filterReports();