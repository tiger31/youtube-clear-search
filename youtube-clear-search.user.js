// ==UserScript==
// @name         youtube-clear-search
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Clear youtube serach
// @author       github.com/tiger31
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const targetSelectors = [
    'ytd-reel-shelf-renderer', //shorts
    'ytd-shelf-renderer', //suggestions
    'ytd-horizontal-card-list-renderer', //another suggestions?,
    'ytd-rich-section-renderer', //shorts in subscriptions
];

(function() {
    'use strict';
    const hideFn = () => {
        const hideTargets = targetSelectors.reduce((acc, selector) => {
            acc.push(...document.getElementsByTagName(selector));
            return acc;
        }, []);
        for (let i of hideTargets) {
            i.style.display = "none";
        }
    }
    const handleMutation = (mutationsList, observer) => {
        if (mutationsList.some(m => m.type === 'childList')) {
            hideFn();
        }
    }

    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, { childList: true, subtree: true });
})();
