System.register([], function(exports_1) {
    var SearchSelection;
    return {
        setters:[],
        execute: function() {
            SearchSelection = (function () {
                function SearchSelection(inName, inSelected) {
                    this.selected = false;
                    this.name = inName;
                    if (inSelected) {
                        this.selected = inSelected;
                    }
                }
                return SearchSelection;
            })();
            exports_1("SearchSelection", SearchSelection);
        }
    }
});
//# sourceMappingURL=searchSelection.js.map