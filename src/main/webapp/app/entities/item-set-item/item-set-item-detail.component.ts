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

    itemSet_item: ItemSetItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private itemSet_itemService: ItemSetItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInItemSet_items();
    }

    load(id) {
        this.itemSet_itemService.find(id)
            .subscribe((itemSet_itemResponse: HttpResponse<ItemSetItem>) => {
                this.itemSet_item = itemSet_itemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInItemSet_items() {
        this.eventSubscriber = this.eventManager.subscribe(
            'itemSet_itemListModification',
            (response) => this.load(this.itemSet_item.id)
        );
    }
}
