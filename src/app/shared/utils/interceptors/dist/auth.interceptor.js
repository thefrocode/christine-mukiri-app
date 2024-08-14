"use strict";
exports.__esModule = true;
exports.authInterceptor = void 0;
var core_1 = require("@angular/core");
var auth_store_1 = require("../../../auth/data-access/auth.store");
exports.authInterceptor = function (req, next) {
    var token = core_1.inject(auth_store_1.AuthStore).token;
    if (token()) {
        var cloned = req.clone({
            setHeaders: {
                Authorization: "Bearer " + token()
            }
        });
        return next(cloned);
    }
    else {
        return next(req);
    }
};
