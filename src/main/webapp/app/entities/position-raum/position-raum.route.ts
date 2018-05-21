import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PositionRaumComponent } from './position-raum.component';
import { PositionRaumDetailComponent } from './position-raum-detail.component';
import { PositionRaumPopupComponent } from './position-raum-dialog.component';
import { PositionRaumDeletePopupComponent } from './position-raum-delete-dialog.component';

export const positionRaumRoute: Routes = [
    {
        path: 'position-raum',
        component: PositionRaumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionRaums'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'position-raum/:id',
        component: PositionRaumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionRaums'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const positionRaumPopupRoute: Routes = [
    {
        path: 'position-raum-new',
        component: PositionRaumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionRaums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'position-raum/:id/edit',
        component: PositionRaumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionRaums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'position-raum/:id/delete',
        component: PositionRaumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PositionRaums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
