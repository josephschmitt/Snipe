Snipe.Results = Class.extend({
    /**
     * Init method
     * @param options (Object) - Options for the method.
     *  Eg.
     *      options: {
     *          select: function(index) {
     *              //Method to handle what happens when an item is selected
     *              //The index param is the index of the tab selected
     *          }
     *      }
     */
    init: function(element, options) {
        var self = this,
            items = element.querySelectorAll('li'),
            
            curIndex,
            curSelection;
        
        self.element = element;
    
            
// PRIVATE METHODS ____________________________________________________________
    
        function updateLayout() {
            var height = 0;

            if (items.length > 0) {
                removeClass(element, 'invisible');

                for (var i = 0, length = items.length; i < length; i++) {
                    if (i < 5) {
                        height += items[i].clientHeight + 20;
                    }
                }

                element.style.maxHeight = height + 'px  !important';
            }
            else {
                addClass(element, 'invisible');
            }
        }
        
        function onItemSelect(e) {
            options.select.apply(null, [e.target.getAttribute('data-tab')])
        }
        
        function onItemHover(e) {
            e.cancelBubble = true;

            var targ = e.target;
            //Hovering over child node
            if (!targ.children.length) {
                targ = targ.parentNode;
            }

            self.selectResult(targ);
        }

        function onItemLeave(e) {
            e.cancelBubble = true;

            var targ = e.target;
            //Hovering over child node
            if (!targ.children.length) {
                targ = targ.parentNode;
            }

            self.deselectResult(targ);
        }


// PRIVILEGED METHODS _________________________________________________________

        self.refresh = function(data) {
            if (!data) {
                element.innerHTML = '';
            }
            else {
                element.innerHTML = tmpl(
                    '<% for ( var i = 0; i < results.length; i++ ) { %>\
                        <li data-tab="<%= results[i].index %>"><%= results[i].title %>\
                            <em><%= results[i].url %></em>\
                        </li>\
                     <% } %>',
                    {results: data}
                );

                items = element.querySelectorAll('li');
                
                for (var i = 0; i < items.length; i++) {
                    items[i].addEventListener('mouseover', onItemHover, false);
                    items[i].addEventListener('mouseout', onItemLeave, false);
                    items[i].addEventListener('click', onItemSelect, false);
                }
            }

            updateLayout();
        };
        
        self.selectResult = function(item) {
            if (curSelection) {
                self.deselectResult(curSelection);
            }

            addClass(item, 'active');
            curIndex = parseInt(item.getAttribute('data-tab'));
            curSelection = items[curIndex];
        };

        self.deselectResult = function(item) {
            removeClass(item, 'active');
            curSelection = null;
            curIndex = null;
        };
        
        self.destroy = function() {
            element.parentNode.removeChild(element);
            
            element = null;
            items = null;
        };
    }
});