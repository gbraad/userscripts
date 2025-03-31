// ==UserScript==
// @name         Replace GitHub Usernames with Real Names
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Replace GitHub usernames with real names
// @author       Gerard Braad <me@gbraad.nl>
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Inline username-to-real-name mappings
    const usernameMap = {
        "octocat": "The Octocat",
        "torvalds": "Linus Torvalds",
        "No Assignees": "[😒] Unamused"
        // Add more mappings here
    };

    // Function to replace usernames with real names
    function replaceUsernames() {
        const elements = document.querySelectorAll('a, span, div');
        elements.forEach(element => {
            const text = element.textContent.trim();
            if (usernameMap[text]) {
                const value = usernameMap[text];
                // Check if the value contains the emoji pattern [emoji]
                if (value.match(/^\[.*?\]/)) {
                    // Split the emoji part from the rest of the text
                    const emojiOnly = value.match(/^\[(.*?)\]/)[1];
                    const textPart = value.replace(/^\[.*?\]/, '').trim();
                    // Put emoji outside the formatting
                    element.innerHTML = `${emojiOnly} <b><i>${textPart}</i></b>`;
                } else {
                    // Regular case without emoji
                    element.innerHTML = `<b><i>${value}</i></b>`;
                }
            }
        });
    }

    // Run the function on page load
    replaceUsernames();

    // Run the function again if the page content changes (e.g., via AJAX)
    const observer = new MutationObserver(() => replaceUsernames());
    observer.observe(document.body, { childList: true, subtree: true });
})();
