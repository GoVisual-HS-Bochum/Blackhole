import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GroesseComponent } from './groesse.component';
import { GroesseDetailComponent } from './groesse-detail.component';
import { GroessePopupComponent } from './groesse-dialog.component';
import { GroesseDeletePopupComponent } from './groesse-delete-dialog.component';

export const groesseRoute: Routes = [
    {
        path: 'groesse',
        component: GroesseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groesses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'groesse/:id',
        component: GroesseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groesses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groessePopupRoute: Routes = [
    {
        path: 'groesse-new',
        component: GroessePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'groesse/:id/edit',
        component: GroessePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'groesse/:id/delete',
        component: GroesseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Groesses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
