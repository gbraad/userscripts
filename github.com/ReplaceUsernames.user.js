// ==UserScript==
// @name         Replace GitHub Usernames with Real Names from Gist
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Replace GitHub usernames with real names using data from a private Gist
// @author       You
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // URL of the private Gist containing the username-to-real-name mappings
    const gistUrl = 'https://gist.githubusercontent.com/YOUR_USERNAME/GIST_ID/raw/FILENAME.json';

    // Function to replace usernames with real names
    function replaceUsernames(usernameMap) {
        const elements = document.querySelectorAll('a, span, div');
        elements.forEach(element => {
            const text = element.textContent.trim();
            if (usernameMap[text]) {
                element.textContent = usernameMap[text];
            }
        });
    }

    // Fetch the username-to-real-name mappings from the Gist
    fetch(gistUrl)
        .then(response => response.json())
        .then(usernameMap => {
            // Run the function on page load
            replaceUsernames(usernameMap);

            // Run the function again if the page content changes (e.g., via AJAX)
            const observer = new MutationObserver(() => replaceUsernames(usernameMap));
            observer.observe(document.body, { childList: true, subtree: true });
        })
        .catch(error => console.error('Error fetching username mappings:', error));
})();
