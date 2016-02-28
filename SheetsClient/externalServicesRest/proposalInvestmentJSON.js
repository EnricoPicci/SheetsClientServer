System.register(['./proposalInvestmentSourceJSON'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var proposalInvestmentSourceJSON_1;
    var ProposalInvestmentJSON;
    return {
        setters:[
            function (proposalInvestmentSourceJSON_1_1) {
                proposalInvestmentSourceJSON_1 = proposalInvestmentSourceJSON_1_1;
            }],
        execute: function() {
            //import{AssetGroupJSON} from './assetGroupJSON';
            ProposalInvestmentJSON = (function () {
                function ProposalInvestmentJSON() {
                }
                ProposalInvestmentJSON.prototype.fill = function (inProposalInvestment) {
                    this.amount = inProposalInvestment.amount;
                    var proposalInvestmentSourceJSON = new proposalInvestmentSourceJSON_1.ProposalInvestmentSourceJSON();
                    this.source = proposalInvestmentSourceJSON;
                    proposalInvestmentSourceJSON.fill(inProposalInvestment.source);
                };
                return ProposalInvestmentJSON;
            }());
            exports_1("ProposalInvestmentJSON", ProposalInvestmentJSON);
        }
    }
});
//# sourceMappingURL=proposalInvestmentJSON.js.map