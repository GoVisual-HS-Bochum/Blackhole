/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { PositionRaumComponent } from '../../../../../../main/webapp/app/entities/position-raum/position-raum.component';
import { PositionRaumService } from '../../../../../../main/webapp/app/entities/position-raum/position-raum.service';
import { PositionRaum } from '../../../../../../main/webapp/app/entities/position-raum/position-raum.model';

describe('Component Tests', () => {

    describe('PositionRaum Management Component', () => {
        let comp: PositionRaumComponent;
        let fixture: ComponentFixture<PositionRaumComponent>;
        let service: PositionRaumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [PositionRaumComponent],
                providers: [
                    PositionRaumService
                ]
            })
            .overrideTemplate(PositionRaumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PositionRaumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PositionRaumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PositionRaum(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.positionRaums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
