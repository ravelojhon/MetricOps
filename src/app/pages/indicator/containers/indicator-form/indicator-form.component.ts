import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { IndicatorService } from "../../../../services/indicator.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControlPipe } from "../../../shared/pipes/form-control.pipe";
import { RequiredPipe } from "../../../shared/pipes/required.pipe";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { ActivatedRoute, Router } from "@angular/router";
import { MatMenuTrigger } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
} from '@angular/material/dialog';

@Component({
    selector: 'indicator-form',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        FormControlPipe,
        RequiredPipe,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        NgxMaskDirective, NgxMaskPipe
    ],
    templateUrl: './indicator-form.component.html',
    styleUrl: './indicator-form.component.scss',
    providers: [provideNgxMask()],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class IndicatorFormComponent {
    readonly menuTrigger = viewChild.required(MatMenuTrigger);
    indicatorService = inject(IndicatorService);
    router = inject(Router);
    ActivatedRoute = inject(ActivatedRoute);
    readonly dialog = inject(MatDialog);
    form = signal<FormGroup>(
        new FormGroup({
            name: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            goal: new FormControl('', [Validators.required]),
            minimum: new FormControl('', [Validators.required]),
            maximum: new FormControl('', [Validators.required]),
            description: new FormControl('', []),
        })
    );

    validateFormat(event: any) {
        let key;
        if (event.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
            key = event.keyCode;
            key = String.fromCharCode(key);
        }
        const regex = /[0-9]|\./;
        if (!regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) {
                event.preventDefault();
            }
        }
    }

    getInfoPerson() {
        this.indicatorService.isloading$ = true;
       
    }

    back(){
        this.router.navigate(['../'], { relativeTo: this.ActivatedRoute });
    }

}



@Component({
    selector: 'dialog-from-menu-dialog',
    template: `
        <mat-dialog-content>Indicador no encontrado</mat-dialog-content>
        <mat-dialog-actions>
        	<button mat-button mat-dialog-close>Cerrar</button>
        </mat-dialog-actions>`,
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFromMenuExampleDialog { }