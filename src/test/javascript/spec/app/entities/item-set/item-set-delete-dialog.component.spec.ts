/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSetDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/item-set/item-set-delete-dialog.component';
import { ItemSetService } from '../../../../../../main/webapp/app/entities/item-set/item-set.service';

describe('Component Tests', () => {

    describe('ItemSet Management Delete Component', () => {
        let comp: ItemSetDeleteDialogComponent;
        let fixture: ComponentFixture<ItemSetDeleteDialogComponent>;
        let service: ItemSetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSetDeleteDialogComponent],
                providers: [
                    ItemSetService
                ]
            })
            .overrideTemplate(ItemSetDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSetService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
