function onMessageReceived(e) {
    if (e.name === 'getTabResults') {
        snipe.refresh(e.message);
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

function selectTab(index) {
    safari.self.tab.dispatchMessage('selectTab', index);
}

if (window.top === window) {
    var snipe = new Snipe({
        refresh: getResults,
        select: selectTab
    });
    
    safari.self.addEventListener("message", onMessageReceived, false);
}