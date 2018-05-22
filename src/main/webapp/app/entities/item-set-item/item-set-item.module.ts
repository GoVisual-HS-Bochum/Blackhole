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
    itemSetItemRoute,
    itemSetItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...itemSetItemRoute,
    ...itemSetItemPopupRoute,
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
