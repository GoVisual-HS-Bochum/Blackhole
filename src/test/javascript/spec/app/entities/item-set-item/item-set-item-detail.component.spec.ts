/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSetItemDetailComponent } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item-detail.component';
import { ItemSetItemService } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.service';
import { ItemSetItem } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.model';

describe('Component Tests', () => {

    describe('ItemSetItem Management Detail Component', () => {
        let comp: ItemSetItemDetailComponent;
        let fixture: ComponentFixture<ItemSetItemDetailComponent>;
        let service: ItemSetItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSetItemDetailComponent],
                providers: [
                    ItemSetItemService
                ]
            })
            .overrideTemplate(ItemSetItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSetItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSetItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ItemSetItem(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.itemSetItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
