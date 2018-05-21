/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { TerminComponent } from '../../../../../../main/webapp/app/entities/termin/termin.component';
import { TerminService } from '../../../../../../main/webapp/app/entities/termin/termin.service';
import { Termin } from '../../../../../../main/webapp/app/entities/termin/termin.model';

describe('Component Tests', () => {

    describe('Termin Management Component', () => {
        let comp: TerminComponent;
        let fixture: ComponentFixture<TerminComponent>;
        let service: TerminService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [TerminComponent],
                providers: [
                    TerminService
                ]
            })
            .overrideTemplate(TerminComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TerminComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TerminService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Termin(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.termins[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
