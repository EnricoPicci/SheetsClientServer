System.register(['./proposalInvestmentJSON', './assetGroupJSON'], function(exports_1) {
    var proposalInvestmentJSON_1, assetGroupJSON_1;
    var ProposalJSON;
    return {
        setters:[
            function (proposalInvestmentJSON_1_1) {
                proposalInvestmentJSON_1 = proposalInvestmentJSON_1_1;
            },
            function (assetGroupJSON_1_1) {
                assetGroupJSON_1 = assetGroupJSON_1_1;
            }],
        execute: function() {
            ProposalJSON = (function () {
                function ProposalJSON() {
                    this.assetGroupJSONs = new Array();
                    this.proposalInvestmentJSONs = new Array();
                }
                ProposalJSON.prototype.fill = function (inProposal) {
                    this.id = +inProposal.id;
                    this.sheetId = inProposal.sheet.id;
                    this.customerId = inProposal.customerId;
                    this.title = inProposal.sheet.title;
                    this.personalized = inProposal.sheet.isPersonalized();
                    this.imageUrl = inProposal.sheet.imageUrl;
                    this.originalSheetID = inProposal.sheet.originalSheetID;
                    this.totalInvestmentAmount = inProposal.getTotalInvestment();
                    this.comment = inProposal.comment;
                    for (var i = 0; i < inProposal.assetGroups.length; i++) {
                        var assetGroupJSON = new assetGroupJSON_1.AssetGroupJSON();
                        assetGroupJSON.fillForProposal(inProposal.assetGroups[i]);
                        this.assetGroupJSONs.push(assetGroupJSON);
                    }
                    for (var i = 0; i < inProposal.investmentElements.length; i++) {
                        var proposalInvestmentJSON = new proposalInvestmentJSON_1.ProposalInvestmentJSON();
                        proposalInvestmentJSON.fill(inProposal.investmentElements[i]);
                        this.proposalInvestmentJSONs.push(proposalInvestmentJSON);
                    }
                };
                ProposalJSON.prototype.fillForBuyOrder = function (inProposal) {
                    this.id = +inProposal.id;
                    this.sheetId = inProposal.sheet.id;
                    this.customerId = inProposal.customerId;
                    this.totalInvestmentAmount = inProposal.getTotalInvestment();
                    for (var i = 0; i < inProposal.assetGroups.length; i++) {
                        var assetGroupJSON = new assetGroupJSON_1.AssetGroupJSON();
                        assetGroupJSON.fillForBuyOrder(inProposal.assetGroups[i]);
                        this.assetGroupJSONs.push(assetGroupJSON);
                    }
                    for (var i = 0; i < inProposal.investmentElements.length; i++) {
                        var proposalInvestmentJSON = new proposalInvestmentJSON_1.ProposalInvestmentJSON();
                        proposalInvestmentJSON.fill(inProposal.investmentElements[i]);
                        this.proposalInvestmentJSONs.push(proposalInvestmentJSON);
                    }
                };
                return ProposalJSON;
            })();
            exports_1("ProposalJSON", ProposalJSON);
        }
    }
});
//# sourceMappingURL=proposalJSON.js.map