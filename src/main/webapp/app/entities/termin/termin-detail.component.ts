import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Termin } from './termin.model';
import { TerminService } from './termin.service';

@Component({
    selector: 'jhi-termin-detail',
    templateUrl: './termin-detail.component.html'
})
export class TerminDetailComponent implements OnInit, OnDestroy {

    termin: Termin;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private terminService: TerminService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTermins();
    }

    load(id) {
        this.terminService.find(id)
            .subscribe((terminResponse: HttpResponse<Termin>) => {
                this.termin = terminResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTermins() {
        this.eventSubscriber = this.eventManager.subscribe(
            'terminListModification',
            (response) => this.load(this.termin.id)
        );
    }
}
