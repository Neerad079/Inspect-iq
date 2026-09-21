/* =====================================================
   SMARTINSPECT - MY ASSIGNMENTS JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const assignmentView =
        document.getElementById("assignmentView");

    const institutionDetailsView =
        document.getElementById("institutionDetailsView");

    const locationView =
        document.getElementById("locationView");

    const backToAssignments =
        document.getElementById("backToAssignments");

    const backToDetails =
        document.getElementById("backToDetails");

    const viewMapBtn =
        document.getElementById("viewMapBtn");

    const verifyLocationBtn =
        document.getElementById("verifyLocationBtn");

    const refreshLocation =
        document.getElementById("refreshLocation");

    const continueInspection =
        document.getElementById("continueInspection");

    const searchInput =
        document.getElementById("searchInput");

    const locationFilter =
        document.getElementById("locationFilter");

    const dateFilter =
        document.getElementById("dateFilter");

    const mobileAssignmentList =
        document.getElementById("mobileAssignmentList");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =================================================
       INSTITUTION DATA
    ================================================= */

    const institutions = {

        abc: {

            name: "ABC Rehabilitation Centre",

            location: "Srinagar, J&K",

            address: "Lal Chowk, Srinagar, J&K",

            contact: "Mr. Adil Khan",

            phone: "+91 98765 43210",

            scheme: "XYZ Government Scheme",

            beneficiaries: "120",

            lastInspection: "14 Aug 2026",

            status: "Compliant",

            risk: "60 / 100",

            priority: "High",

            type: "Surprise Inspection",

            latitude: 34.0837,

            longitude: 74.7973

        },


        xyz: {

            name: "XYZ Care Home",

            location: "Budgam, J&K",

            address: "Main Road, Budgam, J&K",

            contact: "Ms. Sana Khan",

            phone: "+91 98765 12345",

            scheme: "Social Welfare Scheme",

            beneficiaries: "95",

            lastInspection: "10 Aug 2026",

            status: "Compliant",

            risk: "35 / 100",

            priority: "Medium",

            type: "Routine Inspection",

            latitude: 34.0167,

            longitude: 74.7333

        },


        pqr: {

            name: "PQR NGO",

            location: "Anantnag, J&K",

            address: "KP Road, Anantnag, J&K",

            contact: "Mr. Imran",

            phone: "+91 98765 77889",

            scheme: "Community Support Scheme",

            beneficiaries: "80",

            lastInspection: "8 Aug 2026",

            status: "Compliant",

            risk: "28 / 100",

            priority: "Low",

            type: "Routine Inspection",

            latitude: 33.7310,

            longitude: 75.1482

        },


        hope: {

            name: "Hope Foundation",

            location: "Baramulla, J&K",

            address: "Main Market, Baramulla, J&K",

            contact: "Mr. Arif",

            phone: "+91 98765 33221",

            scheme: "XYZ Government Scheme",

            beneficiaries: "145",

            lastInspection: "5 Aug 2026",

            status: "Needs Attention",

            risk: "72 / 100",

            priority: "High",

            type: "Surprise Inspection",

            latitude: 34.2090,

            longitude: 74.3428

        },


        umeed: {

            name: "Umeed Centre",

            location: "Pulwama, J&K",

            address: "Town Centre, Pulwama, J&K",

            contact: "Ms. Ayesha",

            phone: "+91 98765 99881",

            scheme: "Community Welfare Scheme",

            beneficiaries: "110",

            lastInspection: "2 Aug 2026",

            status: "Compliant",

            risk: "41 / 100",

            priority: "Medium",

            type: "Routine Inspection",

            latitude: 33.8741,

            longitude: 74.8997

        }

    };


    /* =================================================
       SIDEBAR
    ================================================= */

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


    menuBtn.addEventListener(
        "click",
        openSidebar
    );


    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );


    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );


    document.querySelectorAll(".nav-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    if (window.innerWidth <= 768) {
                        closeSidebar();
                    }

                }
            );

        });


    /* =================================================
       VIEW MANAGEMENT
    ================================================= */

    function showAssignmentPage() {

        assignmentView.style.display = "block";

        institutionDetailsView.classList.remove("active");

        locationView.classList.remove("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function showInstitutionDetails(id) {

        const data =
            institutions[id];

        if (!data) return;


        /* Fill details */

        document.getElementById(
            "detailInstitutionName"
        ).textContent = data.name;


        document.getElementById(
            "detailLocation"
        ).textContent = data.location;


        document.getElementById(
            "infoName"
        ).textContent = data.name;


        document.getElementById(
            "infoAddress"
        ).textContent = data.address;


        /* Save current institution */

        sessionStorage.setItem(
            "selectedInstitution",
            id
        );


        /* Hide assignment */

        assignmentView.style.display = "none";


        /* Show details */

        institutionDetailsView.classList.add(
            "active"
        );

        locationView.classList.remove(
            "active"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function showLocationPage() {

        assignmentView.style.display = "none";

        institutionDetailsView.classList.remove(
            "active"
        );

        locationView.classList.add(
            "active"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        verifyCurrentLocation();

    }


    /* =================================================
       VIEW BUTTONS
    ================================================= */

    document.querySelectorAll(".view-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    showInstitutionDetails(id);

                }
            );

        });


    /* =================================================
       BACK TO ASSIGNMENTS
    ================================================= */

    backToAssignments.addEventListener(
        "click",
        showAssignmentPage
    );


    /* =================================================
       VIEW ON MAP
    ================================================= */

    viewMapBtn.addEventListener(
        "click",
        showLocationPage
    );


    /* =================================================
       VERIFY LOCATION BUTTON
    ================================================= */

    verifyLocationBtn.addEventListener(
        "click",
        showLocationPage
    );


    /* =================================================
       BACK FROM LOCATION
    ================================================= */

    backToDetails.addEventListener(
        "click",
        () => {

            assignmentView.style.display =
                "none";

            locationView.classList.remove(
                "active"
            );

            institutionDetailsView.classList.add(
                "active"
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =================================================
       FILTER TABS
    ================================================= */

    const filterTabs =
        document.querySelectorAll(".filter-tab");


    filterTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                filterTabs.forEach(
                    t => t.classList.remove("active")
                );

                tab.classList.add("active");

                const filter =
                    tab.dataset.filter;

                filterAssignments(filter);

            }
        );

    });


    function filterAssignments(
        selectedFilter = "all"
    ) {

        const rows =
            document.querySelectorAll(
                "#assignmentTableBody tr"
            );


        rows.forEach(row => {

            const status =
                row.dataset.status;

            const priority =
                row.dataset.priority;


            let visible = true;


            if (
                selectedFilter !== "all"
            ) {

                if (
                    selectedFilter === "high"
                ) {

                    visible =
                        priority === "high";

                } else {

                    visible =
                        status === selectedFilter;

                }

            }


            row.style.display =
                visible ? "" : "none";

        });


        updateMobileCards(
            selectedFilter
        );

    }


    /* =================================================
       SEARCH
    ================================================= */

    searchInput.addEventListener(
        "input",
        applyAllFilters
    );


    locationFilter.addEventListener(
        "change",
        applyAllFilters
    );


    dateFilter.addEventListener(
        "change",
        applyAllFilters
    );


    function applyAllFilters() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const location =
            locationFilter.value;


        const date =
            dateFilter.value;


        const activeTab =
            document.querySelector(
                ".filter-tab.active"
            );


        const statusFilter =
            activeTab.dataset.filter;


        const rows =
            document.querySelectorAll(
                "#assignmentTableBody tr"
            );


        rows.forEach(row => {

            const rowText =
                row.textContent.toLowerCase();

            const rowLocation =
                row.dataset.location;

            const rowDate =
                row.dataset.date;

            const rowStatus =
                row.dataset.status;

            const rowPriority =
                row.dataset.priority;


            let visible = true;


            /* Search */

            if (
                search &&
                !rowText.includes(search)
            ) {

                visible = false;

            }


            /* Location */

            if (
                location !== "all" &&
                rowLocation !== location
            ) {

                visible = false;

            }


            /* Date */

            if (
                date !== "all" &&
                rowDate !== date
            ) {

                visible = false;

            }


            /* Status */

            if (
                statusFilter !== "all"
            ) {

                if (
                    statusFilter === "high"
                ) {

                    if (
                        rowPriority !== "high"
                    ) {
                        visible = false;
                    }

                } else if (
                    rowStatus !== statusFilter
                ) {

                    visible = false;

                }

            }


            row.style.display =
                visible ? "" : "none";

        });

    }


    /* =================================================
       MOBILE CARDS
    ================================================= */

    function updateMobileCards(
        selectedFilter = "all"
    ) {

        mobileAssignmentList.innerHTML = "";


        const rows =
            document.querySelectorAll(
                "#assignmentTableBody tr"
            );


        rows.forEach(row => {

            const status =
                row.dataset.status;

            const priority =
                row.dataset.priority;


            let visible = true;


            if (
                selectedFilter !== "all"
            ) {

                if (
                    selectedFilter === "high"
                ) {

                    visible =
                        priority === "high";

                } else {

                    visible =
                        status === selectedFilter;

                }

            }


            if (!visible) return;


            const viewButton =
                row.querySelector(".view-btn");


            const id =
                viewButton.dataset.id;


            const data =
                institutions[id];


            if (!data) return;


            const card =
                document.createElement("div");


            card.className =
                "mobile-assignment-card";


            card.innerHTML = `

                <div class="mobile-card-top">

                    <div class="mobile-card-name">

                        <div class="institution-icon">
                            ${data.name.charAt(0)}
                        </div>

                        <div>

                            <strong>
                                ${data.name}
                            </strong>

                            <span>
                                ${data.location}
                            </span>

                        </div>

                    </div>

                    <span class="priority ${data.priority.toLowerCase()}">
                        ● ${data.priority}
                    </span>

                </div>


                <div class="mobile-card-info">

                    <div class="mobile-info-item">

                        <span>Due Date</span>

                        <strong>
                            ${row.cells[3].textContent.trim()}
                        </strong>

                    </div>


                    <div class="mobile-info-item">

                        <span>Status</span>

                        <strong>
                            ${row.cells[4].textContent.trim()}
                        </strong>

                    </div>

                </div>


                <button
                    class="mobile-view-btn"
                    data-mobile-id="${id}">

                    View Institution Details →

                </button>

            `;


            mobileAssignmentList.appendChild(
                card
            );

        });


        document
            .querySelectorAll(".mobile-view-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        showInstitutionDetails(
                            button.dataset.mobileId
                        );

                    }
                );

            });

    }


    updateMobileCards();


    /* =================================================
       GPS
    ================================================= */

    function verifyCurrentLocation() {

        const status =
            document.getElementById(
                "locationStatus"
            );

        const statusTitle =
            document.getElementById(
                "locationStatusTitle"
            );

        const statusText =
            document.getElementById(
                "locationStatusText"
            );


        if (!navigator.geolocation) {

            useDemoLocation();

            return;
        }


        navigator.geolocation.getCurrentPosition(

            position => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                const accuracy =
                    position.coords.accuracy;


                document.getElementById(
                    "latitude"
                ).textContent =
                    latitude.toFixed(4);


                document.getElementById(
                    "longitude"
                ).textContent =
                    longitude.toFixed(4);


                document.getElementById(
                    "accuracy"
                ).textContent =
                    Math.round(accuracy) +
                    " meters";


                const selected =
                    sessionStorage.getItem(
                        "selectedInstitution"
                    ) || "abc";


                const institution =
                    institutions[selected];


                const distance =
                    calculateDistance(

                        latitude,
                        longitude,

                        institution.latitude,
                        institution.longitude

                    );


                document.getElementById(
                    "distance"
                ).textContent =
                    Math.round(distance) +
                    " meters";


                /* Allowed radius = 100m */

                if (distance <= 100) {

                    status.classList.remove(
                        "error"
                    );

                    status.classList.add(
                        "success"
                    );

                    statusTitle.textContent =
                        "Location Verified";

                    statusText.textContent =
                        "You are within the permitted radius.";

                } else {

                    status.classList.remove(
                        "success"
                    );

                    status.classList.add(
                        "error"
                    );

                    statusTitle.textContent =
                        "Location Verification Failed";

                    statusText.textContent =
                        "You are outside the permitted radius.";

                }

            },

            error => {

                console.log(
                    "GPS error:",
                    error.message
                );

                useDemoLocation();

            },

            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0

            }

        );

    }


    /* =================================================
       DEMO LOCATION
    ================================================= */

    function useDemoLocation() {

        document.getElementById(
            "latitude"
        ).textContent =
            "34.0837";


        document.getElementById(
            "longitude"
        ).textContent =
            "74.7973";


        document.getElementById(
            "accuracy"
        ).textContent =
            "8 meters";


        document.getElementById(
            "distance"
        ).textContent =
            "42 meters";


        const status =
            document.getElementById(
                "locationStatus"
            );


        status.classList.remove(
            "error"
        );

        status.classList.add(
            "success"
        );


        document.getElementById(
            "locationStatusTitle"
        ).textContent =
            "Location Verified";


        document.getElementById(
            "locationStatusText"
        ).textContent =
            "You are within the permitted radius.";

    }


    /* =================================================
       HAVERSINE DISTANCE
    ================================================= */

    function calculateDistance(
        lat1,
        lon1,
        lat2,
        lon2
    ) {

        const R = 6371000;

        const dLat =
            toRadians(lat2 - lat1);

        const dLon =
            toRadians(lon2 - lon1);


        const a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +

            Math.cos(
                toRadians(lat1)
            ) *

            Math.cos(
                toRadians(lat2)
            ) *

            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);


        const c =
            2 *
            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );


        return R * c;

    }


    function toRadians(value) {

        return value *
            Math.PI /
            180;

    }


    /* =================================================
       REFRESH LOCATION
    ================================================= */

    refreshLocation.addEventListener(
        "click",
        () => {

            refreshLocation.textContent =
                "⟳ Checking...";


            setTimeout(() => {

                verifyCurrentLocation();

                refreshLocation.textContent =
                    "⟳ Refresh Location";

            }, 500);

        }
    );


    /* =================================================
       CONTINUE TO INSPECTION
    ================================================= */

    continueInspection.addEventListener(
        "click",
        () => {

            const distanceText =
                document.getElementById(
                    "distance"
                ).textContent;


            const distance =
                parseInt(
                    distanceText
                );


            if (
                !isNaN(distance) &&
                distance <= 100
            ) {

                /*
                 * For now this is a prototype.
                 * Later connect this button to:
                 *
                 * checklist.html
                 * OR
                 * inspection workflow section.
                 */

                alert(
                    "Location verified successfully.\n\nStarting inspection workflow..."
                );

                /*
                 * IMPORTANT:
                 * No new page is opened here.
                 * You can later replace the alert
                 * with your checklist div.
                 */

            } else {

                alert(
                    "Inspection cannot start.\n\nYou must be within the permitted location radius."
                );

            }

        }
    );


    /* =================================================
       OPEN EXTERNAL MAP
    ================================================= */

    document.getElementById(
        "openExternalMap"
    ).addEventListener(
        "click",
        () => {

            const selected =
                sessionStorage.getItem(
                    "selectedInstitution"
                ) || "abc";


            const data =
                institutions[selected];


            const mapURL =
                `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;


            window.open(
                mapURL,
                "_blank"
            );

        }
    );


    /* =================================================
       START INSPECTION NAV
    ================================================= */

    document.getElementById(
        "startInspectionNav"
    ).addEventListener(
        "click",
        event => {

            event.preventDefault();

            /*
             * For now, start from selected
             * assignment.
             */

            if (
                institutionDetailsView.classList.contains(
                    "active"
                )
            ) {

                showLocationPage();

            } else {

                alert(
                    "Please select an assignment first."
                );

            }

        }
    );


    /* =================================================
       LOGOUT
    ================================================= */

    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) return;


            localStorage.removeItem(
                "inspectorLoggedIn"
            );

            localStorage.removeItem(
                "inspectorData"
            );


            window.location.href =
                "login.html";

        }
    );


    /* =================================================
       RESPONSIVE RESET
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {

                closeSidebar();

            }

        }
    );

});