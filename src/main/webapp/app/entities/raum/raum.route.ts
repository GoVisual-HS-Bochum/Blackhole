import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RaumComponent } from './raum.component';
import { RaumDetailComponent } from './raum-detail.component';
import { RaumPopupComponent } from './raum-dialog.component';
import { RaumDeletePopupComponent } from './raum-delete-dialog.component';

export const raumRoute: Routes = [
    {
        path: 'raum',
        component: RaumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Raums'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'raum/:id',
        component: RaumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Raums'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const raumPopupRoute: Routes = [
    {
        path: 'raum-new',
        component: RaumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Raums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'raum/:id/edit',
        component: RaumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Raums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'raum/:id/delete',
        component: RaumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Raums'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
