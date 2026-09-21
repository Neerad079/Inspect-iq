/* =========================================================
   SMARTINSPECT AI — GLOBAL UTILITIES
   File: utils.js
   Purpose: Reusable frontend utility functions
   ========================================================= */

"use strict";


/* =========================================================
   1. DOM UTILITIES
   ========================================================= */

/**
 * Select a single DOM element.
 *
 * @param {string} selector
 * @param {Element|Document} parent
 * @returns {Element|null}
 */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}


/**
 * Select multiple DOM elements.
 *
 * @param {string} selector
 * @param {Element|Document} parent
 * @returns {NodeListOf<Element>}
 */

function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}


/**
 * Create a DOM element.
 *
 * @param {string} tag
 * @param {Object} attributes
 * @param {string} content
 * @returns {HTMLElement}
 */

function createElement(
    tag,
    attributes = {},
    content = ""
) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(
        ([key, value]) => {

            if (key === "className") {
                element.className = value;
            } else if (key === "textContent") {
                element.textContent = value;
            } else if (key === "html") {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        }
    );

    if (content) {
        element.textContent = content;
    }

    return element;
}


/* =========================================================
   2. CLASS UTILITIES
   ========================================================= */

function addClass(element, ...classes) {

    if (!element) return;

    element.classList.add(...classes);
}


function removeClass(element, ...classes) {

    if (!element) return;

    element.classList.remove(...classes);
}


function toggleClass(
    element,
    className,
    force
) {

    if (!element) return;

    return element.classList.toggle(
        className,
        force
    );
}


function hasClass(element, className) {

    if (!element) return false;

    return element.classList.contains(className);
}


/* =========================================================
   3. VISIBILITY UTILITIES
   ========================================================= */

function show(element) {

    if (!element) return;

    element.classList.remove("hidden");
}


function hide(element) {

    if (!element) return;

    element.classList.add("hidden");
}


function toggleVisibility(
    element,
    visible
) {

    if (!element) return;

    element.classList.toggle(
        "hidden",
        !visible
    );
}


/* =========================================================
   4. EVENT UTILITIES
   ========================================================= */

function on(
    element,
    event,
    handler,
    options
) {

    if (!element) return;

    element.addEventListener(
        event,
        handler,
        options
    );
}


function off(
    element,
    event,
    handler,
    options
) {

    if (!element) return;

    element.removeEventListener(
        event,
        handler,
        options
    );
}


/* =========================================================
   5. DEBOUNCE
   ========================================================= */

/**
 * Delay function execution until calls stop.
 *
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */

function debounce(
    callback,
    delay = 300
) {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(
            () => callback.apply(this, args),
            delay
        );
    };
}


/* =========================================================
   6. THROTTLE
   ========================================================= */

/**
 * Limit function execution frequency.
 *
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */

function throttle(
    callback,
    delay = 300
) {

    let lastExecution = 0;

    return function (...args) {

        const now = Date.now();

        if (
            now - lastExecution >= delay
        ) {

            lastExecution = now;

            callback.apply(
                this,
                args
            );
        }
    };
}


/* =========================================================
   7. API REQUEST
   ========================================================= */

/**
 * Generic API request helper.
 *
 * @param {string} endpoint
 * @param {Object} options
 * @returns {Promise<any>}
 */

async function apiRequest(
    endpoint,
    options = {}
) {

    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () => controller.abort(),
            APP_CONFIG.API.TIMEOUT
        );

    try {

        const response =
            await fetch(
                getApiUrl(endpoint),
                {
                    ...options,

                    credentials:
                        options.credentials ||
                        APP_CONFIG.REQUEST.CREDENTIALS,

                    headers: {
                        ...APP_CONFIG.REQUEST.HEADERS,
                        ...(options.headers || {})
                    },

                    signal: controller.signal
                }
            );

        let data = null;

        const contentType =
            response.headers.get(
                "content-type"
            );

        if (
            contentType &&
            contentType.includes(
                "application/json"
            )
        ) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {

            const message =
                data?.message ||
                data?.error ||
                `Request failed with status ${response.status}`;

            const error =
                new Error(message);

            error.status =
                response.status;

            error.data = data;

            throw error;
        }

        return data;

    } catch (error) {

        if (
            error.name === "AbortError"
        ) {

            throw new Error(
                "Request timed out. Please try again."
            );
        }

        throw error;

    } finally {

        clearTimeout(timeout);
    }
}


/* =========================================================
   8. HTTP HELPERS
   ========================================================= */

async function apiGet(
    endpoint,
    options = {}
) {

    return apiRequest(
        endpoint,
        {
            ...options,
            method: "GET"
        }
    );
}


async function apiPost(
    endpoint,
    body = {},
    options = {}
) {

    return apiRequest(
        endpoint,
        {
            ...options,
            method: "POST",
            body: JSON.stringify(body)
        }
    );
}


async function apiPut(
    endpoint,
    body = {},
    options = {}
) {

    return apiRequest(
        endpoint,
        {
            ...options,
            method: "PUT",
            body: JSON.stringify(body)
        }
    );
}


async function apiPatch(
    endpoint,
    body = {},
    options = {}
) {

    return apiRequest(
        endpoint,
        {
            ...options,
            method: "PATCH",
            body: JSON.stringify(body)
        }
    );
}


async function apiDelete(
    endpoint,
    options = {}
) {

    return apiRequest(
        endpoint,
        {
            ...options,
            method: "DELETE"
        }
    );
}


/* =========================================================
   9. DATE UTILITIES
   ========================================================= */

/**
 * Format date for dashboard UI.
 *
 * @param {string|Date|number} value
 * @returns {string}
 */

function formatDate(value) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        APP_CONFIG.DATE_TIME.LOCALE,
        APP_CONFIG.DATE_TIME.DATE_FORMAT
    ).format(date);
}


/**
 * Format date and time.
 *
 * @param {string|Date|number} value
 * @returns {string}
 */

function formatDateTime(value) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        APP_CONFIG.DATE_TIME.LOCALE,
        APP_CONFIG.DATE_TIME.DATE_TIME_FORMAT
    ).format(date);
}


/**
 * Return relative time.
 *
 * @param {string|Date|number} value
 * @returns {string}
 */

function timeAgo(value) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    const seconds =
        Math.floor(
            (Date.now() - date.getTime()) / 1000
        );

    if (seconds < 10) {
        return "Just now";
    }

    if (seconds < 60) {
        return `${seconds}s ago`;
    }

    const minutes =
        Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days =
        Math.floor(hours / 24);

    if (days < 30) {
        return `${days}d ago`;
    }

    return formatDate(value);
}


/* =========================================================
   10. NUMBER UTILITIES
   ========================================================= */

function formatNumber(
    value,
    options = {}
) {

    const number =
        Number(value);

    if (Number.isNaN(number)) {
        return "0";
    }

    return new Intl.NumberFormat(
        "en-IN",
        options
    ).format(number);
}


/**
 * Format percentage.
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */

function formatPercentage(
    value,
    decimals = 1
) {

    const number =
        Number(value);

    if (Number.isNaN(number)) {
        return "0%";
    }

    return `${number.toFixed(decimals)}%`;
}


/**
 * Format currency.
 *
 * @param {number} value
 * @returns {string}
 */

function formatCurrency(value) {

    const number =
        Number(value);

    if (Number.isNaN(number)) {
        return "₹0";
    }

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(number);
}


/* =========================================================
   11. STRING UTILITIES
   ========================================================= */

function capitalize(value) {

    if (!value) return "";

    const string =
        String(value);

    return (
        string.charAt(0).toUpperCase() +
        string.slice(1)
    );
}


function titleCase(value) {

    if (!value) return "";

    return String(value)
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map(capitalize)
        .join(" ");
}


function truncate(
    value,
    maxLength = 100
) {

    if (!value) return "";

    const string =
        String(value);

    if (string.length <= maxLength) {
        return string;
    }

    return (
        string.substring(
            0,
            maxLength
        ).trimEnd() + "..."
    );
}


/* =========================================================
   12. STATUS UTILITIES
   ========================================================= */

/**
 * Convert backend status into readable text.
 */

function formatStatus(status) {

    if (!status) {
        return "Unknown";
    }

    return titleCase(status);
}


/**
 * Return appropriate badge class.
 */

function getStatusBadgeClass(status) {

    const normalized =
        String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "_");

    const map = {

        active: "badge-success",
        completed: "badge-success",
        approved: "badge-success",
        resolved: "badge-success",

        pending: "badge-warning",
        warning: "badge-warning",
        in_progress: "badge-info",

        failed: "badge-danger",
        critical: "badge-danger",
        rejected: "badge-danger",
        suspended: "badge-danger",

        info: "badge-info",

        processing: "badge-purple"
    };

    return (
        map[normalized] ||
        "badge-neutral"
    );
}


/**
 * Return appropriate status dot class.
 */

function getStatusDotClass(status) {

    const normalized =
        String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "_");

    const map = {

        active: "status-dot-success",
        completed: "status-dot-success",
        approved: "status-dot-success",
        resolved: "status-dot-success",

        pending: "status-dot-warning",
        warning: "status-dot-warning",

        in_progress: "status-dot-info",

        failed: "status-dot-danger",
        critical: "status-dot-danger",
        rejected: "status-dot-danger",
        suspended: "status-dot-danger",

        processing: "status-dot-purple"
    };

    return (
        map[normalized] ||
        "status-dot"
    );
}


/* =========================================================
   13. VALIDATION UTILITIES
   ========================================================= */

function isEmpty(value) {

    return (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    );
}


function isValidEmail(email) {

    if (!email) return false;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(String(email).trim());
}


function isValidPhone(phone) {

    if (!phone) return false;

    return /^[6-9]\d{9}$/
        .test(String(phone).trim());
}


/* =========================================================
   14. ERROR HANDLING
   ========================================================= */

function getErrorMessage(error) {

    if (!error) {
        return "Something went wrong.";
    }

    if (
        typeof error === "string"
    ) {
        return error;
    }

    return (
        error.message ||
        "Something went wrong. Please try again."
    );
}


/* =========================================================
   15. SAFE HTML
   ========================================================= */

/**
 * Escape user-controlled text before inserting it
 * into innerHTML.
 *
 * Prefer textContent whenever possible.
 */

function escapeHtml(value) {

    if (value === null ||
        value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   16. URL UTILITIES
   ========================================================= */

function getQueryParam(
    parameter
) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get(parameter);
}


function buildQueryString(
    params = {}
) {

    const searchParams =
        new URLSearchParams();

    Object.entries(params)
        .forEach(
            ([key, value]) => {

                if (
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                ) {
                    searchParams.set(
                        key,
                        value
                    );
                }
            }
        );

    return searchParams.toString();
}


/* =========================================================
   17. MODAL UTILITIES
   ========================================================= */

function openModal(modal) {

    if (!modal) return;

    modal.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.add("hidden");

    document.body.classList.remove(
        "modal-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}


/**
 * Close modal when clicking backdrop.
 */

function setupModal(modal) {

    if (!modal) return;

    on(
        modal,
        "click",
        event => {

            if (
                event.target === modal
            ) {
                closeModal(modal);
            }
        }
    );

    const closeButtons =
        modal.querySelectorAll(
            "[data-modal-close]"
        );

    closeButtons.forEach(
        button => {

            on(
                button,
                "click",
                () => closeModal(modal)
            );
        }
    );
}


/* =========================================================
   18. LOADING UTILITIES
   ========================================================= */

function setLoading(
    element,
    loading = true
) {

    if (!element) return;

    element.disabled = loading;

    element.classList.toggle(
        "is-loading",
        loading
    );

    element.setAttribute(
        "aria-busy",
        String(loading)
    );
}


/**
 * Create loading HTML.
 */

function getLoadingHTML(
    text = "Loading..."
) {

    return `
        <div class="loading-content">
            <span
                class="spinner spinner-sm"
                aria-hidden="true"
            ></span>

            <span>${escapeHtml(text)}</span>
        </div>
    `;
}


/* =========================================================
   19. COPY TO CLIPBOARD
   ========================================================= */

async function copyToClipboard(
    value
) {

    if (!navigator.clipboard) {
        throw new Error(
            "Clipboard access is not supported."
        );
    }

    await navigator.clipboard.writeText(
        String(value)
    );
}


/* =========================================================
   20. DEVICE UTILITIES
   ========================================================= */

function isMobile() {

    return window.innerWidth <=
        APP_CONFIG.UI.MOBILE_BREAKPOINT;
}


function isTablet() {

    return (
        window.innerWidth >
            APP_CONFIG.UI.MOBILE_BREAKPOINT &&
        window.innerWidth <=
            APP_CONFIG.UI.TABLET_BREAKPOINT
    );
}


function isDesktop() {

    return window.innerWidth >
        APP_CONFIG.UI.TABLET_BREAKPOINT;
}


/* =========================================================
   21. RANDOM ID
   ========================================================= */

function generateId(
    prefix = "id"
) {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {
        return `${prefix}-${crypto.randomUUID()}`;
    }

    return (
        `${prefix}-` +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}


/* =========================================================
   22. ARRAY UTILITIES
   ========================================================= */

function unique(array = []) {

    return [
        ...new Set(array)
    ];
}


function groupBy(
    array,
    key
) {

    return array.reduce(
        (result, item) => {

            const group =
                typeof key === "function"
                    ? key(item)
                    : item[key];

            if (!result[group]) {
                result[group] = [];
            }

            result[group].push(item);

            return result;

        },
        {}
    );
}


/* =========================================================
   23. DOM READY
   ========================================================= */

function ready(callback) {

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            callback,
            {
                once: true
            }
        );

    } else {

        callback();
    }
}


/* =========================================================
   24. GLOBAL EXPORTS
   ========================================================= */

window.SmartInspectUtils = Object.freeze({

    $,
    $$,

    createElement,

    addClass,
    removeClass,
    toggleClass,
    hasClass,

    show,
    hide,
    toggleVisibility,

    on,
    off,

    debounce,
    throttle,

    apiRequest,
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete,

    formatDate,
    formatDateTime,
    timeAgo,

    formatNumber,
    formatPercentage,
    formatCurrency,

    capitalize,
    titleCase,
    truncate,

    formatStatus,
    getStatusBadgeClass,
    getStatusDotClass,

    isEmpty,
    isValidEmail,
    isValidPhone,

    getErrorMessage,
    escapeHtml,

    getQueryParam,
    buildQueryString,

    openModal,
    closeModal,
    setupModal,

    setLoading,
    getLoadingHTML,

    copyToClipboard,

    isMobile,
    isTablet,
    isDesktop,

    generateId,

    unique,
    groupBy,

    ready
});