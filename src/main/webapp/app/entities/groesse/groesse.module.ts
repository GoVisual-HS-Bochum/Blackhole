import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../../shared';
import {
    GroesseService,
    GroessePopupService,
    GroesseComponent,
    GroesseDetailComponent,
    GroesseDialogComponent,
    GroessePopupComponent,
    GroesseDeletePopupComponent,
    GroesseDeleteDialogComponent,
    groesseRoute,
    groessePopupRoute,
} from './';

const ENTITY_STATES = [
    ...groesseRoute,
    ...groessePopupRoute,
];

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GroesseComponent,
        GroesseDetailComponent,
        GroesseDialogComponent,
        GroesseDeleteDialogComponent,
        GroessePopupComponent,
        GroesseDeletePopupComponent,
    ],
    entryComponents: [
        GroesseComponent,
        GroesseDialogComponent,
        GroessePopupComponent,
        GroesseDeleteDialogComponent,
        GroesseDeletePopupComponent,
    ],
    providers: [
        GroesseService,
        GroessePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeGroesseModule {}
