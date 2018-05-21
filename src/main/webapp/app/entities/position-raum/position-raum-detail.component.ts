import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PositionRaum } from './position-raum.model';
import { PositionRaumService } from './position-raum.service';

@Component({
    selector: 'jhi-position-raum-detail',
    templateUrl: './position-raum-detail.component.html'
})
export class PositionRaumDetailComponent implements OnInit, OnDestroy {

    positionRaum: PositionRaum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private positionRaumService: PositionRaumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPositionRaums();
    }

    load(id) {
        this.positionRaumService.find(id)
            .subscribe((positionRaumResponse: HttpResponse<PositionRaum>) => {
                this.positionRaum = positionRaumResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPositionRaums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'positionRaumListModification',
            (response) => this.load(this.positionRaum.id)
        );
    }
}
