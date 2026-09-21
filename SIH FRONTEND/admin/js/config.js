/* =========================================================
   SMARTINSPECT AI — APPLICATION CONFIGURATION
   File: config.js
   Purpose: Central configuration for frontend application
   ========================================================= */

"use strict";

/**
 * Application configuration.
 *
 * Keep environment-specific values here.
 * Do not store secrets in frontend JavaScript.
 */

const APP_CONFIG = Object.freeze({

    /* =====================================================
       APPLICATION
       ===================================================== */

    APP_NAME: "SmartInspect AI",

    APP_VERSION: "1.0.0",

    APP_ENV:
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
            ? "development"
            : "production",

    /* =====================================================
       API
       ===================================================== */

    API: Object.freeze({

        /*
         * Change this according to your backend.
         *
         * Example:
         * http://localhost:5000/api
         */

        BASE_URL:
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000/api"
                : "/api",

        TIMEOUT: 15000,

        ENDPOINTS: Object.freeze({

            AUTH: {
                LOGIN: "/auth/login",
                REGISTER: "/auth/register",
                LOGOUT: "/auth/logout",
                ME: "/auth/me"
            },

            DASHBOARD: {
                OVERVIEW: "/dashboard/overview",
                STATISTICS: "/dashboard/statistics"
            },

            INSTITUTIONS: {
                BASE: "/institutions",
                DETAILS: "/institutions/:id"
            },

            INSPECTIONS: {
                BASE: "/inspections",
                DETAILS: "/inspections/:id",
                SUBMIT: "/inspections/:id/submit"
            },

            ALERTS: {
                BASE: "/alerts",
                DETAILS: "/alerts/:id"
            },

            OFFICERS: {
                BASE: "/officers",
                DETAILS: "/officers/:id"
            }
        })
    }),

    /* =====================================================
       REQUEST SETTINGS
       ===================================================== */

    REQUEST: Object.freeze({

        HEADERS: Object.freeze({
            "Content-Type": "application/json",
            "Accept": "application/json"
        }),

        CREDENTIALS: "include"
    }),

    /* =====================================================
       UI SETTINGS
       ===================================================== */

    UI: Object.freeze({

        TOAST_DURATION: 4000,

        DEBOUNCE_DELAY: 300,

        ANIMATION_DURATION: 220,

        TABLE_PAGE_SIZE: 10,

        MOBILE_BREAKPOINT: 767,

        TABLET_BREAKPOINT: 1023
    }),

    /* =====================================================
       DATE / TIME
       ===================================================== */

    DATE_TIME: Object.freeze({

        LOCALE: "en-IN",

        TIME_ZONE: "Asia/Kolkata",

        DATE_FORMAT: {
            day: "2-digit",
            month: "short",
            year: "numeric"
        },

        DATE_TIME_FORMAT: {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    }),

    /* =====================================================
       STATUS VALUES
       ===================================================== */

    STATUS: Object.freeze({

        INSPECTION: Object.freeze({
            PENDING: "pending",
            IN_PROGRESS: "in_progress",
            COMPLETED: "completed",
            FAILED: "failed"
        }),

        INSTITUTION: Object.freeze({
            ACTIVE: "active",
            INACTIVE: "inactive",
            SUSPENDED: "suspended"
        }),

        ALERT: Object.freeze({
            LOW: "low",
            MEDIUM: "medium",
            HIGH: "high",
            CRITICAL: "critical",
            RESOLVED: "resolved"
        })
    }),

    /* =====================================================
       PAGINATION
       ===================================================== */

    PAGINATION: Object.freeze({

        DEFAULT_PAGE: 1,

        DEFAULT_LIMIT: 10,

        MAX_LIMIT: 100
    }),

    /* =====================================================
       STORAGE POLICY
       ===================================================== */

    /*
     * SmartInspect AI intentionally does NOT use localStorage.
     *
     * Authentication/session state should preferably be
     * handled by secure HTTP-only cookies on the backend.
     */

    STORAGE: Object.freeze({
        USE_LOCAL_STORAGE: false,
        USE_SESSION_STORAGE: false
    })
});


/* =========================================================
   API URL HELPER
   ========================================================= */

/**
 * Build a complete API URL.
 *
 * @param {string} endpoint
 * @returns {string}
 */

function getApiUrl(endpoint) {

    if (!endpoint) {
        return APP_CONFIG.API.BASE_URL;
    }

    const baseUrl =
        APP_CONFIG.API.BASE_URL.replace(/\/$/, "");

    const cleanEndpoint =
        endpoint.startsWith("/")
            ? endpoint
            : `/${endpoint}`;

    return `${baseUrl}${cleanEndpoint}`;
}


/* =========================================================
   ENVIRONMENT HELPERS
   ========================================================= */

/**
 * Check whether application is running locally.
 *
 * @returns {boolean}
 */

function isDevelopment() {
    return APP_CONFIG.APP_ENV === "development";
}


/**
 * Check whether application is running in production.
 *
 * @returns {boolean}
 */

function isProduction() {
    return APP_CONFIG.APP_ENV === "production";
}


/* =========================================================
   FREEZE CONFIGURATION
   ========================================================= */

Object.freeze(APP_CONFIG);


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

window.APP_CONFIG = APP_CONFIG;
window.getApiUrl = getApiUrl;
window.isDevelopment = isDevelopment;
window.isProduction = isProduction;