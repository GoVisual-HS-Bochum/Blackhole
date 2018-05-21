/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSetDetailComponent } from '../../../../../../main/webapp/app/entities/item-set/item-set-detail.component';
import { ItemSetService } from '../../../../../../main/webapp/app/entities/item-set/item-set.service';
import { ItemSet } from '../../../../../../main/webapp/app/entities/item-set/item-set.model';

describe('Component Tests', () => {

    describe('ItemSet Management Detail Component', () => {
        let comp: ItemSetDetailComponent;
        let fixture: ComponentFixture<ItemSetDetailComponent>;
        let service: ItemSetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSetDetailComponent],
                providers: [
                    ItemSetService
                ]
            })
            .overrideTemplate(ItemSetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ItemSet(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.itemSet).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
