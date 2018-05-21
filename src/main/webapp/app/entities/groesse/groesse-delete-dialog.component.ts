import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Groesse } from './groesse.model';
import { GroessePopupService } from './groesse-popup.service';
import { GroesseService } from './groesse.service';

@Component({
    selector: 'jhi-groesse-delete-dialog',
    templateUrl: './groesse-delete-dialog.component.html'
})
export class GroesseDeleteDialogComponent {

    groesse: Groesse;

    constructor(
        private groesseService: GroesseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.groesseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'groesseListModification',
                content: 'Deleted an groesse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-groesse-delete-popup',
    template: ''
})
export class GroesseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groessePopupService: GroessePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.groessePopupService
                .open(GroesseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
