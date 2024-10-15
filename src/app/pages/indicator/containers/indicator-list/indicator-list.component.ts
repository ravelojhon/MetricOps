import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { IndicatorService } from "../../../../services/indicator.service";
import { Subscription, take } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface IndicatorInterface {
    indicatorid: number;
    name: string;
    type: string;
    goal: number;
    minimum: number;
    maximum: number;
    description: string;
}

@Component({
    selector: 'indicator-list',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatTableModule],
    templateUrl: './indicator-list.component.html',
    styleUrl: './indicator-list.component.scss',
    providers: [IndicatorService],
})

export class IndicatorListComponent {
    displayedColumns: string[] = ['indicatorid', 'name', 'type', 'goal', 'minimum', 'maximum', 'operation'];
    dataSource: IndicatorInterface[] = [];
    router = inject(Router);
    ActivatedRoute = inject(ActivatedRoute);
    protected subscriptions: Subscription[] = [];
    indicatorService = inject(IndicatorService);
    data: any = {};

    ngAfterContentInit() {
        this.indicatorService.getAll("indicator").subscribe(
            (data: any) => this.dataSource = data,
            (error: any) => console.log("error", error)
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub && sub.unsubscribe());
    }

    new() {
        this.router.navigate(['./form'], { relativeTo: this.ActivatedRoute });
    }

    getAll() {
        this.indicatorService.getAll("indicator").subscribe(
            (data: any) => this.dataSource = data,
            (error: any) => console.log("error", error)
        );
    }

    edit({ indicatorid }: any) {
        this.router.navigate([`form`, indicatorid], {
            relativeTo: this.ActivatedRoute,
        });
    }

    remove({ indicatorid }: any) {
        this.indicatorService.delete("indicator", indicatorid).subscribe(
                (data: any) => this.getAll,
                (error: any) => console.log("error", error)
            );
    }

}