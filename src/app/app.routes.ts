import { Routes } from '@angular/router';
import { IndexEleven } from './pages/index/index-eleven/index-eleven';
import { Buy } from './pages/buy/buy';
import { Sell } from './pages/sell/sell';
import { Contact } from './pages/contact/contact';
import { GridMap } from './pages/listing/grid-view/grid-map/grid-map';
import { PropertyDetail } from './pages/listing/property-detail/property-detail/property-detail';
import { AuthSignup } from './pages/auth/auth-signup/auth-signup';


export const routes: Routes = [
    {'path':'', component:IndexEleven},
    {'path':'buy', component:Buy},
    {'path':'sell', component:Sell},
    {'path':'contact', component:Contact},
    {'path':'grid-map', component:GridMap},
    {'path':'property-detail', component:PropertyDetail},
    {'path':'auth-signup', component:AuthSignup},
    {'path':'**', redirectTo: '', pathMatch: 'full'}
];
