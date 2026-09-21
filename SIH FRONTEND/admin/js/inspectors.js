/* =====================================================
   SMARTINSPECT AI - INSPECTORS PAGE JS
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


/* Close sidebar after navigation */

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
   ADD INSPECTOR MODAL
===================================================== */

const addInspectorBtn =
    document.getElementById(
        "addInspectorBtn"
    );

const inspectorModal =
    document.getElementById(
        "inspectorModal"
    );

const closeInspectorModal =
    document.getElementById(
        "closeInspectorModal"
    );


if (addInspectorBtn) {

    addInspectorBtn.addEventListener(
        "click",
        function () {

            inspectorModal.classList.add(
                "show"
            );

        }
    );

}


if (closeInspectorModal) {

    closeInspectorModal.addEventListener(
        "click",
        function () {

            inspectorModal.classList.remove(
                "show"
            );

        }
    );

}


/* Close modal by clicking outside */

if (inspectorModal) {

    inspectorModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === inspectorModal
            ) {

                inspectorModal.classList.remove(
                    "show"
                );

            }

        }
    );

}



/* =====================================================
   SAVE INSPECTOR
===================================================== */

const saveInspector =
    document.getElementById(
        "saveInspector"
    );


if (saveInspector) {

    saveInspector.addEventListener(
        "click",
        function () {


            const name =
                document.getElementById(
                    "inspectorName"
                ).value.trim();


            const id =
                document.getElementById(
                    "inspectorId"
                ).value.trim();


            const region =
                document.getElementById(
                    "inspectorRegion"
                ).value;


            const status =
                document.getElementById(
                    "inspectorStatus"
                ).value;


            /* Validation */

            if (!name) {

                alert(
                    "Please enter inspector name."
                );

                return;

            }


            if (!id) {

                alert(
                    "Please enter inspector ID."
                );

                return;

            }


            if (!region) {

                alert(
                    "Please select a region."
                );

                return;

            }


            alert(
                `Inspector added successfully!\n\nName: ${name}\nID: ${id}\nRegion: ${region}`
            );


            inspectorModal.classList.remove(
                "show"
            );


            /* Clear form */

            document.getElementById(
                "inspectorName"
            ).value = "";


            document.getElementById(
                "inspectorId"
            ).value = "";


            document.getElementById(
                "inspectorRegion"
            ).value = "";

        }
    );

}



/* =====================================================
   VIEW INSPECTOR
===================================================== */

const viewInspectorModal =
    document.getElementById(
        "viewInspectorModal"
    );


function viewInspector(
    name,
    id,
    region,
    status,
    assignments
) {


    document.getElementById(
        "viewName"
    ).textContent = name;


    document.getElementById(
        "viewId"
    ).textContent = id;


    document.getElementById(
        "viewRegion"
    ).textContent = region;


    document.getElementById(
        "viewStatus"
    ).textContent = status;


    document.getElementById(
        "viewAssignments"
    ).textContent = assignments;


    /* Initials */

    const initials =
        name
            .split(" ")
            .map(
                word => word.charAt(0)
            )
            .join("")
            .substring(0, 2)
            .toUpperCase();


    document.getElementById(
        "viewAvatar"
    ).textContent = initials;


    viewInspectorModal.classList.add(
        "show"
    );

}


function closeViewInspector() {

    viewInspectorModal.classList.remove(
        "show"
    );

}


const closeViewModal =
    document.getElementById(
        "closeViewModal"
    );


if (closeViewModal) {

    closeViewModal.addEventListener(
        "click",
        closeViewInspector
    );

}


if (viewInspectorModal) {

    viewInspectorModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                viewInspectorModal
            ) {

                closeViewInspector();

            }

        }
    );

}



/* =====================================================
   EDIT INSPECTOR
===================================================== */

function editInspector(
    name,
    id
) {

    alert(
        `Edit Inspector\n\nName: ${name}\nInspector ID: ${id}`
    );

}



/* =====================================================
   SEARCH + FILTER
===================================================== */

const inspectorSearch =
    document.getElementById(
        "inspectorSearch"
    );


const topSearch =
    document.getElementById(
        "topSearch"
    );


const inspectorsTable =
    document.getElementById(
        "inspectorsTable"
    );


const statusFilter =
    document.getElementById(
        "statusFilter"
    );


const regionFilter =
    document.getElementById(
        "regionFilter"
    );


const resultText =
    document.getElementById(
        "resultText"
    );



function filterInspectors() {


    const searchValue =
        inspectorSearch.value
            .toLowerCase()
            .trim();


    const statusValue =
        statusFilter.value;


    const regionValue =
        regionFilter.value;


    const rows =
        inspectorsTable.querySelectorAll(
            "tr"
        );


    let visible = 0;


    rows.forEach(
        function (row) {


            const text =
                row.textContent
                    .toLowerCase();


            const rowStatus =
                row.dataset.status;


            const rowRegion =
                row.dataset.region;


            const searchMatch =
                text.includes(
                    searchValue
                );


            const statusMatch =
                statusValue === "all" ||
                rowStatus === statusValue;


            const regionMatch =
                regionValue === "all" ||
                rowRegion === regionValue;


            if (
                searchMatch &&
                statusMatch &&
                regionMatch
            ) {

                row.style.display = "";

                visible++;

            } else {

                row.style.display = "none";

            }

        }
    );


    if (resultText) {

        resultText.textContent =
            `Showing ${visible} inspector${visible !== 1 ? "s" : ""}`;

    }

}


/* Search */

if (inspectorSearch) {

    inspectorSearch.addEventListener(
        "input",
        filterInspectors
    );

}


/* Status */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterInspectors
    );

}


/* Region */

if (regionFilter) {

    regionFilter.addEventListener(
        "change",
        filterInspectors
    );

}


/* Top search */

if (topSearch) {

    topSearch.addEventListener(
        "input",
        function () {

            inspectorSearch.value =
                topSearch.value;

            filterInspectors();

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

            filterInspectors();

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
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {


            closeSidebar();


            if (inspectorModal) {

                inspectorModal.classList.remove(
                    "show"
                );

            }


            if (viewInspectorModal) {

                viewInspectorModal.classList.remove(
                    "show"
                );

            }

        }

    }
);



/* =====================================================
   RESIZE
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

filterInspectors();