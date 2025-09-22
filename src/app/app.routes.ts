import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Products } from './products/products';
export const routes: Routes = [

    {
        path:'products',
        component:Products
    },
    {
        path:'login',
        component:Login
    }
];
