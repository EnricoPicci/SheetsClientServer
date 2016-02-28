System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var HttpErrorManagerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HttpErrorManagerComponent = (function () {
                function HttpErrorManagerComponent() {
                    this.errorMessage = 'We are noticing issues in the communication with the Server. We r working hard to solve them asap. We appreciate your patience.';
                    this.showDetails = false;
                }
                HttpErrorManagerComponent.prototype.toggleShowDetails = function () {
                    this.showDetails = !this.showDetails;
                };
                HttpErrorManagerComponent.prototype.getToggleText = function () {
                    var toggleText;
                    if (this.showDetails) {
                        toggleText = 'Hide details';
                    }
                    else {
                        toggleText = 'Show some nitty gritty details';
                    }
                    return toggleText;
                };
                HttpErrorManagerComponent.prototype.getDetails = function () {
                    var details = '';
                    if (this.httpErrorResponse) {
                        //details = this.httpErrorResponse.text();
                        details = this.httpErrorResponse;
                    }
                    return details;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], HttpErrorManagerComponent.prototype, "errorMessage", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], HttpErrorManagerComponent.prototype, "httpErrorResponse", void 0);
                HttpErrorManagerComponent = __decorate([
                    core_1.Component({
                        selector: 'httpErrorManager',
                        providers: [],
                        template: "\n        <div id=\"errorMessage\" [hidden]=\"!httpErrorResponse\" class=\"httpAlert httpAlert-danger\">\n            {{errorMessage}}\n            <span (click)=\"toggleShowDetails()\" style=\"text-decoration: underline; color: #1BA2DC; cursor: pointer;\">{{getToggleText()}}</span>\n        </div>\n        <div id=\"errorMessageDetails\" [hidden]=\"!showDetails\" class=\"httpAlert httpAlert-danger\">\n            {{getDetails()}}\n            <span (click)=\"toggleShowDetails()\" style=\"text-decoration: underline; color: #1BA2DC; cursor: pointer;\">{{getToggleText()}}</span>\n        </div>\n    ",
                        styleUrls: ['../styles/errorManager.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], HttpErrorManagerComponent);
                return HttpErrorManagerComponent;
            }());
            exports_1("HttpErrorManagerComponent", HttpErrorManagerComponent);
        }
    }
});
//# sourceMappingURL=httpErrorManager.component.js.map