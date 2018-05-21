import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Termin } from './termin.model';
import { TerminPopupService } from './termin-popup.service';
import { TerminService } from './termin.service';

@Component({
    selector: 'jhi-termin-delete-dialog',
    templateUrl: './termin-delete-dialog.component.html'
})
export class TerminDeleteDialogComponent {

    termin: Termin;

    constructor(
        private terminService: TerminService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.terminService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'terminListModification',
                content: 'Deleted an termin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-termin-delete-popup',
    template: ''
})
export class TerminDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private terminPopupService: TerminPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.terminPopupService
                .open(TerminDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
