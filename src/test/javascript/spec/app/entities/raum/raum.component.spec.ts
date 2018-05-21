/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { RaumComponent } from '../../../../../../main/webapp/app/entities/raum/raum.component';
import { RaumService } from '../../../../../../main/webapp/app/entities/raum/raum.service';
import { Raum } from '../../../../../../main/webapp/app/entities/raum/raum.model';

describe('Component Tests', () => {

    describe('Raum Management Component', () => {
        let comp: RaumComponent;
        let fixture: ComponentFixture<RaumComponent>;
        let service: RaumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [RaumComponent],
                providers: [
                    RaumService
                ]
            })
            .overrideTemplate(RaumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RaumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Raum(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.raums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
