import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ItemSet } from './item-set.model';
import { ItemSetService } from './item-set.service';

@Component({
    selector: 'jhi-item-set-detail',
    templateUrl: './item-set-detail.component.html'
})
export class ItemSetDetailComponent implements OnInit, OnDestroy {

    itemSet: ItemSet;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private itemSetService: ItemSetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInItemSets();
    }

    load(id) {
        this.itemSetService.find(id)
            .subscribe((itemSetResponse: HttpResponse<ItemSet>) => {
                this.itemSet = itemSetResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInItemSets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'itemSetListModification',
            (response) => this.load(this.itemSet.id)
        );
    }
}
