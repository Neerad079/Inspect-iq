/* =========================================
   SMARTINSPECT DASHBOARD JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =====================================
       SIDEBAR OPEN
    ===================================== */

    function openSidebar() {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    /* =====================================
       SIDEBAR CLOSE
    ===================================== */

    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

        document.body.style.overflow = "";
    }


    menuBtn.addEventListener("click", openSidebar);

    sidebarClose.addEventListener("click", closeSidebar);

    sidebarOverlay.addEventListener("click", closeSidebar);


    /* =====================================
       CLOSE SIDEBAR WHEN NAV ITEM CLICKED
       ON MOBILE
    ===================================== */

    document.querySelectorAll(".nav-item").forEach(item => {

        item.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                closeSidebar();

            }

        });

    });


    /* =====================================
       NOTIFICATION PANEL
    ===================================== */

    notificationBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        notificationPanel.classList.toggle("show");

    });


    closeNotifications.addEventListener("click", () => {

        notificationPanel.classList.remove("show");

    });


    document.addEventListener("click", (event) => {

        if (
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove("show");

        }

    });


    /* =====================================
       QUICK PAGE NAVIGATION
    ===================================== */

    window.openPage = function(page) {

        window.location.href = page;

    };


    /* =====================================
       LOGOUT
    ===================================== */

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;


        /*
            If you are using localStorage for
            inspector authentication, remove it here.
        */

        localStorage.removeItem("inspectorLoggedIn");
        localStorage.removeItem("inspectorData");


        window.location.href = "inspector-login.html";

    });


    /* =====================================
       PROFILE CLICK
    ===================================== */

    const profile =
        document.querySelector(".profile-mini");

    profile.addEventListener("click", () => {

        window.location.href = "profile.html";

    });


    /* =====================================
       RESPONSIVE SIDEBAR RESET
    ===================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeSidebar();

        }

    });


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();

    document.querySelectorAll(".nav-item").forEach(item => {

        const linkPage =
            item.getAttribute("href");

        if (linkPage === currentPage) {

            document.querySelectorAll(".nav-item")
                .forEach(nav => nav.classList.remove("active"));

            item.classList.add("active");

        }

    });


    /* =====================================
       WELCOME DATE
       Automatically uses current date
    ===================================== */

    const dateElement =
        document.querySelector(".date-box strong");

    if (dateElement) {

        const today = new Date();

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric"
        };

        dateElement.textContent =
            today.toLocaleDateString(
                "en-GB",
                options
            );

    }


    const dayElement =
        document.querySelector(".date-box span");

    if (dayElement) {

        const today = new Date();

        dayElement.textContent =
            today.toLocaleDateString(
                "en-US",
                {
                    weekday: "long"
                }
            );

    }

});