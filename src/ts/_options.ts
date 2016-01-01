/// <reference path="typings/chrome/chrome.d.ts" />

function save_options() {
    var elem: HTMLInputElement = <HTMLInputElement>(document.getElementById('alc-save-url'));
    chrome.storage.sync.set({
        alcSaveUrl: elem.value
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

}

function restore_options() {
    var elem: HTMLInputElement = <HTMLInputElement>(document.getElementById('alc-save-url'));

    chrome.storage.sync.get({
        alcSaveUrl: "Please input server url."
    }, function(items) {
        elem.value = items['alcSaveUrl'];
    });

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
