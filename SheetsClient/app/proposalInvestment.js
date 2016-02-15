System.register([], function(exports_1) {
    var ProposalInvestment;
    return {
        setters:[],
        execute: function() {
            ProposalInvestment = (function () {
                function ProposalInvestment(inSource) {
                    this.amount = 0;
                    this.source = inSource;
                }
                ProposalInvestment.prototype.getAmountFormatted = function () {
                    var formattedString = '';
                    if (this.amount != 0) {
                        formattedString = this.amount.toLocaleString('it');
                    }
                    return formattedString;
                };
                return ProposalInvestment;
            })();
            exports_1("ProposalInvestment", ProposalInvestment);
        }
    }
});
//# sourceMappingURL=proposalInvestment.js.map