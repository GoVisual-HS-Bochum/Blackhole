/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlackholeTestModule } from '../../../test.module';
import { GroesseDetailComponent } from '../../../../../../main/webapp/app/entities/groesse/groesse-detail.component';
import { GroesseService } from '../../../../../../main/webapp/app/entities/groesse/groesse.service';
import { Groesse } from '../../../../../../main/webapp/app/entities/groesse/groesse.model';

describe('Component Tests', () => {

    describe('Groesse Management Detail Component', () => {
        let comp: GroesseDetailComponent;
        let fixture: ComponentFixture<GroesseDetailComponent>;
        let service: GroesseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [GroesseDetailComponent],
                providers: [
                    GroesseService
                ]
            })
            .overrideTemplate(GroesseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroesseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroesseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Groesse(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.groesse).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
