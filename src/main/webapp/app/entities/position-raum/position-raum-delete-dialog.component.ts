import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PositionRaum } from './position-raum.model';
import { PositionRaumPopupService } from './position-raum-popup.service';
import { PositionRaumService } from './position-raum.service';

@Component({
    selector: 'jhi-position-raum-delete-dialog',
    templateUrl: './position-raum-delete-dialog.component.html'
})
export class PositionRaumDeleteDialogComponent {

    positionRaum: PositionRaum;

    constructor(
        private positionRaumService: PositionRaumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.positionRaumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'positionRaumListModification',
                content: 'Deleted an positionRaum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-position-raum-delete-popup',
    template: ''
})
export class PositionRaumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private positionRaumPopupService: PositionRaumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.positionRaumPopupService
                .open(PositionRaumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
