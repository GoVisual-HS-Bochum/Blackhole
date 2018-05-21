/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSet_itemDetailComponent } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item-detail.component';
import { ItemSet_itemService } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.service';
import { ItemSet_item } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.model';

describe('Component Tests', () => {

    describe('ItemSet_item Management Detail Component', () => {
        let comp: ItemSet_itemDetailComponent;
        let fixture: ComponentFixture<ItemSet_itemDetailComponent>;
        let service: ItemSet_itemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSet_itemDetailComponent],
                providers: [
                    ItemSet_itemService
                ]
            })
            .overrideTemplate(ItemSet_itemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSet_itemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSet_itemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ItemSet_item(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.itemSet_item).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
