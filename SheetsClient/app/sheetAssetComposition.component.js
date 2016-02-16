System.register(['angular2/core', '../utilities/slider.component', './sheetWeightAdjuster.service', './sheetReturnData.component', './sheetCompositionCharts.component', './userLogged', './sheetBackEnd.service', '../utilities/stringNumericConverter'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, slider_component_1, sheetWeightAdjuster_service_1, sheetReturnData_component_1, sheetCompositionCharts_component_1, userLogged_1, sheetBackEnd_service_1, stringNumericConverter_1;
    var SheetAssetCompositionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (slider_component_1_1) {
                slider_component_1 = slider_component_1_1;
            },
            function (sheetWeightAdjuster_service_1_1) {
                sheetWeightAdjuster_service_1 = sheetWeightAdjuster_service_1_1;
            },
            function (sheetReturnData_component_1_1) {
                sheetReturnData_component_1 = sheetReturnData_component_1_1;
            },
            function (sheetCompositionCharts_component_1_1) {
                sheetCompositionCharts_component_1 = sheetCompositionCharts_component_1_1;
            },
            function (userLogged_1_1) {
                userLogged_1 = userLogged_1_1;
            },
            function (sheetBackEnd_service_1_1) {
                sheetBackEnd_service_1 = sheetBackEnd_service_1_1;
            },
            function (stringNumericConverter_1_1) {
                stringNumericConverter_1 = stringNumericConverter_1_1;
            }],
        execute: function() {
            SheetAssetCompositionComponent = (function () {
                function SheetAssetCompositionComponent(_sheetWeightAdjuster, _userLogged, _sheetBackEnd) {
                    this._sheetWeightAdjuster = _sheetWeightAdjuster;
                    this._userLogged = _userLogged;
                    this._sheetBackEnd = _sheetBackEnd;
                    // editMode and editStatus are different
                    // editMode tells whether or not show the customize button (and therefore gives the possibility to customize)
                    // editStatus tells whether the user has decided to customize a Sheet
                    this.editMode = true;
                    this.editStatus = false;
                    this.showCharts = true;
                    this.showInvestmentAmounts = false;
                    this.oneMonthReturn = true;
                    this.isChanged = false;
                    // if false, all sliders start from ZERO, otherwise their starting position increases based on the sum of the range of the previous assets
                    this.startOfScaleRelative = false;
                }
                SheetAssetCompositionComponent.prototype.onAssetGroupClick = function (inAssetGroup) {
                    inAssetGroup.show = !inAssetGroup.show;
                };
                SheetAssetCompositionComponent.prototype.onClickOverCustomizeButton = function () {
                    this.editStatus = !this.editStatus;
                };
                SheetAssetCompositionComponent.prototype.getCustomizeButtonText = function () {
                    var ret;
                    if (this.editStatus) {
                        ret = 'Chiudi';
                    }
                    else {
                        ret = 'Personalizza';
                    }
                    return ret;
                };
                SheetAssetCompositionComponent.prototype.onClickOverRelativeScaleButton = function () {
                    this.startOfScaleRelative = !this.startOfScaleRelative;
                    this._sheetWeightAdjuster.setRelativeStartOfScale(this.sheet.assetGroups);
                };
                SheetAssetCompositionComponent.prototype.getRelativeScaleButtonText = function () {
                    var ret;
                    if (this.startOfScaleRelative) {
                        ret = 'Scala assoluta';
                    }
                    else {
                        ret = 'Scala relativa';
                    }
                    return ret;
                };
                SheetAssetCompositionComponent.prototype.onToggleLock = function (inAsset) {
                    inAsset.setLocked(!inAsset.locked);
                };
                SheetAssetCompositionComponent.prototype.getStart = function (inAsset) {
                    return inAsset.weight;
                };
                SheetAssetCompositionComponent.prototype.getRange = function (inAsset) {
                    return inAsset.range;
                };
                SheetAssetCompositionComponent.prototype.getPips = function (inAsset) {
                    return inAsset.pips;
                };
                SheetAssetCompositionComponent.prototype.onEndOnAssetGroup = function (inEvent, inAssetGroup) {
                    var newWeightValue = inEvent[0];
                    this.setAssetGroupWeight(newWeightValue, inAssetGroup);
                };
                SheetAssetCompositionComponent.prototype.onSetAssetGroupWeight = function (inWeigthElement, inAssetGroup) {
                    var oldWeightValue = inAssetGroup.weight;
                    var newWeightValue = parseFloat(inWeigthElement.value);
                    var isNewWeightAllowed = this.validateNewWeight(newWeightValue, inAssetGroup);
                    if (isNewWeightAllowed) {
                        this.setAssetGroupWeight(newWeightValue, inAssetGroup);
                        if (oldWeightValue == newWeightValue) {
                            inWeigthElement.value = oldWeightValue.toFixed(2);
                        }
                    }
                    else {
                        this.highlightInputFieldWithErrors(inWeigthElement, inAssetGroup.weight);
                    }
                };
                SheetAssetCompositionComponent.prototype.setAssetGroupWeight = function (inWeight, inAssetGroup) {
                    this._sheetWeightAdjuster.adjustAfterChangeInAssetGroupWeight(inWeight, inAssetGroup, this.sheet);
                    this._sheetWeightAdjuster.setRelativeStartOfScale(this.sheet.assetGroups);
                    this.sheet.emitChangeCompositionEvent();
                    this.changed();
                };
                SheetAssetCompositionComponent.prototype.onEndOnAsset = function (inEvent, inAsset, inAssetGroup) {
                    var newWeightValue = inEvent[0];
                    this.setAssetWeight(newWeightValue, inAsset, inAssetGroup);
                };
                SheetAssetCompositionComponent.prototype.onSetAssetWeight = function (inWeigthElement, inAsset, inAssetGroup) {
                    var oldWeightValue = inAsset.weight;
                    var newWeightValue = parseFloat(inWeigthElement.value);
                    var isNewWeightAllowed = this.validateNewWeight(newWeightValue, inAsset);
                    if (isNewWeightAllowed) {
                        this.setAssetWeight(newWeightValue, inAsset, inAssetGroup);
                        if (oldWeightValue == newWeightValue) {
                            inWeigthElement.value = oldWeightValue.toFixed(2);
                        }
                    }
                    else {
                        this.highlightInputFieldWithErrors(inWeigthElement, inAsset.weight);
                    }
                };
                SheetAssetCompositionComponent.prototype.setAssetWeight = function (inWeight, inAsset, inAssetGroup) {
                    this._sheetWeightAdjuster.adjustAfterChangeInAssetWeight(inWeight, inAsset, inAssetGroup);
                    this._sheetWeightAdjuster.setRelativeStartOfScale(this.sheet.assetGroups);
                    this.sheet.emitChangeCompositionEvent();
                    this.changed();
                };
                SheetAssetCompositionComponent.prototype.validateNewWeight = function (inWeight, inAssetAbstract) {
                    this.resetMessages();
                    var isConsistent = inAssetAbstract.isWeightAllowed(inWeight);
                    if (!isConsistent) {
                        this.errorMessage = 'Valore non entro i limiti fissati';
                    }
                    return isConsistent;
                };
                SheetAssetCompositionComponent.prototype.highlightInputFieldWithErrors = function (inInputFIeldElement, inWeight) {
                    inInputFIeldElement.focus();
                    inInputFIeldElement.setSelectionRange(0, inInputFIeldElement.value.length);
                    inInputFIeldElement.value = inWeight.toFixed(2);
                };
                SheetAssetCompositionComponent.prototype.changed = function () {
                    this.isChanged = true;
                    this.sheet.personalized(this._userLogged);
                };
                SheetAssetCompositionComponent.prototype.onClickOverSaveButton = function () {
                    var _this = this;
                    this.resetMessages();
                    this._sheetBackEnd.addSheet(this.sheet)
                        .subscribe(function (data) {
                        _this.isChanged = false;
                        var retJson = data.json();
                        _this.sheet.id = retJson.id;
                        _this.sheetMessage = 'Sheet personalized no: ' + retJson.id + ' has been saved';
                        console.log('Data received after Save --- ' + JSON.stringify(retJson));
                    }, function (err) { return console.error(err); }, function () { return console.log('Save Complete'); });
                };
                SheetAssetCompositionComponent.prototype.toggleOneMonthReturn = function () {
                    this.oneMonthReturn = !this.oneMonthReturn;
                };
                SheetAssetCompositionComponent.prototype.getReturnValue = function (inAssetAbstract) {
                    var returnValue;
                    if (this.oneMonthReturn) {
                        returnValue = inAssetAbstract.oneMonthRet;
                    }
                    else {
                        returnValue = inAssetAbstract.oneYearRet;
                    }
                    return returnValue;
                };
                SheetAssetCompositionComponent.prototype.hasPositiveReturn = function (inAssetAbstract) {
                    return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(this.getReturnValue(inAssetAbstract)) >= 0;
                };
                SheetAssetCompositionComponent.prototype.onMouseOverAsset = function (inAsset) {
                    inAsset.showTooltip = true;
                };
                SheetAssetCompositionComponent.prototype.onMouseOutOfAsset = function (inAsset) {
                    inAsset.showTooltip = false;
                };
                SheetAssetCompositionComponent.prototype.onMouseOver = function (inAsset) {
                    if (!inAsset.hasPriceData()) {
                        this.resetMessages();
                        this._sheetBackEnd.getStockPrices(inAsset);
                    }
                };
                SheetAssetCompositionComponent.prototype.resetMessages = function () {
                    this.sheetMessage = null;
                    this.errorMessage = null;
                };
                SheetAssetCompositionComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-assetComposition',
                        providers: [],
                        templateUrl: '../templates/sheetAssetComposition.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetDetail.css', '../styles/tooltips.css'],
                        directives: [slider_component_1.Slider, sheetReturnData_component_1.SheetReturnData, sheetCompositionCharts_component_1.SheetCompositionCharts],
                        inputs: ['sheet', 'editMode', 'showCharts', 'showInvestmentAmounts'],
                    }), 
                    __metadata('design:paramtypes', [sheetWeightAdjuster_service_1.SheetWeightAdjuster, userLogged_1.UserLogged, sheetBackEnd_service_1.SheetBackEnd])
                ], SheetAssetCompositionComponent);
                return SheetAssetCompositionComponent;
            })();
            exports_1("SheetAssetCompositionComponent", SheetAssetCompositionComponent);
        }
    }
});
//# sourceMappingURL=sheetAssetComposition.component.js.map