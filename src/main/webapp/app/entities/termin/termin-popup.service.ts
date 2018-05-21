import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Termin } from './termin.model';
import { TerminService } from './termin.service';

@Injectable()
export class TerminPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private terminService: TerminService

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
                this.terminService.find(id)
                    .subscribe((terminResponse: HttpResponse<Termin>) => {
                        const termin: Termin = terminResponse.body;
                        termin.startzeit = this.datePipe
                            .transform(termin.startzeit, 'yyyy-MM-ddTHH:mm:ss');
                        termin.endzeit = this.datePipe
                            .transform(termin.endzeit, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.terminModalRef(component, termin);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.terminModalRef(component, new Termin());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    terminModalRef(component: Component, termin: Termin): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.termin = termin;
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
