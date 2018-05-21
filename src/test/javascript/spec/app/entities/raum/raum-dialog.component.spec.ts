/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlackholeTestModule } from '../../../test.module';
import { RaumDialogComponent } from '../../../../../../main/webapp/app/entities/raum/raum-dialog.component';
import { RaumService } from '../../../../../../main/webapp/app/entities/raum/raum.service';
import { Raum } from '../../../../../../main/webapp/app/entities/raum/raum.model';
import { PositionRaumService } from '../../../../../../main/webapp/app/entities/position-raum';
import { GroesseService } from '../../../../../../main/webapp/app/entities/groesse';
import { ItemSetService } from '../../../../../../main/webapp/app/entities/item-set';

describe('Component Tests', () => {

    describe('Raum Management Dialog Component', () => {
        let comp: RaumDialogComponent;
        let fixture: ComponentFixture<RaumDialogComponent>;
        let service: RaumService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [RaumDialogComponent],
                providers: [
                    PositionRaumService,
                    GroesseService,
                    ItemSetService,
                    RaumService
                ]
            })
            .overrideTemplate(RaumDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RaumDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaumService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Raum(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.raum = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'raumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Raum();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.raum = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'raumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
