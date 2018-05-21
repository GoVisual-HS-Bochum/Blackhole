/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSet_itemComponent } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.component';
import { ItemSet_itemService } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.service';
import { ItemSet_item } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.model';

describe('Component Tests', () => {

    describe('ItemSet_item Management Component', () => {
        let comp: ItemSet_itemComponent;
        let fixture: ComponentFixture<ItemSet_itemComponent>;
        let service: ItemSet_itemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSet_itemComponent],
                providers: [
                    ItemSet_itemService
                ]
            })
            .overrideTemplate(ItemSet_itemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSet_itemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSet_itemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ItemSet_item(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.itemSet_items[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
