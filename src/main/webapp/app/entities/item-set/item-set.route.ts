import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ItemSetComponent } from './item-set.component';
import { ItemSetDetailComponent } from './item-set-detail.component';
import { ItemSetPopupComponent } from './item-set-dialog.component';
import { ItemSetDeletePopupComponent } from './item-set-delete-dialog.component';

export const itemSetRoute: Routes = [
    {
        path: 'item-set',
        component: ItemSetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'item-set/:id',
        component: ItemSetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itemSetPopupRoute: Routes = [
    {
        path: 'item-set-new',
        component: ItemSetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-set/:id/edit',
        component: ItemSetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-set/:id/delete',
        component: ItemSetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
