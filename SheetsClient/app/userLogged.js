System.register([], function(exports_1) {
    var UserLogged;
    return {
        setters:[],
        execute: function() {
            UserLogged = (function () {
                function UserLogged() {
                    this.pbId = 'Jane Advisor';
                    this.customerId = 'Jack Client';
                    this.mail = 'jack.client@gmail.com';
                }
                UserLogged.prototype.isCustomer = function () {
                    return this.pbId == null || this.pbId.trim().length == 0;
                };
                return UserLogged;
            })();
            exports_1("UserLogged", UserLogged);
        }
    }
});
//# sourceMappingURL=userLogged.js.map