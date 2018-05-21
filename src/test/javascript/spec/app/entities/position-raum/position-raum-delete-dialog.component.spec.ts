/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlackholeTestModule } from '../../../test.module';
import { PositionRaumDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/position-raum/position-raum-delete-dialog.component';
import { PositionRaumService } from '../../../../../../main/webapp/app/entities/position-raum/position-raum.service';

describe('Component Tests', () => {

    describe('PositionRaum Management Delete Component', () => {
        let comp: PositionRaumDeleteDialogComponent;
        let fixture: ComponentFixture<PositionRaumDeleteDialogComponent>;
        let service: PositionRaumService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [PositionRaumDeleteDialogComponent],
                providers: [
                    PositionRaumService
                ]
            })
            .overrideTemplate(PositionRaumDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionRaumDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionRaumService);
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
