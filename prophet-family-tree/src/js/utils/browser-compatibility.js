// This file ensures compatibility across different browsers, handling any specific issues that may arise.

function isBrowserCompatible() {
    const userAgent = navigator.userAgent;

    // Check for specific browser compatibility issues
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isIE = /MSIE|Trident/.test(userAgent);

    if (isSafari) {
        console.warn("You are using Safari. Some features may not work as expected.");
    }

    if (isIE) {
        alert("You are using an outdated browser. Please consider upgrading for a better experience.");
    }
}

// Call the compatibility check on page load
document.addEventListener('DOMContentLoaded', isBrowserCompatible);