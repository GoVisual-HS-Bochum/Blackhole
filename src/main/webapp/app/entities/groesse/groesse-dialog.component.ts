import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Groesse } from './groesse.model';
import { GroessePopupService } from './groesse-popup.service';
import { GroesseService } from './groesse.service';

@Component({
    selector: 'jhi-groesse-dialog',
    templateUrl: './groesse-dialog.component.html'
})
export class GroesseDialogComponent implements OnInit {

    groesse: Groesse;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private groesseService: GroesseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.groesse.id !== undefined) {
            this.subscribeToSaveResponse(
                this.groesseService.update(this.groesse));
        } else {
            this.subscribeToSaveResponse(
                this.groesseService.create(this.groesse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Groesse>>) {
        result.subscribe((res: HttpResponse<Groesse>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Groesse) {
        this.eventManager.broadcast({ name: 'groesseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-groesse-popup',
    template: ''
})
export class GroessePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groessePopupService: GroessePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.groessePopupService
                    .open(GroesseDialogComponent as Component, params['id']);
            } else {
                this.groessePopupService
                    .open(GroesseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
