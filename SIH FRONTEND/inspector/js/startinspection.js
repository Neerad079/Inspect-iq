/* =========================================================
   SMARTINSPECT INSPECTION WORKFLOW
   NUMBERING: 1 → 7
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let currentStep = 1;


const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");

const sidebarClose =
    document.getElementById("sidebarClose");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const topTitle =
    document.getElementById("topTitle");


/* =========================================================
   STEP TITLES
========================================================= */

const stepTitles = {

    1:
        "Start Inspection",

    2:
        "Inspection Checklist",

    3:
        "Capture Evidence",

    4:
        "Attendance Verification",

    5:
        "AI Inspection Analysis",

    6:
        "Inspection Summary",

    7:
        "Digital Declaration"

};


/* =========================================================
   SIDEBAR
========================================================= */

function openSidebar(){

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


function closeSidebar(){

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    document.body.style.overflow =
        "";
}


menuBtn?.addEventListener(
    "click",
    openSidebar
);


sidebarClose?.addEventListener(
    "click",
    closeSidebar
);


sidebarOverlay?.addEventListener(
    "click",
    closeSidebar
);


document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Escape"){

            closeSidebar();

        }

    }
);


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            function(event){

                const href =
                    this.getAttribute("href");


                if(href === "#"){

                    event.preventDefault();

                }


                document
                    .querySelectorAll(".nav-item")
                    .forEach(nav => {

                        nav.classList.remove(
                            "active"
                        );

                    });


                this.classList.add(
                    "active"
                );


                closeSidebar();

            }
        );

    });


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    ?.addEventListener(
        "click",
        function(){

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if(confirmLogout){

                console.log(
                    "Logout requested"
                );

                /*
                    Connect your backend/logout
                    API here.

                    Example:

                    window.location.href =
                    "../login.html";
                */

            }

        }
    );


/* =========================================================
   GO TO STEP
========================================================= */

function goToStep(step){

    const target =
        document.getElementById(
            `screen${step}`
        );


    if(!target){
        return;
    }


    document
        .querySelectorAll(
            ".workflow-screen"
        )
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    target.classList.add(
        "active-screen"
    );


    currentStep =
        Number(step);


    if(topTitle){

        topTitle.textContent =
            stepTitles[step] ||
            "Inspection";

    }


    updateWorkflowProgress(
        Number(step)
    );


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* =========================================================
   WORKFLOW PROGRESS
========================================================= */

function updateWorkflowProgress(step){

    document
        .querySelectorAll(
            ".workflow-step"
        )
        .forEach(item => {

            const itemStep =
                Number(
                    item.dataset.step
                );


            item.classList.toggle(

                "active",

                itemStep <= step

            );

        });

}


/* =========================================================
   BACK BUTTONS
========================================================= */

function goBack(step){

    const previousSteps = {

        2:1,

        3:2,

        4:3,

        5:4,

        6:5,

        7:6

    };


    if(step === 1){

        /*
            Change filename if your
            assignment page has another name.
        */

        window.location.href =
            "myassignment.html";

        return;

    }


    if(step === "success"){

        goToStep(7);

        return;

    }


    const previous =
        previousSteps[step];


    if(previous){

        goToStep(previous);

    }

}


/* =========================================================
   CHECKLIST
========================================================= */

const checklistMap = {

    infrastructure:
        "check-infrastructure",

    staff:
        "check-staff",

    beneficiaries:
        "check-beneficiaries",

    scheme:
        "check-scheme",

    observations:
        "check-observations"

};


function openChecklist(type){

    document
        .querySelectorAll(
            ".checklist-subdiv"
        )
        .forEach(section => {

            section.classList.remove(
                "active-checklist"
            );

        });


    const target =
        document.getElementById(
            checklistMap[type]
        );


    if(target){

        target.classList.add(
            "active-checklist"
        );

    }


    document
        .querySelectorAll(
            ".check-category"
        )
        .forEach(button => {

            button.classList.toggle(

                "active",

                button.dataset.check ===
                type

            );

        });


    /*
        On mobile automatically
        move user to checklist.
    */

    if(window.innerWidth < 821){

        const detail =
            document.querySelector(
                ".checklist-detail"
            );


        if(detail){

            setTimeout(
                () => {

                    detail.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                },
                80
            );

        }

    }

}


/* =========================================================
   CHECKLIST CHOICE BUTTONS
========================================================= */

document.addEventListener(
    "click",
    function(event){

        const choice =
            event.target.closest(
                ".choice"
            );


        if(!choice){
            return;
        }


        const group =
            choice.closest(
                ".choice-group"
            );


        if(!group){
            return;
        }


        /*
            Remove old selection
        */

        group
            .querySelectorAll(
                ".choice"
            )
            .forEach(button => {

                button.classList.remove(

                    "selected-green",

                    "selected-yellow",

                    "selected-red"

                );

            });


        const text =
            choice.textContent
                .toLowerCase();


        /*
            Add selection based
            on choice
        */

        if(
            text.includes(
                "non-compliant"
            )
        ){

            choice.classList.add(
                "selected-red"
            );

        }

        else if(
            text.includes(
                "partially"
            )
        ){

            choice.classList.add(
                "selected-yellow"
            );

        }

        else{

            choice.classList.add(
                "selected-green"
            );

        }


        updateChecklistProgress();

    }
);


/* =========================================================
   CHECKLIST PROGRESS
========================================================= */

function updateChecklistProgress(){

    const groups =
        document.querySelectorAll(
            ".choice-group"
        );


    const selected =
        document.querySelectorAll(

            ".choice-group " +
            ".selected-green, " +

            ".choice-group " +
            ".selected-yellow, " +

            ".choice-group " +
            ".selected-red"

        );


    const total =
        groups.length;


    const completed =
        Math.min(
            selected.length,
            total
        );


    if(total === 0){
        return;
    }


    const percent =
        Math.round(
            (
                completed /
                total
            ) * 100
        );


    const count =
        document.getElementById(
            "completedCount"
        );


    const percentElement =
        document.getElementById(
            "progressPercent"
        );


    const bar =
        document.getElementById(
            "miniProgressBar"
        );


    /*
        Prototype starts with
        18 completed.
    */

    const displayedCount =
        Math.min(
            28,
            18 + completed
        );


    if(count){

        count.textContent =
            displayedCount;

    }


    if(percentElement){

        percentElement.textContent =
            `${percent}%`;

    }


    if(bar){

        bar.style.width =
            `${percent}%`;

    }

}


/* =========================================================
   EVIDENCE CAPTURE
========================================================= */

function captureEvidence(){

    const input =
        document.createElement(
            "input"
        );


    input.type =
        "file";


    input.accept =
        "image/*";


    /*
        Mobile camera support
    */

    input.capture =
        "environment";


    input.addEventListener(
        "change",
        function(){

            if(
                input.files &&
                input.files.length
            ){

                alert(
                    "Evidence image selected successfully."
                );

            }

        }
    );


    input.click();

}


/* =========================================================
   UPLOAD EVIDENCE
========================================================= */

function uploadEvidence(){

    const input =
        document.createElement(
            "input"
        );


    input.type =
        "file";


    input.accept =
        "image/*,video/*,.pdf,.doc,.docx";


    input.addEventListener(
        "change",
        function(){

            if(
                input.files &&
                input.files.length
            ){

                alert(
                    input.files[0].name +
                    " selected successfully."
                );

            }

        }
    );


    input.click();

}


/* =========================================================
   AI ANALYSIS
========================================================= */

function runAIAnalysis(){

    const button =
        document.querySelector(
            ".ai-button"
        );


    if(!button){
        return;
    }


    const oldText =
        button.textContent;


    button.disabled =
        true;


    button.textContent =
        "⟳ Analyzing...";


    setTimeout(
        function(){

            button.disabled =
                false;


            button.textContent =
                "✓ Analysis Complete";


            setTimeout(
                function(){

                    button.textContent =
                        oldText;

                },
                1800
            );


        },
        1300
    );

}


/* =========================================================
   DIGITAL DECLARATION
========================================================= */

function checkDeclaration(){

    const first =
        document.getElementById(
            "declaration1"
        )?.checked;


    const second =
        document.getElementById(
            "declaration2"
        )?.checked;


    const submit =
        document.getElementById(
            "submitInspection"
        );


    if(submit){

        submit.disabled =
            !(first && second);

    }

}


/* =========================================================
   SUBMIT INSPECTION
========================================================= */

function submitInspection(){

    const first =
        document.getElementById(
            "declaration1"
        )?.checked;


    const second =
        document.getElementById(
            "declaration2"
        )?.checked;


    if(!first || !second){

        alert(
            "Please confirm both declarations before submitting."
        );

        return;

    }


    /*
        Hide all normal screens
    */

    document
        .querySelectorAll(
            ".workflow-screen"
        )
        .forEach(screen => {

            screen.classList.remove(
                "active-screen"
            );

        });


    /*
        Show success screen
    */

    document
        .getElementById(
            "screenSuccess"
        )
        .classList.add(
            "active-screen"
        );


    /*
        Remove active state
        from numbered workflow
        because inspection is complete.
    */

    document
        .querySelectorAll(
            ".workflow-step"
        )
        .forEach(step => {

            step.classList.add(
                "active"
            );

        });


    if(topTitle){

        topTitle.textContent =
            "Submission Success";

    }


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* =========================================================
   DASHBOARD
========================================================= */

function goDashboard(){

    /*
        Change this path if needed.
    */

    window.location.href =
        "dashboard.html";

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        /*
            Start on Step 1
        */

        goToStep(1);


        /*
            First checklist category
        */

        openChecklist(
            "infrastructure"
        );


        /*
            Declaration state
        */

        checkDeclaration();

    }
);