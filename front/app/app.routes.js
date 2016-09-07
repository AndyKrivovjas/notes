"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home.component');
var auth_component_1 = require('./components/auth.component');
var mainRoutes = [
    { path: 'login', component: auth_component_1.LoginComponent },
    {
        path: '',
        component: home_component_1.HomeComponent,
        children: []
    },
];
exports.mainRouting = router_1.RouterModule.forRoot(mainRoutes);
//# sourceMappingURL=app.routes.js.map