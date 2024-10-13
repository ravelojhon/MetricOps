import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { IndicatorService } from "../../../../services/indicator.service";
import { Subscription, take } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

export interface IndicatorInterface {
    indicatorID: number;
    name: string;
    type: string;
    goal: number;
    minimum: number;
    maximum: number;
    description: string;
  }

  const ELEMENT_DATA: IndicatorInterface[] = [
    {indicatorID: 1, name: 'Producción por empleado', type: 'Productividad', goal: 80, minimum: 10, maximum: 100, description: ''},
    {indicatorID: 2, name: 'Tasa de rechazo', type: 'Calidad', goal: 80, minimum: 50, maximum: 100, description: ''},
    {indicatorID: 3, name: 'Tiempo de entrega', type: 'Cumplimiento de plazos', goal: 90, minimum: 10, maximum: 100, description: ''},
    {indicatorID: 4, name: 'Costos por unidad producida', type: 'Costos operativos', goal: 85, minimum: 10, maximum: 100, description: ''}
  ];

@Component({
    selector: 'indicator-list',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatTableModule],
    templateUrl: './indicator-list.component.html',
    styleUrl: './indicator-list.component.scss'
})

export class IndicatorListComponent {
    displayedColumns: string[] = ['indicatorID', 'name', 'type', 'goal', 'minimum', 'maximum', 'operation'];
    dataSource = ELEMENT_DATA;
    router = inject(Router);
    ActivatedRoute = inject(ActivatedRoute);
    protected subscriptions: Subscription[] = [];
    indicatorService = inject(IndicatorService);
    data: any = {};

    ngAfterContentInit() {
        
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub && sub.unsubscribe());
    }

    new(){
        this.router.navigate(['./form'], { relativeTo: this.ActivatedRoute });
    }

}