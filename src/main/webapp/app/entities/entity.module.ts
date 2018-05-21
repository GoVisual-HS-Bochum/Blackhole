import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlackholePositionRaumModule } from './position-raum/position-raum.module';
import { BlackholeGroesseModule } from './groesse/groesse.module';
import { BlackholeItemSetModule } from './item-set/item-set.module';
import { BlackholeItemModule } from './item/item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BlackholePositionRaumModule,
        BlackholeGroesseModule,
        BlackholeItemSetModule,
        BlackholeItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeEntityModule {}
