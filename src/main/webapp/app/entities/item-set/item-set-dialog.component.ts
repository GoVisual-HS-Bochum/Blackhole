import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ItemSet } from './item-set.model';
import { ItemSetPopupService } from './item-set-popup.service';
import { ItemSetService } from './item-set.service';

@Component({
    selector: 'jhi-item-set-dialog',
    templateUrl: './item-set-dialog.component.html'
})
export class ItemSetDialogComponent implements OnInit {

    itemSet: ItemSet;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private itemSetService: ItemSetService,
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
        if (this.itemSet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.itemSetService.update(this.itemSet));
        } else {
            this.subscribeToSaveResponse(
                this.itemSetService.create(this.itemSet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ItemSet>>) {
        result.subscribe((res: HttpResponse<ItemSet>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ItemSet) {
        this.eventManager.broadcast({ name: 'itemSetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-item-set-popup',
    template: ''
})
export class ItemSetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemSetPopupService: ItemSetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.itemSetPopupService
                    .open(ItemSetDialogComponent as Component, params['id']);
            } else {
                this.itemSetPopupService
                    .open(ItemSetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
