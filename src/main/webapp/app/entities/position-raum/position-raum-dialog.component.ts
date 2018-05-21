import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PositionRaum } from './position-raum.model';
import { PositionRaumPopupService } from './position-raum-popup.service';
import { PositionRaumService } from './position-raum.service';

@Component({
    selector: 'jhi-position-raum-dialog',
    templateUrl: './position-raum-dialog.component.html'
})
export class PositionRaumDialogComponent implements OnInit {

    positionRaum: PositionRaum;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private positionRaumService: PositionRaumService,
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
        if (this.positionRaum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.positionRaumService.update(this.positionRaum));
        } else {
            this.subscribeToSaveResponse(
                this.positionRaumService.create(this.positionRaum));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PositionRaum>>) {
        result.subscribe((res: HttpResponse<PositionRaum>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PositionRaum) {
        this.eventManager.broadcast({ name: 'positionRaumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-position-raum-popup',
    template: ''
})
export class PositionRaumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionRaumPopupService: PositionRaumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.positionRaumPopupService
                    .open(PositionRaumDialogComponent as Component, params['id']);
            } else {
                this.positionRaumPopupService
                    .open(PositionRaumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
