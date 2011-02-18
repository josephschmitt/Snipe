var Snipe = Class.extend({
    /**
     * Init method
     * @param options (Object) - Options for the method.
     *  Eg.
     *  options: {
     *      refresh: function(value) {
     *          //Method to handle fetching new data
     *          //The value param is the value of the input field
     *      },
     *
     *      onRefreshed: function(resultsList) {
     *          //Method called after refresh operation
     *      },
     *
     *      select: function(index) {
     *          //Method to handle what happens when an item is selected
     *          //The index param is the index of the tab selected
     *      },
     *
     *      onDestroyed: function() {
     *          //Method to handle what happens when snipe is destroyed
     *      }
     *  }
     */
    init: function(options) {
        var self = this,

            element,
            form,
            field,
            resultsList,

            timer;

        self.element = element;

// PRIVATE METHODS ____________________________________________________________

        function create() {
            element = document.createElement('div');
            form = document.createElement('form');
            field = document.createElement('input');

            resultsList = new Snipe.Results(document.createElement('ul'), {select: onTabSelected});

            element.className = 'snipe';
            element.appendChild(form);
            form.appendChild(field);
            form.appendChild(resultsList.element);

            document.body.insertBefore(element, document.body.firstChild);
        }

        function addEvents() {
            element.addEventListener('webkitTransitionEnd', onTransitionEnd, false );
            field.addEventListener('keyup', onKeyUp, false);
            field.addEventListener('keydown', onKeyDown, false);
            form.addEventListener('submit', onFormSubmit, false);

            //Hide Snipe when the window loses focus
            window.addEventListener('blur', onWindowBlur);

            //Hide snipe when clicking outside the snipe window
            window.addEventListener('click', onWindowClick);
        }

        function destroy() {
            resultsList.destroy();
            element.parentNode.removeChild(element);

            window.removeEventListener('blur', onWindowBlur);
            window.removeEventListener('click', onWindowClick);

            element = null;
            form = null;
            field = null;
            resultsList = null;

            if (options.onDestroyed) {
                options.onDestroyed();
            }
        }


// EVENT HANDLERS _____________________________________________________________

        function onTransitionEnd(e) {
            switch (e.propertyName) {
                case 'opacity':
                    if (hasClass(element, 'in')) {
                        field.focus();
                    }
                    else {
                        destroy();
                    }
                break;
            }
        }

        function onTabSelected(index) {
            options.select.apply(null, [index]);
            self.hide();
        }
        
        function onKeyDown(e) {
            switch (e.keyCode) {
                //Up arrow
                case 38:
                    var curIndex = /*(resultsList.curIndex === undefined || resultsList.curIndex === null) ? -1 :*/ resultsList.curIndex,
                        items = resultsList.element.querySelectorAll('li'),
                        length = items.length || 0,
                        prev = curIndex - 1 < 0 ? length - 1 : curIndex - 1;

                    resultsList.selectResult(items[prev]);
                    e.preventDefault();
                break;

                //Down arrow
                case 40:
                    var curIndex = /*(resultsList.curIndex === undefined || resultsList.curIndex === null) ? -1 :*/ resultsList.curIndex,
                        items = resultsList.element.querySelectorAll('li'),
                        length = items.length || 0,
                        next = curIndex + 1 >= length ? 0 : curIndex + 1;

                    resultsList.selectResult(items[next]);
                    e.preventDefault();
                break;

                case 27: //Esc key
                    snipe.hide();
                break;
            }
        }

        function onKeyUp(e) {
            // console.log('keyCode', e.keyCode);

            switch (e.keyCode) {
                //Do nothing
                case 16: //Shift key
                case 17: //Ctrl key
                case 18: //Option key
                case 20: //Caps lock key
                case 37: //Left arrow
                case 39: //Right arrow
                case 91: //Cmd key
                case 36: //Home
                case 35: //End
                case 38: //Up arrow
                case 40: //Down arrow
                case 27: //Esc key
                break;

                //Get results
                default:
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        if (!field || !field.value) {return false;}
                        options.refresh.apply(null, [field.value]);
                    }, 100);
            }
        }

        function onFormSubmit(e) {
            resultsList.activateResult();
            e.preventDefault();
        }

        function onWindowBlur(e) {
            self.hide();
        }

        function onWindowClick(e) {
            if (!hasAncestor(e.target, element) || e.target == element) {
                self.hide();
            }
        }


// PRIVILEGED METHODS _________________________________________________________

        self.show = function() {
            create();
            addEvents();

            setTimeout(function() {
                addClass(element, 'in');
                field.focus();
            }, 10);
        };

        self.hide = function() {
            self.refresh();
            removeClass(element, 'in');
        };

        self.toggle = function() {
            if (element) {
                self.hide();
            }
            else {
                self.show();
            }
        }

        self.refresh = function(data) {
            if (!element) {return false;}
            resultsList.refresh(data);

            if (options.onRefreshed) {
                options.onRefreshed(element.clientHeight);
            }
        };


// CONSTRUCTOR ________________________________________________________________

        //Listen on the entire window for the activation shortcut key
        window.addEventListener('keydown', function(e) {
            var preventDefault = true;
            
            //Ctrl + Alt + Space
            if (e.ctrlKey && e.altKey && e.keyCode === 32) {
                self.toggle();
                e.preventDefault();
            }
        }, false);
    }
});