function onMessageReceived(e) {
    if (!snipe) {return;}
    
    switch (e.name) {
        case 'getTabResults':
            snipe.refresh(e.message);
        break;
        // case 'getFavicon':
        //     document.querySelector('link[rel="shortcut icon"]')
        // break;
        case 'getSettings':
            snipe.updateSettings(e.message);
        break;
        case 'toggle':
            snipe.toggle();
        break;
    }
}

function getResults(value) {
    if (value.trim() === '') {
        snipe.refresh();
    }
    else {
        safari.self.tab.dispatchMessage('getTabResults', value);
    }
}

function selectTab(winid, tabid) {
    safari.self.tab.dispatchMessage('selectTab', {winid: winid, tabid: tabid});
}

function getSettings() {
    safari.self.tab.dispatchMessage('getSettings');
}

function updateSettings(settings) {
    safari.self.tab.dispatchMessage('updateSettings', settings);
}

//Check to make sure not in a safari extension window
if (window.top === window && new RegExp('safari-extension://').test(tab.url) == false) {
    var snipe = new Snipe({
        maxResults: 5,
        refresh: getResults,
        select: selectTab,
        onSettingsChanged: updateSettings
    });
    
    getSettings();
    
    //Listen on the entire window for the activation shortcut key
    window.addEventListener('keydown', function(e) {
        var preventDefault = true;
        
        //Ctrl + Alt + Space
        if (snipe.matchesShortcut(e) /*e.ctrlKey && e.altKey && e.keyCode === KEY_SPACE*/) {
            snipe.toggle();
            e.preventDefault();
        }
    }, false);
    
    safari.self.addEventListener("message", onMessageReceived, false);
}