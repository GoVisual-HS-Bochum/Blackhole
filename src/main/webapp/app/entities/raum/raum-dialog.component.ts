import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Raum } from './raum.model';
import { RaumPopupService } from './raum-popup.service';
import { RaumService } from './raum.service';
import { PositionRaum, PositionRaumService } from '../position-raum';
import { Groesse, GroesseService } from '../groesse';
import { ItemSet, ItemSetService } from '../item-set';

@Component({
    selector: 'jhi-raum-dialog',
    templateUrl: './raum-dialog.component.html'
})
export class RaumDialogComponent implements OnInit {

    raum: Raum;
    isSaving: boolean;

    positionraums: PositionRaum[];

    groesses: Groesse[];

    itemsets: ItemSet[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private raumService: RaumService,
        private positionRaumService: PositionRaumService,
        private groesseService: GroesseService,
        private itemSetService: ItemSetService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.positionRaumService.query()
            .subscribe((res: HttpResponse<PositionRaum[]>) => { this.positionraums = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.groesseService.query()
            .subscribe((res: HttpResponse<Groesse[]>) => { this.groesses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.itemSetService.query()
            .subscribe((res: HttpResponse<ItemSet[]>) => { this.itemsets = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPositionRaumById(index: number, item: PositionRaum) {
        return item.id;
    }

    trackGroesseById(index: number, item: Groesse) {
        return item.id;
    }

    trackItemSetById(index: number, item: ItemSet) {
        return item.id;
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
