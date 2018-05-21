import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    TerminService,
    TerminPopupService,
    TerminComponent,
    TerminDetailComponent,
    TerminDialogComponent,
    TerminPopupComponent,
    TerminDeletePopupComponent,
    TerminDeleteDialogComponent,
    terminRoute,
    terminPopupRoute,
} from './';

const ENTITY_STATES = [
    ...terminRoute,
    ...terminPopupRoute,
];

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TerminComponent,
        TerminDetailComponent,
        TerminDialogComponent,
        TerminDeleteDialogComponent,
        TerminPopupComponent,
        TerminDeletePopupComponent,
    ],
    entryComponents: [
        TerminComponent,
        TerminDialogComponent,
        TerminPopupComponent,
        TerminDeleteDialogComponent,
        TerminDeletePopupComponent,
    ],
    providers: [
        TerminService,
        TerminPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeTerminModule {}
