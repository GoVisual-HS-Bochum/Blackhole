import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ItemSet_item } from './item-set-item.model';
import { ItemSet_itemPopupService } from './item-set-item-popup.service';
import { ItemSet_itemService } from './item-set-item.service';

@Component({
    selector: 'jhi-item-set-item-delete-dialog',
    templateUrl: './item-set-item-delete-dialog.component.html'
})
export class ItemSet_itemDeleteDialogComponent {

    itemSet_item: ItemSet_item;

    constructor(
        private itemSet_itemService: ItemSet_itemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.itemSet_itemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'itemSet_itemListModification',
                content: 'Deleted an itemSet_item'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-item-set-item-delete-popup',
    template: ''
})
export class ItemSet_itemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemSet_itemPopupService: ItemSet_itemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.itemSet_itemPopupService
                .open(ItemSet_itemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
