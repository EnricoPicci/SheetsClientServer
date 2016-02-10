System.register(['./assetGroupJSON'], function(exports_1) {
    var assetGroupJSON_1;
    var ProposalJSON;
    return {
        setters:[
            function (assetGroupJSON_1_1) {
                assetGroupJSON_1 = assetGroupJSON_1_1;
            }],
        execute: function() {
            ProposalJSON = (function () {
                function ProposalJSON() {
                    this.assetGroupJSONs = new Array();
                }
                ProposalJSON.prototype.fill = function (inProposal) {
                    this.id = +inProposal.id;
                    this.sheetId = inProposal.sheetId;
                    this.customerId = inProposal.customerId;
                    for (var i = 0; i < inProposal.assetGroups.length; i++) {
                        var assetGroupJSON = new assetGroupJSON_1.AssetGroupJSON();
                        assetGroupJSON.fillForProposal(inProposal.assetGroups[i]);
                        this.assetGroupJSONs.push(assetGroupJSON);
                    }
                };
                return ProposalJSON;
            })();
            exports_1("ProposalJSON", ProposalJSON);
        }
    }
});
//# sourceMappingURL=proposalJSON.js.map