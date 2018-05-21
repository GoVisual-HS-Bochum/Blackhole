import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    ItemSetService,
    ItemSetPopupService,
    ItemSetComponent,
    ItemSetDetailComponent,
    ItemSetDialogComponent,
    ItemSetPopupComponent,
    ItemSetDeletePopupComponent,
    ItemSetDeleteDialogComponent,
    itemSetRoute,
    itemSetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...itemSetRoute,
    ...itemSetPopupRoute,
];

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ItemSetComponent,
        ItemSetDetailComponent,
        ItemSetDialogComponent,
        ItemSetDeleteDialogComponent,
        ItemSetPopupComponent,
        ItemSetDeletePopupComponent,
    ],
    entryComponents: [
        ItemSetComponent,
        ItemSetDialogComponent,
        ItemSetPopupComponent,
        ItemSetDeleteDialogComponent,
        ItemSetDeletePopupComponent,
    ],
    providers: [
        ItemSetService,
        ItemSetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeItemSetModule {}
