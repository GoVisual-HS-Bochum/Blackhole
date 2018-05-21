/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlackholeTestModule } from '../../../test.module';
import { TerminDetailComponent } from '../../../../../../main/webapp/app/entities/termin/termin-detail.component';
import { TerminService } from '../../../../../../main/webapp/app/entities/termin/termin.service';
import { Termin } from '../../../../../../main/webapp/app/entities/termin/termin.model';

describe('Component Tests', () => {

    describe('Termin Management Detail Component', () => {
        let comp: TerminDetailComponent;
        let fixture: ComponentFixture<TerminDetailComponent>;
        let service: TerminService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [TerminDetailComponent],
                providers: [
                    TerminService
                ]
            })
            .overrideTemplate(TerminDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TerminDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TerminService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Termin(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.termin).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
