/// <reference path="typings/chrome/chrome.d.ts" />

import Env = require('./Env');

var injectScript;

injectScript = function(file, node) {
    var s, th;
    th = document.getElementsByTagName(node)[0];
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);

    s.onload = function() {
        chrome.storage.sync.get({
            alcSaveUrl: "Please input server url."
        }, function(items) {
            Env.log(items);
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(Env.eventName, true, true, items);
            document.dispatchEvent(evt);
            Env.log(evt);
        });
    };
};

injectScript(chrome.extension.getURL('/js/embedded.min.js'), 'body');