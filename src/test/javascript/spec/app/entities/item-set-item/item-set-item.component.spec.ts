/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlackholeTestModule } from '../../../test.module';
import { ItemSetItemComponent } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.component';
import { ItemSetItemService } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.service';
import { ItemSetItem } from '../../../../../../main/webapp/app/entities/item-set-item/item-set-item.model';

describe('Component Tests', () => {

    describe('ItemSetItem Management Component', () => {
        let comp: ItemSetItemComponent;
        let fixture: ComponentFixture<ItemSetItemComponent>;
        let service: ItemSetItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlackholeTestModule],
                declarations: [ItemSetItemComponent],
                providers: [
                    ItemSetItemService
                ]
            })
            .overrideTemplate(ItemSetItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemSetItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemSetItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ItemSetItem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.itemSetItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
