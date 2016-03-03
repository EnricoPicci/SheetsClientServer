System.register([], function(exports_1) {
    var Proposal;
    return {
        setters:[],
        execute: function() {
            Proposal = (function () {
                //public isValid = false;
                function Proposal(inAssets, inCustomerId, inSheet) {
                    this.investmentElements = new Array();
                    this.assetGroups = inAssets;
                    this.customerId = inCustomerId;
                    this.sheet = inSheet;
                }
                Proposal.prototype.getTotalInvestment = function () {
                    var ret = 0;
                    for (var i = 0; i < this.investmentElements.length; i++) {
                        ret = ret + this.investmentElements[i].amount;
                    }
                    return ret;
                };
                Proposal.prototype.getTotalInvestmentFormatted = function () {
                    //return this.getTotalInvestment().toLocaleString('it-IT') + ' €';
                    return (Math.round(this.getTotalInvestment() * 100) / 100).toLocaleString('it-IT');
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
                Proposal.prototype.getCommentShortText = function () {
                    var commentShortText = this.comment;
                    var commentTextLength = this.comment.length;
                    if (commentTextLength > 100) {
                        commentShortText = this.comment.substring(0, 100) + '...';
                    }
                    return commentShortText;
                };
                Proposal.prototype.isValid = function () {
                    var validComment = (this.comment != null) && (this.comment.length > 0);
                    var validInvestmentElements = true;
                    for (var i = 0; i < this.investmentElements.length; i++) {
                        validInvestmentElements = validInvestmentElements
                            && this.investmentElements[i].isValid();
                    }
                    return validComment && validInvestmentElements;
                };
                return Proposal;
            })();
            exports_1("Proposal", Proposal);
        }
    }
});
//# sourceMappingURL=proposal.js.map