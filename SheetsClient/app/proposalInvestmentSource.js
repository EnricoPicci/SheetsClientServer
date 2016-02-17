System.register([], function(exports_1) {
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
                        ret = this.maxCapacity.toLocaleString() + ' €';
                    }
                    return ret;
                };
                return ProposalInvestmentSource;
            })();
            exports_1("ProposalInvestmentSource", ProposalInvestmentSource);
        }
    }
});
//# sourceMappingURL=proposalInvestmentSource.js.map