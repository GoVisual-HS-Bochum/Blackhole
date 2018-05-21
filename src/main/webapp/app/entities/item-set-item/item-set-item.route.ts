import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ItemSetItemComponent } from './item-set-item.component';
import { ItemSetItemDetailComponent } from './item-set-item-detail.component';
import { ItemSetItemPopupComponent } from './item-set-item-dialog.component';
import { ItemSetItemDeletePopupComponent } from './item-set-item-delete-dialog.component';

export const itemSet_itemRoute: Routes = [
    {
        path: 'item-set-item',
        component: ItemSetItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'item-set-item/:id',
        component: ItemSetItemDetailComponent,
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
        component: ItemSetItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-set-item/:id/edit',
        component: ItemSetItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-set-item/:id/delete',
        component: ItemSetItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemSet_items'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
