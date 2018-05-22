import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItemSetItem } from './item-set-item.model';
import { ItemSetItemService } from './item-set-item.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-item-set-item',
    templateUrl: './item-set-item.component.html'
})
export class ItemSetItemComponent implements OnInit, OnDestroy {
itemSetItems: ItemSetItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private itemSetItemService: ItemSetItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.itemSetItemService.query().subscribe(
            (res: HttpResponse<ItemSetItem[]>) => {
                this.itemSetItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInItemSetItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ItemSetItem) {
        return item.id;
    }
    registerChangeInItemSetItems() {
        this.eventSubscriber = this.eventManager.subscribe('itemSetItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
