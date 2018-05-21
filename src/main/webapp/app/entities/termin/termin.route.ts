import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TerminComponent } from './termin.component';
import { TerminDetailComponent } from './termin-detail.component';
import { TerminPopupComponent } from './termin-dialog.component';
import { TerminDeletePopupComponent } from './termin-delete-dialog.component';

export const terminRoute: Routes = [
    {
        path: 'termin',
        component: TerminComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termins'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'termin/:id',
        component: TerminDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termins'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const terminPopupRoute: Routes = [
    {
        path: 'termin-new',
        component: TerminPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termins'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'termin/:id/edit',
        component: TerminPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termins'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'termin/:id/delete',
        component: TerminDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termins'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
