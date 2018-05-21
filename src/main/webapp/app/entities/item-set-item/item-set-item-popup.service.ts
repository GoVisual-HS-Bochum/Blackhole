import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ItemSet_item } from './item-set-item.model';
import { ItemSet_itemService } from './item-set-item.service';

@Injectable()
export class ItemSet_itemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private itemSet_itemService: ItemSet_itemService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.itemSet_itemService.find(id)
                    .subscribe((itemSet_itemResponse: HttpResponse<ItemSet_item>) => {
                        const itemSet_item: ItemSet_item = itemSet_itemResponse.body;
                        this.ngbModalRef = this.itemSet_itemModalRef(component, itemSet_item);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.itemSet_itemModalRef(component, new ItemSet_item());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    itemSet_itemModalRef(component: Component, itemSet_item: ItemSet_item): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.itemSet_item = itemSet_item;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}