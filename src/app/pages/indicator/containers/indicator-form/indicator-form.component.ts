import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { IndicatorService } from "../../../../services/indicator.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControlPipe } from "../../../shared/pipes/form-control.pipe";
import { RequiredPipe } from "../../../shared/pipes/required.pipe";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { ActivatedRoute, Router } from "@angular/router";
import { MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
} from '@angular/material/dialog';
import { IndicatorAdapter } from "./indicator-adapter";

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
    providers: [
        provideNgxMask(),
        { provide: 'adapter', useValue: IndicatorAdapter }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class IndicatorFormComponent implements OnInit {
    editForm: boolean;
    dataResolver: any;
    readonly menuTrigger = viewChild.required(MatMenuTrigger);
    indicatorService = inject(IndicatorService);
    router = inject(Router);
    ActivatedRoute = inject(ActivatedRoute);
    readonly dialog = inject(MatDialog);
    fb = inject(FormBuilder);
    form: FormGroup;

    ngOnInit() {

        this.form = this.fb.group({
            indicatorid: [0, Validators.required],
            name: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            goal: new FormControl('', [Validators.required]),
            minimum: new FormControl('', [Validators.required]),
            maximum: new FormControl('', [Validators.required]),
            description: new FormControl('', []),
        });

        const {
            snapshot: {
                params: { id },
            },
        } = this.ActivatedRoute;
        this.editForm = !!id;
        if (this.editForm) {
            //this.form.get('id').setValue(id);
            console.log("eitar");
            this.indicatorService.getById(id).subscribe(
                (data: any) => {
                    this.form.patchValue(new IndicatorAdapter(data));
                    this.dataResolver = data;
                },
                (error: any) => console.log("error", error)
            );
        }
    }



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

    saveIndicator() {
        this.indicatorService.isloading$ = true;
        const body = this.form.value;
        setTimeout(() => {
            this.indicatorService.post("indicator", body)
                .subscribe((data: any) => {
                    this.indicatorService.isloading$ = false;
                    this.back();
                }, (error: any) => console.log("error", error)
                );
        }, 1000);

    }
    
    putIndicator(){
        this.indicatorService.isloading$ = true;
        const body = this.form.value;
        setTimeout(() => {
            this.indicatorService.put(this.form.value.indicatorid,"indicator", body)
                .subscribe((data: any) => {
                    this.indicatorService.isloading$ = false;
                    this.back();
                }, (error: any) => console.log("error", error)
                );
        }, 1000);
    }

    back() {
        let string = '../'
        if (this.editForm) string = '../../';
        this.router.navigate([string], { relativeTo: this.ActivatedRoute });
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