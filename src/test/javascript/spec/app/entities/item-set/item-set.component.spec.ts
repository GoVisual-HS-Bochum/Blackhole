/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSetComponent } from '../../../../../../main/webapp/app/entities/item-set/item-set.component';
import { ItemSetService } from '../../../../../../main/webapp/app/entities/item-set/item-set.service';
import { ItemSet } from '../../../../../../main/webapp/app/entities/item-set/item-set.model';

describe('Component Tests', () => {

    describe('ItemSet Management Component', () => {
        let comp: ItemSetComponent;
        let fixture: ComponentFixture<ItemSetComponent>;
        let service: ItemSetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSetComponent],
                providers: [
                    ItemSetService
                ]
            })
            .overrideTemplate(ItemSetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ItemSet(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.itemSets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
