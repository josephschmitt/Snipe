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
        chrome.extension.sendRequest({name:'getTabResults', value:value});
        // safari.self.tab.dispatchMessage('getTabResults', value);
    }
}

function selectTab(index) {
    chrome.extension.sendRequest({name:'selectTab', message:index});
    // safari.self.tab.dispatchMessage('selectTab', index);
}

if (window.top === window) {
    var snipe = new Snipe({
        refresh: getResults,
        select: selectTab
    });
    
    chrome.extension.onRequest.addListener(onMessageReceived);
    // safari.self.addEventListener("message", onMessageReceived, false);
}