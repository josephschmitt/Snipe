var Snipe = Class.extend({
    /**
     * Init method
     * @param options (Object) - Options for the method.
     *  Eg.
     *      options: {
     *          refresh: function(value) {
     *              //Method to handle fetching new data
     *             //The value param is the value of the input field
     *          },
     * 
     *          select: function(index) {
     *              //Method to handle what happens when an item is selected
     *              //The index param is the index of the tab selected
     *          }
     *      }
     */
    init: function(options) {
        var self = this,

            element,
            form,
            field,
            resultsList,
            resultsItems,
            
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
            form.addEventListener('submit', onFormSubmit, false);
        }
        
        function destroy() {
            document.body.removeChild(element);
            resultsList.destroy();
            
            element = null;
            form = null;
            field = null;
            resultsList = null;
            resultsItems = null;
        }
        
        
// EVENT HANDLERS _____________________________________________________________
        
        function onTransitionEnd(e) {
            if (hasClass(element, 'in')) {
                field.focus();
            }
            else {
                destroy();
            }
        }
        
        function onTabSelected(index) {
            options.select.apply(null, [index]);
            self.hide();
        }
        
        function onKeyUp(e) {
            // console.log('keyCode', e.keyCode);

            switch (e.keyCode) {
                //Do nothing
                case 16: //Shift key
                case 17: //Ctrl key
                case 18: //Option key
                case 20: //Caps lock key
                case 27: //Esc key
                case 37: //Left arrow
                case 39: //Right arrow
                case 91: //Cmd key
                break;
                
                //Home
                case 36:
                break;
                
                //End
                case 35:
                break;
                
                //Up arrow
                case 38:
                    // curSelection = curSelection || -1;
                    // 
                    // var prev = curSelection - 1 < 0 ? resultsItems.length - 1 : curSelection - 1;
                    // 
                    // // console.log('Up', prev);
                    // selectResult(resultsItems[prev]);
                break;

                //Down arrow
                case 40:
                    // curSelection = curSelection === undefined ? -1 : curSelection;
                    // // console.log('curSelection', curSelection);
                    // var next = curSelection + 1 > resultsItems.length ? 0 : curSelection + 1;
                    // 
                    // // console.log('Down', next, (curSelection+1), resultsItems.length);
                    // selectResult(resultsItems[next]);
                break;

                //Get results
                default:
                    clearTimeout(timer);
                        timer = setTimeout(function () {
                            options.refresh.apply(null, [field.value]);
                    }, 100);
            }
        }
        
        function onFormSubmit(e) {
            options.refresh(field.value);
            e.preventDefault();
        }


// PRIVILEGED METHODS _________________________________________________________
    
        self.show = function() {
            create();
            addEvents();
            
            setTimeout(function() {
                addClass(element, 'in');
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
        };
    }
});