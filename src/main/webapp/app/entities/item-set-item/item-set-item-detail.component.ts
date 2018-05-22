import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ItemSetItem } from './item-set-item.model';
import { ItemSetItemService } from './item-set-item.service';

@Component({
    selector: 'jhi-item-set-item-detail',
    templateUrl: './item-set-item-detail.component.html'
})
export class ItemSetItemDetailComponent implements OnInit, OnDestroy {

    itemSetItem: ItemSetItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private itemSetItemService: ItemSetItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInItemSetItems();
    }

    load(id) {
        this.itemSetItemService.find(id)
            .subscribe((itemSetItemResponse: HttpResponse<ItemSetItem>) => {
                this.itemSetItem = itemSetItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInItemSetItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'itemSetItemListModification',
            (response) => this.load(this.itemSetItem.id)
        );
    }
}
