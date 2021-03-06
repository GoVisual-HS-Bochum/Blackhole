import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItemSetItem } from './item-set-item.model';
import { ItemSetItemPopupService } from './item-set-item-popup.service';
import { ItemSetItemService } from './item-set-item.service';
import { ItemSet, ItemSetService } from '../item-set';
import { Item, ItemService } from '../item';

@Component({
    selector: 'jhi-item-set-item-dialog',
    templateUrl: './item-set-item-dialog.component.html'
})
export class ItemSetItemDialogComponent implements OnInit {

    itemSetItem: ItemSetItem;
    isSaving: boolean;

    itemsets: ItemSet[];

    items: Item[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private itemSetItemService: ItemSetItemService,
        private itemSetService: ItemSetService,
        private itemService: ItemService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.itemSetService.query()
            .subscribe((res: HttpResponse<ItemSet[]>) => { this.itemsets = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.itemService.query()
            .subscribe((res: HttpResponse<Item[]>) => { this.items = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.itemSetItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.itemSetItemService.update(this.itemSetItem));
        } else {
            this.subscribeToSaveResponse(
                this.itemSetItemService.create(this.itemSetItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ItemSetItem>>) {
        result.subscribe((res: HttpResponse<ItemSetItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ItemSetItem) {
        this.eventManager.broadcast({ name: 'itemSetItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackItemSetById(index: number, item: ItemSet) {
        return item.id;
    }

    trackItemById(index: number, item: Item) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-item-set-item-popup',
    template: ''
})
export class ItemSetItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemSetItemPopupService: ItemSetItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.itemSetItemPopupService
                    .open(ItemSetItemDialogComponent as Component, params['id']);
            } else {
                this.itemSetItemPopupService
                    .open(ItemSetItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
