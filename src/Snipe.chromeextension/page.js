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
        chrome.extension.sendRequest({name:'getTabResults', message:value}, onMessageReceived);
    }
}

function selectTab(winid, tabid) {
    chrome.extension.sendRequest({name:'selectTab', message:{winid: winid, tabid: tabid}});
}

function getSettings() {
    chrome.extension.sendRequest({name: 'getSettings'}, onMessageReceived);
}

function updateSettings(settings) {
    chrome.extension.sendRequest({name: 'updateSettings', message: settings});
}

if (window.top === window) {
    //Styles
    var styles = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', chrome.extension.getURL('snipe-core/styles/styles.css'));
    document.querySelector('head').appendChild(styles);
    
    var snipe = new Snipe({
        maxResults: 5,
        refresh: getResults,
        select: selectTab,
        onSettingsChanged: updateSettings
    });
    
    getSettings();
    
    //Listen on the entire window for the activation shortcut key
    window.addEventListener('keydown', function(e) {
        //Ctrl + Alt + Space
        if (snipe.matchesShortcut(e)) {
            snipe.toggle();
            e.preventDefault();
        }
    }, false);
    
    chrome.extension.onRequest.addListener(onMessageReceived);
}