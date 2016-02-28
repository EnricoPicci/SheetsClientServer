System.register([], function(exports_1) {
    var ProposalInvestmentSourceJSON;
    return {
        setters:[],
        execute: function() {
            ProposalInvestmentSourceJSON = (function () {
                function ProposalInvestmentSourceJSON() {
                }
                ProposalInvestmentSourceJSON.prototype.fill = function (inProposalInvestmentSource) {
                    this.type = inProposalInvestmentSource.type;
                    this.id = inProposalInvestmentSource.id;
                };
                return ProposalInvestmentSourceJSON;
            })();
            exports_1("ProposalInvestmentSourceJSON", ProposalInvestmentSourceJSON);
        }
    }
});
//# sourceMappingURL=proposalInvestmentSourceJSON.js.map