import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Raum } from './raum.model';
import { RaumPopupService } from './raum-popup.service';
import { RaumService } from './raum.service';

@Component({
    selector: 'jhi-raum-delete-dialog',
    templateUrl: './raum-delete-dialog.component.html'
})
export class RaumDeleteDialogComponent {

    raum: Raum;

    constructor(
        private raumService: RaumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.raumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'raumListModification',
                content: 'Deleted an raum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-raum-delete-popup',
    template: ''
})
export class RaumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private raumPopupService: RaumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.raumPopupService
                .open(RaumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
