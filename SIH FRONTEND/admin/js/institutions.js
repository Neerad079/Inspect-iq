/* =========================================================
   SMARTINSPECT AI
   INSTITUTIONS PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   DEFAULT INSTITUTIONS
   ========================================================= */

const defaultInstitutions = [

    {
        id: 1,
        name: "ABC College",
        city: "Jaipur",
        state: "Rajasthan",
        attendance: 91,
        lastInspection: "12 Sep 2026",
        status: "normal",
        risk: "low",
        image:
            "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 2,
        name: "XYZ Institute",
        city: "Ajmer",
        state: "Rajasthan",
        attendance: 67,
        lastInspection: "05 Sep 2026",
        status: "attention",
        risk: "high",
        image:
            "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 3,
        name: "LMN School",
        city: "Udaipur",
        state: "Rajasthan",
        attendance: 78,
        lastInspection: "20 Aug 2026",
        status: "normal",
        risk: "medium",
        image:
            "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 4,
        name: "PQR College",
        city: "Kota",
        state: "Rajasthan",
        attendance: 85,
        lastInspection: "18 Aug 2026",
        status: "normal",
        risk: "low",
        image:
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 5,
        name: "STU Institute",
        city: "Bikaner",
        state: "Rajasthan",
        attendance: 62,
        lastInspection: "11 Aug 2026",
        status: "attention",
        risk: "high",
        image:
            "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 6,
        name: "VWX School",
        city: "Jodhpur",
        state: "Rajasthan",
        attendance: 88,
        lastInspection: "02 Sep 2026",
        status: "normal",
        risk: "low",
        image:
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
    }

];


/* =========================================================
   GET ELEMENTS
   ========================================================= */

const institutionGrid =
    document.getElementById("institutionGrid");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const riskFilter =
    document.getElementById("riskFilter");

const modal =
    document.getElementById("institutionModal");

const openModalBtn =
    document.getElementById("openModalBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const institutionForm =
    document.getElementById("institutionForm");

const imageInput =
    document.getElementById("institutionImage");

const imagePreview =
    document.getElementById("imagePreview");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const closeSidebarBtn =
    document.getElementById("closeSidebarBtn");


/* =========================================================
   LOAD INSTITUTIONS
   ========================================================= */

let institutions =
    JSON.parse(
        localStorage.getItem("smartInspectInstitutions")
    );


if (!institutions || !Array.isArray(institutions)) {

    institutions = defaultInstitutions;

    saveInstitutions();

}


/* =========================================================
   SAVE TO LOCAL STORAGE
   ========================================================= */

function saveInstitutions() {

    localStorage.setItem(
        "smartInspectInstitutions",
        JSON.stringify(institutions)
    );

}


/* =========================================================
   RENDER INSTITUTIONS
   ========================================================= */

function renderInstitutions() {

    if (!institutionGrid || !searchInput) {
        return;
    }

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        statusFilter ? statusFilter.value : "all";

    const selectedRisk =
        riskFilter ? riskFilter.value : "all";


    /* FILTER DATA */

    const filteredInstitutions =
        institutions.filter(institution => {

            const matchesSearch =
                institution.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                institution.city
                    .toLowerCase()
                    .includes(searchValue)

                ||

                institution.state
                    .toLowerCase()
                    .includes(searchValue);


            const matchesStatus =
                selectedStatus === "all"
                ||
                institution.status === selectedStatus;


            const matchesRisk =
                selectedRisk === "all"
                ||
                institution.risk === selectedRisk;


            return (
                matchesSearch
                &&
                matchesStatus
                &&
                matchesRisk
            );

        });


    /* CLEAR OLD CARDS */

    institutionGrid.innerHTML = "";


    /* EMPTY STATE */

    if (filteredInstitutions.length === 0) {

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;

    }


    if (emptyState) {
        emptyState.style.display = "none";
    }


    /* CREATE CARDS */

    filteredInstitutions.forEach(
        institution => {

            const card =
                createInstitutionCard(
                    institution
                );

            institutionGrid.appendChild(card);

        }
    );

}


/* =========================================================
   CREATE INSTITUTION CARD
   ========================================================= */

function createInstitutionCard(institution) {

    const card =
        document.createElement("article");

    card.className =
        "institution-card";


    /* STATUS */

    const statusText =
        institution.status === "normal"
            ? "Normal"
            : "Attention";


    const statusClass =
        institution.status === "normal"
            ? "status-normal"
            : "status-attention";


    /* RISK */

    let riskText;

    if (institution.risk === "low") {

        riskText = "Low Risk";

    }

    else if (institution.risk === "medium") {

        riskText = "Medium Risk";

    }

    else {

        riskText = "High Risk";

    }


    const riskClass =
        `risk-${institution.risk}`;


    /* CARD */

    card.innerHTML = `

        <div class="card-image">

            <img
                src="${institution.image}"
                alt="${escapeHTML(institution.name)}"
                onerror="
                    this.src='https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80'
                "
            >

        </div>


        <div class="card-content">

            <h2 class="card-title">

                ${escapeHTML(institution.name)}

            </h2>


            <p class="card-location">

                ${escapeHTML(institution.city)},
                ${escapeHTML(institution.state)}

            </p>


            <div class="card-stats">

                <div>

                    <span class="stat-label">
                        Attendance
                    </span>

                    <strong class="stat-value">
                        ${institution.attendance}%
                    </strong>

                </div>


                <div>

                    <span class="stat-label">
                        Last Inspection
                    </span>

                    <strong class="stat-value">
                        ${institution.lastInspection}
                    </strong>

                </div>

            </div>


            <div class="card-badges">

                <div class="badge ${statusClass}">
                    ${statusText}
                </div>


                <div class="badge ${riskClass}">
                    ${riskText}
                </div>

            </div>


            <button
                class="details-btn"
                type="button"
                onclick="viewDetails(${institution.id})"
            >

                <span>
                    View Details
                </span>

                <span class="details-arrow">
                    →
                </span>

            </button>

        </div>

    `;


    return card;

}


/* =========================================================
   VIEW DETAILS
   SAME PAGE DASHBOARD
   ========================================================= */

function viewDetails(id) {

    const institution =
        institutions.find(
            item => item.id === id
        );


    if (!institution) {
        return;
    }


    const details =
        document.getElementById(
            "institutionDetails"
        );


    if (!details) {

        console.error(
            "Institution details section not found."
        );

        return;

    }


    /*
       HIDE INSTITUTIONS PAGE CONTENT

       Sidebar remains untouched.
       Search remains untouched.
       Filters remain untouched.
       Add Institution functionality remains untouched.
    */

    const topBar =
        document.querySelector(".top-bar");

    const pageHeader =
        document.querySelector(".page-header");

    const grid =
        document.getElementById(
            "institutionGrid"
        );

    const emptyStateElement =
        document.getElementById(
            "emptyState"
        );

    const pagination =
        document.querySelector(".pagination");


    if (topBar) {
        topBar.style.display = "none";
    }

    if (pageHeader) {
        pageHeader.style.display = "none";
    }

    if (grid) {
        grid.style.display = "none";
    }

    if (emptyStateElement) {
        emptyStateElement.style.display = "none";
    }

    if (pagination) {
        pagination.style.display = "none";
    }


    /* =====================================================
       UPDATE INSTITUTION HEADER
    ===================================================== */

    setDetailText(
        "detailBreadcrumb",
        institution.name
    );


    setDetailText(
        "detailCollegeName",
        institution.name
    );


    setDetailText(
        "detailLocation",
        `${institution.city}, ${institution.state}`
    );


    setDetailText(
        "detailAttendance",
        `${institution.attendance}%`
    );


    setDetailText(
        "detailMapName",
        institution.name
    );


    /* =====================================================
       EXTRA INSTITUTION INFORMATION
    ===================================================== */

    const principalById = {

        1: "Dr. Rajnish Sharma",
        2: "Dr. Amit Sharma",
        3: "Dr. Neha Verma",
        4: "Dr. Rajesh Gupta",
        5: "Dr. Priya Sharma",
        6: "Dr. Arun Mehta"

    };


    const establishedById = {

        1: "2005",
        2: "1998",
        3: "2010",
        4: "2008",
        5: "2012",
        6: "2003"

    };


    const studentsById = {

        1: "1,300",
        2: "4,200",
        3: "950",
        4: "2,100",
        5: "1,100",
        6: "1,750"

    };


    const staffById = {

        1: "60",
        2: "180",
        3: "42",
        4: "95",
        5: "55",
        6: "78"

    };


    const emailName =
        institution.name
            .toLowerCase()
            .replace(
                /[^a-z0-9]+/g,
                ""
            )
            .slice(0, 24);


    setDetailText(
        "detailPrincipal",
        principalById[institution.id]
        ||
        "Institution Principal"
    );


    setDetailText(
        "detailEstablished",
        establishedById[institution.id]
        ||
        "2005"
    );


    setDetailText(
        "detailStudents",
        studentsById[institution.id]
        ||
        "1,300"
    );


    setDetailText(
        "detailStaff",
        staffById[institution.id]
        ||
        "60"
    );


    setDetailText(
        "detailContact",
        `${emailName}@institution.edu.in`
    );


    /* =====================================================
       UPDATE IMAGE
    ===================================================== */

    const image =
        document.getElementById(
            "detailCollegeImage"
        );


    if (image) {

        image.src =
            institution.image;

        image.alt =
            institution.name;


        image.onerror =
            function () {

                this.src =
                    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80";

            };

    }


    /* =====================================================
       SHOW DETAILS
    ===================================================== */

    details.classList.add("show");

    details.setAttribute(
        "aria-hidden",
        "false"
    );


    /* =====================================================
       RESET ACTIVE TAB
    ===================================================== */

    document
        .querySelectorAll(".detail-tab")
        .forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.tab === "overview"
            );

        });


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   HELPER - SET DETAIL TEXT
   ========================================================= */

function setDetailText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   CLOSE INSTITUTION DETAILS
   ========================================================= */

function closeInstitutionDetails() {

    const details =
        document.getElementById(
            "institutionDetails"
        );


    if (!details) {
        return;
    }


    details.classList.remove(
        "show"
    );


    details.setAttribute(
        "aria-hidden",
        "true"
    );


    /* SHOW ORIGINAL CONTENT */

    const topBar =
        document.querySelector(".top-bar");

    const pageHeader =
        document.querySelector(".page-header");

    const grid =
        document.getElementById(
            "institutionGrid"
        );

    const emptyStateElement =
        document.getElementById(
            "emptyState"
        );

    const pagination =
        document.querySelector(".pagination");


    if (topBar) {
        topBar.style.display = "";
    }


    if (pageHeader) {
        pageHeader.style.display = "";
    }


    if (grid) {
        grid.style.display = "";
    }


    if (emptyStateElement) {
        emptyStateElement.style.display = "";
    }


    if (pagination) {
        pagination.style.display = "";
    }


    /* RE-RENDER CURRENT FILTERED LIST */

    renderInstitutions();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   DETAIL PAGE EVENTS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* BACK BUTTON */

        const backButton =
            document.getElementById(
                "backToInstitutions"
            );


        if (backButton) {

            backButton.addEventListener(
                "click",
                closeInstitutionDetails
            );

        }


        /* =================================================
           DETAIL TABS
        ================================================= */

        document
            .querySelectorAll(".detail-tab")
            .forEach(tab => {


                tab.addEventListener(
                    "click",
                    function () {


                        document
                            .querySelectorAll(
                                ".detail-tab"
                            )
                            .forEach(item => {

                                item.classList.remove(
                                    "active"
                                );

                            });


                        this.classList.add(
                            "active"
                        );


                        /*
                           At this stage tabs change
                           the active visual state.

                           Later these can be connected
                           to backend/API data.
                        */

                        console.log(
                            "Institution detail tab:",
                            this.dataset.tab
                        );

                    }
                );

            });

    }
);


/* =========================================================
   OPEN MODAL
   ========================================================= */

function openModal() {

    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        () => {

            const nameInput =
                document.getElementById(
                    "institutionName"
                );


            if (nameInput) {

                nameInput.focus();

            }

        },
        200
    );

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";


    if (institutionForm) {

        institutionForm.reset();

    }


    resetImagePreview();

}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

if (openModalBtn) {

    openModalBtn.addEventListener(
        "click",
        openModal
    );

}


if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        closeModal
    );

}


if (cancelBtn) {

    cancelBtn.addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

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


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {


        /* CLOSE MODAL */

        if (
            event.key === "Escape"
            &&
            modal
            &&
            modal.classList.contains("show")
        ) {

            closeModal();

            return;

        }


        /* CLOSE INSTITUTION DETAILS */

        if (
            event.key === "Escape"
            &&
            document
                .getElementById(
                    "institutionDetails"
                )
                ?.classList.contains(
                    "show"
                )
        ) {

            closeInstitutionDetails();

        }

    }
);


/* =========================================================
   IMAGE UPLOAD PREVIEW
   ========================================================= */

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {


            const file =
                this.files[0];


            if (!file) {

                resetImagePreview();

                return;

            }


            /* CHECK FILE TYPE */

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select a valid image."
                );


                this.value = "";

                resetImagePreview();

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {


                    if (!imagePreview) {
                        return;
                    }


                    imagePreview.innerHTML = `

                        <img
                            src="${event.target.result}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                        >

                    `;

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   RESET IMAGE
   ========================================================= */

function resetImagePreview() {

    if (!imagePreview) {
        return;
    }


    imagePreview.innerHTML = `

        <span>+</span>

        <small>
            Upload
        </small>

    `;

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

if (institutionForm) {

    institutionForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            /* GET VALUES */

            const name =
                document
                    .getElementById(
                        "institutionName"
                    )
                    .value
                    .trim();


            const city =
                document
                    .getElementById(
                        "institutionCity"
                    )
                    .value
                    .trim();


            const state =
                document
                    .getElementById(
                        "institutionState"
                    )
                    .value
                    .trim();


            const attendance =
                Number(
                    document
                        .getElementById(
                            "attendance"
                        )
                        .value
                );


            const status =
                document
                    .getElementById(
                        "institutionStatus"
                    )
                    .value;


            const risk =
                document
                    .getElementById(
                        "institutionRisk"
                    )
                    .value;


            const dateValue =
                document
                    .getElementById(
                        "inspectionDate"
                    )
                    .value;


            /* VALIDATION */

            if (
                !name ||
                !city ||
                !state ||
                isNaN(attendance) ||
                !dateValue
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            if (
                attendance < 0 ||
                attendance > 100
            ) {

                alert(
                    "Attendance must be between 0 and 100."
                );

                return;

            }


            /* CONVERT DATE */

            const formattedDate =
                formatDate(
                    dateValue
                );


            /* DEFAULT IMAGE */

            let image =
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80";


            /* IMAGE SELECTED */

            if (
                imageInput &&
                imageInput.files[0]
            ) {


                const file =
                    imageInput.files[0];


                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        image =
                            e.target.result;


                        createNewInstitution(

                            name,
                            city,
                            state,
                            attendance,
                            status,
                            risk,
                            formattedDate,
                            image

                        );

                    };


                reader.readAsDataURL(
                    file
                );

            }

            else {

                createNewInstitution(

                    name,
                    city,
                    state,
                    attendance,
                    status,
                    risk,
                    formattedDate,
                    image

                );

            }

        }
    );

}


/* =========================================================
   CREATE NEW INSTITUTION
   ========================================================= */

function createNewInstitution(

    name,
    city,
    state,
    attendance,
    status,
    risk,
    formattedDate,
    image

) {


    const newInstitution = {

        id:
            Date.now(),

        name:
            name,

        city:
            city,

        state:
            state,

        attendance:
            attendance,

        lastInspection:
            formattedDate,

        status:
            status,

        risk:
            risk,

        image:
            image

    };


    /* ADD TO ARRAY */

    institutions.unshift(
        newInstitution
    );


    /* SAVE */

    saveInstitutions();


    /* REFRESH */

    renderInstitutions();


    /* CLOSE MODAL */

    closeModal();


    /* SUCCESS */

    showSuccessMessage(
        `${name} added successfully`
    );

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(
    dateString
) {

    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    const months = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"

    ];


    return (

        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        )

        +

        " "

        +

        months[
            date.getMonth()
        ]

        +

        " "

        +

        date.getFullYear()

    );

}


/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderInstitutions
    );

}


/* =========================================================
   FILTERS
   ========================================================= */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        renderInstitutions
    );

}


if (riskFilter) {

    riskFilter.addEventListener(
        "change",
        renderInstitutions
    );

}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */


/* OPEN SIDEBAR */

if (
    menuBtn &&
    sidebar
) {

    menuBtn.addEventListener(
        "click",
        function () {

            sidebar.classList.add(
                "open"
            );

        }
    );

}


/* CLOSE SIDEBAR */

if (
    closeSidebarBtn &&
    sidebar
) {

    closeSidebarBtn.addEventListener(
        "click",
        function () {

            sidebar.classList.remove(
                "open"
            );

        }
    );

}


/* =========================================================
   CLICK OUTSIDE SIDEBAR
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {


        if (
            !sidebar ||
            !sidebar.classList.contains(
                "open"
            )
        ) {

            return;

        }


        const clickedInsideSidebar =
            sidebar.contains(
                event.target
            );


        const clickedMenu =
            menuBtn &&
            menuBtn.contains(
                event.target
            );


        if (
            !clickedInsideSidebar &&
            !clickedMenu
        ) {

            sidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* =========================================================
   SUCCESS MESSAGE
   ========================================================= */

function showSuccessMessage(
    message
) {

    const toast =
        document.createElement(
            "div"
        );


    toast.innerHTML = `

        <span style="
            font-size:18px;
            color:#79ff38;
        ">
            ✓
        </span>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    toast.style.position =
        "fixed";

    toast.style.right =
        "25px";

    toast.style.bottom =
        "25px";

    toast.style.zIndex =
        "2000";

    toast.style.background =
        "#14221a";

    toast.style.border =
        "1px solid rgba(121,255,56,0.3)";

    toast.style.color =
        "#dce7df";

    toast.style.padding =
        "14px 18px";

    toast.style.borderRadius =
        "10px";

    toast.style.display =
        "flex";

    toast.style.alignItems =
        "center";

    toast.style.gap =
        "10px";

    toast.style.fontSize =
        "13px";

    toast.style.fontWeight =
        "700";

    toast.style.boxShadow =
        "0 15px 40px rgba(0,0,0,0.4)";


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateY(10px)";

            toast.style.transition =
                "0.3s";


            setTimeout(
                () => toast.remove(),
                300
            );

        },
        2500
    );

}


/* =========================================================
   INITIAL RENDER
   ========================================================= */

renderInstitutions();