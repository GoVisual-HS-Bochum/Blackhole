import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItemSet } from './item-set.model';
import { ItemSetService } from './item-set.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-item-set',
    templateUrl: './item-set.component.html'
})
export class ItemSetComponent implements OnInit, OnDestroy {
itemSets: ItemSet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private itemSetService: ItemSetService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.itemSetService.query().subscribe(
            (res: HttpResponse<ItemSet[]>) => {
                this.itemSets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInItemSets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ItemSet) {
        return item.id;
    }
    registerChangeInItemSets() {
        this.eventSubscriber = this.eventManager.subscribe('itemSetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
