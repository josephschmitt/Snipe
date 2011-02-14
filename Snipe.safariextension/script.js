var snipe = document.createElement('div'),
    form = document.createElement('form'),
    field = document.createElement('input'),
    resultsList = document.createElement('ul')
    timer = 0;

snipe.className = 'snipe';
snipe.appendChild(form);
form.appendChild(field);
form.appendChild(resultsList);

if (window.top === window) {
    document.body.insertBefore(snipe, document.body.firstChild);

    safari.self.addEventListener("message", function(e) {
        if (e.name === 'getTabResults') {
            showResults(e.message);
        }
    }, false);


    field.focus();
    
    field.addEventListener('keyup', function () {
        clearTimeout(timer);
            timer = setTimeout(function () {
                getResults();
        }, 100);
    });
    
    form.addEventListener('submit', function(e) {
        getResults();
        e.preventDefault();
    }, false);
}

function showField() {
    addClass(field, 'in');
}

function getResults() {
    safari.self.tab.dispatchMessage('getTabResults', field.value);
}

function showResults(results) {
    if (field.value.trim() == '') {
        resultsList.innerHTML = '';
    }
    else {
        resultsList.innerHTML = tmpl(
            '<% for ( var i = 0; i < results.length; i++ ) { %>\
                <li data-tab="<%= results[i].index %>"><%= results[i].title %><a href="<%= results[i].url %>" target="_blank"><%= results[i].url %></a></li>\
             <% } %>',
            {results: results}
        );
    
        var items = resultsList.querySelectorAll('li');
        for (var i=0; i<items.length; i++) {
            items[i].addEventListener('click', onSnipeResult, false);
        }
    }
    
    updateLayout();
}

function onSnipeResult(e) {
    selectTab(e.target.getAttribute('data-tab'));
}

function selectTab(index) {
    safari.self.tab.dispatchMessage('selectTab', index);
}

function updateLayout() {
    var items = resultsList.querySelectorAll('li'),
        height = 0;
    for (var i = 0, length = items.length; i < length; i++) {
        if (i < 5) {
            height += items[i].clientHeight + 8;
        }
    }
    
    resultsList.style.maxHeight = height + 'px';
}




// Helper functions

var cache = {};
  
this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
  
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
    
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
    
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
};

function hideField(out) {
    removeClass(field, 'in');
    if (out) {
        addClass(field, 'out');
    }
}

function hasClass(element, className) {
    if (!element) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
}

function addClass(element, className) {
    if (!element) return;
    if (!hasClassName(element, className)) {
        element.className += (element.className ? ' ' : '') + className;
    }
    return element;
}

function removeClass(element, className) {
    if (!element) return;
    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').trim();
    return element;
}