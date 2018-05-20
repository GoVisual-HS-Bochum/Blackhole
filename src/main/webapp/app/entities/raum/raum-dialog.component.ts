import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Raum } from './raum.model';
import { RaumPopupService } from './raum-popup.service';
import { RaumService } from './raum.service';

@Component({
    selector: 'jhi-raum-dialog',
    templateUrl: './raum-dialog.component.html'
})
export class RaumDialogComponent implements OnInit {

    raum: Raum;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private raumService: RaumService,
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
        if (this.raum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.raumService.update(this.raum));
        } else {
            this.subscribeToSaveResponse(
                this.raumService.create(this.raum));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Raum>>) {
        result.subscribe((res: HttpResponse<Raum>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Raum) {
        this.eventManager.broadcast({ name: 'raumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-raum-popup',
    template: ''
})
export class RaumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private raumPopupService: RaumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.raumPopupService
                    .open(RaumDialogComponent as Component, params['id']);
            } else {
                this.raumPopupService
                    .open(RaumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
