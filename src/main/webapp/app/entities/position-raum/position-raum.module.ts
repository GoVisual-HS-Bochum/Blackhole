import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    PositionRaumService,
    PositionRaumPopupService,
    PositionRaumComponent,
    PositionRaumDetailComponent,
    PositionRaumDialogComponent,
    PositionRaumPopupComponent,
    PositionRaumDeletePopupComponent,
    PositionRaumDeleteDialogComponent,
    positionRaumRoute,
    positionRaumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...positionRaumRoute,
    ...positionRaumPopupRoute,
];

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PositionRaumComponent,
        PositionRaumDetailComponent,
        PositionRaumDialogComponent,
        PositionRaumDeleteDialogComponent,
        PositionRaumPopupComponent,
        PositionRaumDeletePopupComponent,
    ],
    entryComponents: [
        PositionRaumComponent,
        PositionRaumDialogComponent,
        PositionRaumPopupComponent,
        PositionRaumDeleteDialogComponent,
        PositionRaumDeletePopupComponent,
    ],
    providers: [
        PositionRaumService,
        PositionRaumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholePositionRaumModule {}
