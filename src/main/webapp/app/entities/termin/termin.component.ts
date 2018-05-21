import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Termin } from './termin.model';
import { TerminService } from './termin.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-termin',
    templateUrl: './termin.component.html'
})
export class TerminComponent implements OnInit, OnDestroy {
termins: Termin[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private terminService: TerminService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.terminService.query().subscribe(
            (res: HttpResponse<Termin[]>) => {
                this.termins = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTermins();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Termin) {
        return item.id;
    }
    registerChangeInTermins() {
        this.eventSubscriber = this.eventManager.subscribe('terminListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
