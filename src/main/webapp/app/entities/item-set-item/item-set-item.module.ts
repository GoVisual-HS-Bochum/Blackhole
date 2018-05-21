import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    ItemSet_itemService,
    ItemSet_itemPopupService,
    ItemSet_itemComponent,
    ItemSet_itemDetailComponent,
    ItemSet_itemDialogComponent,
    ItemSet_itemPopupComponent,
    ItemSet_itemDeletePopupComponent,
    ItemSet_itemDeleteDialogComponent,
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
        ItemSet_itemComponent,
        ItemSet_itemDetailComponent,
        ItemSet_itemDialogComponent,
        ItemSet_itemDeleteDialogComponent,
        ItemSet_itemPopupComponent,
        ItemSet_itemDeletePopupComponent,
    ],
    entryComponents: [
        ItemSet_itemComponent,
        ItemSet_itemDialogComponent,
        ItemSet_itemPopupComponent,
        ItemSet_itemDeleteDialogComponent,
        ItemSet_itemDeletePopupComponent,
    ],
    providers: [
        ItemSet_itemService,
        ItemSet_itemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeItemSet_itemModule {}
