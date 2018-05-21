import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ItemSet } from './item-set.model';
import { ItemSetPopupService } from './item-set-popup.service';
import { ItemSetService } from './item-set.service';

@Component({
    selector: 'jhi-item-set-delete-dialog',
    templateUrl: './item-set-delete-dialog.component.html'
})
export class ItemSetDeleteDialogComponent {

    itemSet: ItemSet;

    constructor(
        private itemSetService: ItemSetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.itemSetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'itemSetListModification',
                content: 'Deleted an itemSet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-item-set-delete-popup',
    template: ''
})
export class ItemSetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemSetPopupService: ItemSetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.itemSetPopupService
                .open(ItemSetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
