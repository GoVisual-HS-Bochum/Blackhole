import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ItemSet_itemComponent } from './item-set-item.component';
import { ItemSet_itemDetailComponent } from './item-set-item-detail.component';
import { ItemSet_itemPopupComponent } from './item-set-item-dialog.component';
import { ItemSet_itemDeletePopupComponent } from './item-set-item-delete-dialog.component';

export const itemSet_itemRoute: Routes = [
    {
        path: 'item-set-item',
        component: ItemSet_itemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'item-set-item/:id',
        component: ItemSet_itemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itemSet_itemPopupRoute: Routes = [
    {
        path: 'item-set-item-new',
        component: ItemSet_itemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-set-item/:id/edit',
        component: ItemSet_itemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-set-item/:id/delete',
        component: ItemSet_itemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
