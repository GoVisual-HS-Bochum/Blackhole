import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Groesse } from './groesse.model';
import { GroesseService } from './groesse.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-groesse',
    templateUrl: './groesse.component.html'
})
export class GroesseComponent implements OnInit, OnDestroy {
groesses: Groesse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private groesseService: GroesseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.groesseService.query().subscribe(
            (res: HttpResponse<Groesse[]>) => {
                this.groesses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGroesses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Groesse) {
        return item.id;
    }
    registerChangeInGroesses() {
        this.eventSubscriber = this.eventManager.subscribe('groesseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
