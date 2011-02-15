function onMessageReceived(e) {
    console.log('receive message', e.name, e.message);
    
    if (e.name === 'getTabResults') {
        snipe.refresh(e.message);
    }
}

function getResults(value) {
    console.log('getResults')
    if (value.trim() === '') {
        console.log('field empty');
        snipe.refresh();
    }
    else {
        console.log('dispatchMessage getTabResults', value);
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
    
    window.addEventListener('keydown', function(e) {
        // console.log('keydown', e.keyCode);

        //Ctrl + Alt + Space
        if (e.ctrlKey && e.altKey && e.keyCode === 32) {
            snipe.toggle();
        }

        //Esc key
        if (e.keyCode === 27) {
            snipe.hide();
        }
    }, false);

    safari.self.addEventListener("message", onMessageReceived, false);
}