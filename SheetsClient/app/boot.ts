import {provide}    from 'angular2/core';
import {enableProdMode} from 'angular2/core';

import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

import {AppComponent} from './app.component';
import {SheetBackEnd} from './sheetBackEnd.service';
import {BackEndClientMock} from '../externalServicesClientMock/backEnd.clientMock.service';
import {BackEndRest} from '../externalServicesRest/backEnd.restServer.service';
import {SheetWeightAdjuster} from './sheetWeightAdjuster.service';
import {UserLogged} from './userLogged'; 
import {Environment} from '../environmentSettings/environment.service';

enableProdMode();

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(SheetBackEnd, {useClass: BackEndRest}), 
                        SheetWeightAdjuster, UserLogged, Environment]);

