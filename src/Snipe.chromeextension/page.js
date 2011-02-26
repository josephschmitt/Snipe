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

function selectTab(winid, tabid) {
    chrome.extension.sendRequest({name:'selectTab', message:{winid: winid, tabid: tabid}});
}

function updateLayout(height) {
    var loc = window.location;
     //Tweak for windows
    if (/windows/i.test(navigator.userAgent)) {
        height += 15;
    }
    
    if (loc.protocol === 'chrome-extension:' && loc.href.indexOf('popup.html') > -1) {
        window.resizeTo(window.width, height + 40);
    }
}

function closePopup() {
    chrome.extension.sendRequest({name:'closePopup'});
}

if (window.top === window) {
    var snipe = new Snipe({
        maxResults: 5,
        refresh: getResults,
        onRefreshed: updateLayout,
        select: selectTab,
        onDestroyed: closePopup
    });
    
    snipe.show();
}