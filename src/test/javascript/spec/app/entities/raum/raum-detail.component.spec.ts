/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlackholeTestModule } from '../../../test.module';
import { RaumDetailComponent } from '../../../../../../main/webapp/app/entities/raum/raum-detail.component';
import { RaumService } from '../../../../../../main/webapp/app/entities/raum/raum.service';
import { Raum } from '../../../../../../main/webapp/app/entities/raum/raum.model';

describe('Component Tests', () => {

    describe('Raum Management Detail Component', () => {
        let comp: RaumDetailComponent;
        let fixture: ComponentFixture<RaumDetailComponent>;
        let service: RaumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [RaumDetailComponent],
                providers: [
                    RaumService
                ]
            })
            .overrideTemplate(RaumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RaumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Raum(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.raum).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
