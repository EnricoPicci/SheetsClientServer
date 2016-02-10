System.register([], function(exports_1) {
    var UserLogged;
    return {
        setters:[],
        execute: function() {
            UserLogged = (function () {
                function UserLogged() {
                }
                UserLogged.prototype.isCustomer = function () {
                    return this.pbId == null;
                };
                return UserLogged;
            })();
            exports_1("UserLogged", UserLogged);
        }
    }
});
//# sourceMappingURL=userLogged.js.map