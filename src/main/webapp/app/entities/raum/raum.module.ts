import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    RaumService,
    RaumPopupService,
    RaumComponent,
    RaumDetailComponent,
    RaumDialogComponent,
    RaumPopupComponent,
    RaumDeletePopupComponent,
    RaumDeleteDialogComponent,
    raumRoute,
    raumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...raumRoute,
    ...raumPopupRoute,
];

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RaumComponent,
        RaumDetailComponent,
        RaumDialogComponent,
        RaumDeleteDialogComponent,
        RaumPopupComponent,
        RaumDeletePopupComponent,
    ],
    entryComponents: [
        RaumComponent,
        RaumDialogComponent,
        RaumPopupComponent,
        RaumDeleteDialogComponent,
        RaumDeletePopupComponent,
    ],
    providers: [
        RaumService,
        RaumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeRaumModule {}
