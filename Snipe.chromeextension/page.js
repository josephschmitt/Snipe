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
        chrome.extension.sendRequest({name:'getTabResults', message:value}, onMessageReceived);
    }
}

function selectTab(index) {
    chrome.extension.sendRequest({name:'selectTab', message:index});
}

function updateLayout(height) {
    window.resizeTo(window.width, height + 40);
}

if (window.top === window) {
    var snipe = new Snipe({
        refresh: getResults,
        onRefreshed: updateLayout,
        select: selectTab
    });
    
    snipe.show();
}