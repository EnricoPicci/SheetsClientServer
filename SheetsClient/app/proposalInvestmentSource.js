System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProposalInvestmentSource;
    return {
        setters:[],
        execute: function() {
            ProposalInvestmentSource = (function () {
                function ProposalInvestmentSource(inType, inId, inMaxCapacity) {
                    this.type = inType;
                    this.id = inId;
                    this.maxCapacity = inMaxCapacity;
                }
                ProposalInvestmentSource.prototype.getMaxCapacityFormatted = function () {
                    var ret = '';
                    if (this.maxCapacity) {
                        //ret = this.maxCapacity.toLocaleString('it-IT') + ' €';
                        ret = (Math.round(this.maxCapacity * 100) / 100).toLocaleString('it-IT');
                    }
                    return ret;
                };
                return ProposalInvestmentSource;
            }());
            exports_1("ProposalInvestmentSource", ProposalInvestmentSource);
        }
    }
});
//# sourceMappingURL=proposalInvestmentSource.js.map