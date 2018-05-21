import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackholeSharedModule } from '../shared';
import { ROOM_OVERVIEW_ROUTE } from './room-overview.route';
import { RoomOverviewComponent } from './room-overview.component';

@NgModule({
    imports: [
        BlackholeSharedModule,
        RouterModule.forChild([ ROOM_OVERVIEW_ROUTE ])
    ],
    declarations: [
        RoomOverviewComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlackholeRoomOverviewModule {}
