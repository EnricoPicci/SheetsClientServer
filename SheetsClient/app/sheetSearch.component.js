System.register(['angular2/core', '../utilities/searchCriteria.component', '../utilities/searchCriteria', '../utilities/searchSelection', './sheetBackEnd.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, searchCriteria_component_1, searchCriteria_1, searchSelection_1, sheetBackEnd_service_1;
    var SheetSearchCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (searchCriteria_component_1_1) {
                searchCriteria_component_1 = searchCriteria_component_1_1;
            },
            function (searchCriteria_1_1) {
                searchCriteria_1 = searchCriteria_1_1;
            },
            function (searchSelection_1_1) {
                searchSelection_1 = searchSelection_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            }],
        execute: function() {
            SheetSearchCmp = (function () {
                function SheetSearchCmp(_backEnd) {
                    this._backEnd = _backEnd;
                    this.searchCriteria = new Array();
                    this.sheetsRetrieved = new core_1.EventEmitter();
                }
                SheetSearchCmp.prototype.ngOnInit = function () {
                    this.initializeSearchCriteria();
                };
                SheetSearchCmp.prototype.initializeSearchCriteria = function () {
                    var _this = this;
                    if (this.searchCriteria.length == 0) {
                        // initialize at start the selection criteria (so that we go to the server 
                        // only once to retrieve the criteria) and then build the arrays of SearchSelection instance to be passed
                        // to each SearchCriteria component contained in this component
                        var publicPersonalizedDomain = new Array();
                        publicPersonalizedDomain.push('Pubblici');
                        publicPersonalizedDomain.push('Personalizzati');
                        var publicPersonalized = new Array();
                        publicPersonalized[0] = new searchSelection_1.SearchSelection(publicPersonalizedDomain[0]);
                        publicPersonalized[1] = new searchSelection_1.SearchSelection(publicPersonalizedDomain[1]);
                        this.searchCriteria.push(new searchCriteria_1.SearchCriteria('Publici o Personalizzati', publicPersonalized));
                        this._backEnd.getGeneralSearchCriteriaDomain()
                            .subscribe(function (tags) {
                            var general = new Array();
                            for (var i = 0; i < tags.length; i++) {
                                general[i] = new searchSelection_1.SearchSelection(tags[i]);
                            }
                            _this.searchCriteria.push(new searchCriteria_1.SearchCriteria('General', general));
                        }, function (error) { return _this.errorMessage = error; });
                        this._backEnd.getValueBasedSearchCriteriaDomain()
                            .subscribe(function (tags) {
                            var valueBased = new Array();
                            for (var i = 0; i < tags.length; i++) {
                                valueBased[i] = new searchSelection_1.SearchSelection(tags[i]);
                            }
                            _this.searchCriteria.push(new searchCriteria_1.SearchCriteria('Value Based', valueBased));
                        }, function (error) { return _this.errorMessage = error; });
                        this._backEnd.getSectorsSearchCriteriaDomain()
                            .subscribe(function (tags) {
                            var sectors = new Array();
                            for (var i = 0; i < tags.length; i++) {
                                sectors[i] = new searchSelection_1.SearchSelection(tags[i]);
                            }
                            _this.searchCriteria.push(new searchCriteria_1.SearchCriteria('Sectors', sectors));
                        }, function (error) { return _this.errorMessage = error; });
                    }
                    return this.searchCriteria;
                };
                SheetSearchCmp.prototype.onChange = function (inSearchCriteria) {
                    var _this = this;
                    var criteria;
                    criteria = this.searchCriteria[0];
                    var publicPersonal = new Array();
                    this.retrieveSelectedCriteria(criteria, publicPersonal);
                    console.log('publicPersonal');
                    console.log(publicPersonal);
                    criteria = this.searchCriteria[1];
                    var generalTags = new Array();
                    this.retrieveSelectedCriteria(criteria, generalTags);
                    console.log('generalTags');
                    console.log(generalTags);
                    criteria = this.searchCriteria[2];
                    var valueBasedTags = new Array();
                    this.retrieveSelectedCriteria(criteria, valueBasedTags);
                    console.log('valueBasedTags');
                    console.log(valueBasedTags);
                    criteria = this.searchCriteria[3];
                    ;
                    var sectorsTags = new Array();
                    this.retrieveSelectedCriteria(criteria, sectorsTags);
                    console.log('sectorsTags');
                    console.log(sectorsTags);
                    this.searchResult = this._backEnd.selectSheets(null, publicPersonal, generalTags, valueBasedTags, sectorsTags)
                        .subscribe(function (sheets) {
                        _this.searchResult = sheets;
                        _this.sheetsRetrieved.next(_this.searchResult);
                    }, function (error) { return _this.errorMessage = error; });
                };
                SheetSearchCmp.prototype.retrieveSelectedCriteria = function (inCriteria, inTags) {
                    for (var i = 0; i < inCriteria.selections.length; i++) {
                        if (inCriteria.selections[i].selected) {
                            inTags[i] = inCriteria.selections[i].name;
                        }
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SheetSearchCmp.prototype, "sheetsRetrieved", void 0);
                SheetSearchCmp = __decorate([
                    core_1.Component({
                        selector: 'sheetSearchCmp',
                        providers: [],
                        templateUrl: '../templates/sheetSearch.html',
                        styleUrls: ['../styles/sheetSearch.css'],
                        directives: [searchCriteria_component_1.SearchCriteriaComponent],
                    }), 
                    __metadata('design:paramtypes', [sheetBackEnd_service_1.SheetBackEnd])
                ], SheetSearchCmp);
                return SheetSearchCmp;
            })();
            exports_1("SheetSearchCmp", SheetSearchCmp);
        }
    }
});
//# sourceMappingURL=sheetSearch.component.js.map