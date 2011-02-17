//Listen on the entire window for the activation shortcut key
window.addEventListener('keydown', function(e) {
    //Ctrl + Alt + Space
    if (e.ctrlKey && e.altKey && e.keyCode === 32) {
        chrome.extension.sendRequest({name: "openPopUp"});
    }
}, false);