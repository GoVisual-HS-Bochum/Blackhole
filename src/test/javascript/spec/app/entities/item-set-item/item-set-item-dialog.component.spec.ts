/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSet_itemDialogComponent } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item-dialog.component';
import { ItemSet_itemService } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.service';
import { ItemSet_item } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.model';
import { ItemSetService } from '../../../../../../main/webapp/app/entities/item-set';
import { ItemService } from '../../../../../../main/webapp/app/entities/item';

describe('Component Tests', () => {

    describe('ItemSet_item Management Dialog Component', () => {
        let comp: ItemSet_itemDialogComponent;
        let fixture: ComponentFixture<ItemSet_itemDialogComponent>;
        let service: ItemSet_itemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSet_itemDialogComponent],
                providers: [
                    ItemSetService,
                    ItemService,
                    ItemSet_itemService
                ]
            })
            .overrideTemplate(ItemSet_itemDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSet_itemDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSet_itemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ItemSet_item(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.itemSet_item = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'itemSet_itemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ItemSet_item();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.itemSet_item = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'itemSet_itemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
