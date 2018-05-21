import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Groesse } from './groesse.model';
import { GroesseService } from './groesse.service';

@Component({
    selector: 'jhi-groesse-detail',
    templateUrl: './groesse-detail.component.html'
})
export class GroesseDetailComponent implements OnInit, OnDestroy {

    groesse: Groesse;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private groesseService: GroesseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGroesses();
    }

    load(id) {
        this.groesseService.find(id)
            .subscribe((groesseResponse: HttpResponse<Groesse>) => {
                this.groesse = groesseResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGroesses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'groesseListModification',
            (response) => this.load(this.groesse.id)
        );
    }
}
