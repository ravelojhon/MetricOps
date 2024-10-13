
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndicatorFormComponent } from './containers/indicator-form/indicator-form.component';
import { IndicatorListComponent } from './containers/indicator-list/indicator-list.component';
import { EmptyRouteComponent } from '../../empty-route/empty-route.component';

const routes: Routes = [
  { path: '', component: IndicatorListComponent },
  { path: 'form', component: IndicatorFormComponent, },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class IndicatorModule { }
