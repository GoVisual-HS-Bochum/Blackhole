import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PositionRaum } from './position-raum.model';
import { PositionRaumService } from './position-raum.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-position-raum',
    templateUrl: './position-raum.component.html'
})
export class PositionRaumComponent implements OnInit, OnDestroy {
positionRaums: PositionRaum[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private positionRaumService: PositionRaumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.positionRaumService.query().subscribe(
            (res: HttpResponse<PositionRaum[]>) => {
                this.positionRaums = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPositionRaums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PositionRaum) {
        return item.id;
    }
    registerChangeInPositionRaums() {
        this.eventSubscriber = this.eventManager.subscribe('positionRaumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
