System.register([], function(exports_1) {
    var Proposal;
    return {
        setters:[],
        execute: function() {
            Proposal = (function () {
                function Proposal(inAssets, inCustomerId, inSheetId) {
                    this.investmentElements = new Array();
                    this.assetGroups = inAssets;
                    this.customerId = inCustomerId;
                    this.sheetId = inSheetId;
                }
                Proposal.prototype.getTotalInvestment = function () {
                    var ret = 0;
                    for (var i = 0; i < this.investmentElements.length; i++) {
                        ret = ret + this.investmentElements[i].amount;
                    }
                    return ret;
                };
                Proposal.prototype.updateInvestment = function () {
                    var totalInvestment = this.getTotalInvestment();
                    this.splitInvestmentOnAssets(totalInvestment);
                };
                Proposal.prototype.splitInvestmentOnAssets = function (inInvestment) {
                    for (var i = 0; i < this.assetGroups.length; i++) {
                        var assetGroup = this.assetGroups[i];
                        var assetGroupWeight = assetGroup.weight / 100;
                        assetGroup.investmentAmount = inInvestment * assetGroupWeight;
                        for (var j = 0; j < assetGroup.assets.length; j++) {
                            var asset = assetGroup.assets[j];
                            var assetWeight = asset.weight / 100;
                            asset.investmentAmount = inInvestment * assetWeight;
                        }
                    }
                };
                return Proposal;
            })();
            exports_1("Proposal", Proposal);
        }
    }
});
//# sourceMappingURL=proposal.js.map