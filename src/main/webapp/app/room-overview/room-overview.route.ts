import { Route } from '@angular/router';
import { RoomOverviewComponent } from './room-overview.component';

export const ROOM_OVERVIEW_ROUTE: Route = {
    path: 'room-overview',
    component: RoomOverviewComponent,
    data: {
        authorities: [],
        pageTitle: 'Blackhole'
    }
};
