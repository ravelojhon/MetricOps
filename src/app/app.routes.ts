import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [
    { 
        path: 'indicator', 
        loadChildren: () =>
            import('./pages/indicator/indicator.module').then(m => m.IndicatorModule),    
    },
    { path: '**', component: EmptyRouteComponent },
];
