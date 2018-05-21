import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Raum } from './raum.model';
import { RaumService } from './raum.service';

@Component({
    selector: 'jhi-raum-detail',
    templateUrl: './raum-detail.component.html'
})
export class RaumDetailComponent implements OnInit, OnDestroy {

    raum: Raum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private raumService: RaumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRaums();
    }

    load(id) {
        this.raumService.find(id)
            .subscribe((raumResponse: HttpResponse<Raum>) => {
                this.raum = raumResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRaums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'raumListModification',
            (response) => this.load(this.raum.id)
        );
    }
}
