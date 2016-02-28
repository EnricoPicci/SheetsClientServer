System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            }());
            exports_1("ProposalInvestmentSourceJSON", ProposalInvestmentSourceJSON);
        }
    }
});
//# sourceMappingURL=proposalInvestmentSourceJSON.js.map