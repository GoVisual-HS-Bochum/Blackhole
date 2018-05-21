/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { GroesseComponent } from '../../../../../../main/webapp/app/entities/groesse/groesse.component';
import { GroesseService } from '../../../../../../main/webapp/app/entities/groesse/groesse.service';
import { Groesse } from '../../../../../../main/webapp/app/entities/groesse/groesse.model';

describe('Component Tests', () => {

    describe('Groesse Management Component', () => {
        let comp: GroesseComponent;
        let fixture: ComponentFixture<GroesseComponent>;
        let service: GroesseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [GroesseComponent],
                providers: [
                    GroesseService
                ]
            })
            .overrideTemplate(GroesseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroesseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroesseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Groesse(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.groesses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
