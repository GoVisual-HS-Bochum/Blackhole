import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Termin } from './termin.model';
import { TerminPopupService } from './termin-popup.service';
import { TerminService } from './termin.service';
import { Raum, RaumService } from '../raum';

@Component({
    selector: 'jhi-termin-dialog',
    templateUrl: './termin-dialog.component.html'
})
export class TerminDialogComponent implements OnInit {

    termin: Termin;
    isSaving: boolean;

    raums: Raum[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private terminService: TerminService,
        private raumService: RaumService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.raumService.query()
            .subscribe((res: HttpResponse<Raum[]>) => { this.raums = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.termin.id !== undefined) {
            this.subscribeToSaveResponse(
                this.terminService.update(this.termin));
        } else {
            this.subscribeToSaveResponse(
                this.terminService.create(this.termin));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Termin>>) {
        result.subscribe((res: HttpResponse<Termin>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Termin) {
        this.eventManager.broadcast({ name: 'terminListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRaumById(index: number, item: Raum) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-termin-popup',
    template: ''
})
export class TerminPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private terminPopupService: TerminPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.terminPopupService
                    .open(TerminDialogComponent as Component, params['id']);
            } else {
                this.terminPopupService
                    .open(TerminDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
