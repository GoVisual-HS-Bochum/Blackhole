import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ItemSetItem } from './item-set-item.model';
import { ItemSetItemPopupService } from './item-set-item-popup.service';
import { ItemSetItemService } from './item-set-item.service';

@Component({
    selector: 'jhi-item-set-item-delete-dialog',
    templateUrl: './item-set-item-delete-dialog.component.html'
})
export class ItemSetItemDeleteDialogComponent {

    itemSetItem: ItemSetItem;

    constructor(
        private itemSetItemService: ItemSetItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.itemSetItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'itemSetItemListModification',
                content: 'Deleted an itemSetItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-item-set-item-delete-popup',
    template: ''
})
export class ItemSetItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemSetItemPopupService: ItemSetItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.itemSetItemPopupService
                .open(ItemSetItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
