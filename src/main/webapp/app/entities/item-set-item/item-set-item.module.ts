import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    ItemSetItemService,
    ItemSetItemPopupService,
    ItemSetItemComponent,
    ItemSetItemDetailComponent,
    ItemSetItemDialogComponent,
    ItemSetItemPopupComponent,
    ItemSetItemDeletePopupComponent,
    ItemSetItemDeleteDialogComponent,
    itemSet_itemRoute,
    itemSet_itemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...itemSet_itemRoute,
    ...itemSet_itemPopupRoute,
];

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ItemSetItemComponent,
        ItemSetItemDetailComponent,
        ItemSetItemDialogComponent,
        ItemSetItemDeleteDialogComponent,
        ItemSetItemPopupComponent,
        ItemSetItemDeletePopupComponent,
    ],
    entryComponents: [
        ItemSetItemComponent,
        ItemSetItemDialogComponent,
        ItemSetItemPopupComponent,
        ItemSetItemDeleteDialogComponent,
        ItemSetItemDeletePopupComponent,
    ],
    providers: [
        ItemSetItemService,
        ItemSetItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeItemSetItemModule {}
