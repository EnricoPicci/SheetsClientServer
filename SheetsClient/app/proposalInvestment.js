System.register([], function(exports_1) {
    var ProposalInvestment;
    return {
        setters:[],
        execute: function() {
            ProposalInvestment = (function () {
                function ProposalInvestment(inSource) {
                    this.amount = 0;
                    this.isAmountNumberValid = true;
                    this.source = inSource;
                }
                ProposalInvestment.prototype.getAmountFormatted = function () {
                    var formattedString = '';
                    if (this.amount != 0) {
                        formattedString = this.amount.toLocaleString('it-IT');
                    }
                    return formattedString;
                };
                ProposalInvestment.prototype.getErrorMessage = function () {
                    var message = 'Error. Amount not valid.';
                    if (!this.isAmountNumberValid) {
                        message = 'Amount not valid';
                    }
                    else if (this.isHigherThanCapacity()) {
                        message = 'Amount higher than capacity';
                    }
                    return message;
                };
                ProposalInvestment.prototype.isHigherThanCapacity = function () {
                    return this.amount > this.source.maxCapacity;
                };
                ProposalInvestment.prototype.isValid = function () {
                    return this.isAmountNumberValid && !this.isHigherThanCapacity();
                };
                return ProposalInvestment;
            })();
            exports_1("ProposalInvestment", ProposalInvestment);
        }
    }
});
//# sourceMappingURL=proposalInvestment.js.map