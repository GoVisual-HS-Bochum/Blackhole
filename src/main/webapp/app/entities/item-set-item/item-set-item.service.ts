import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ItemSetItem } from './item-set-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ItemSetItem>;

@Injectable()
export class ItemSetItemService {

    private resourceUrl =  SERVER_API_URL + 'api/item-set-items';

    constructor(private http: HttpClient) { }

    create(itemSetItem: ItemSetItem): Observable<EntityResponseType> {
        const copy = this.convert(itemSetItem);
        return this.http.post<ItemSetItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(itemSetItem: ItemSetItem): Observable<EntityResponseType> {
        const copy = this.convert(itemSetItem);
        return this.http.put<ItemSetItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ItemSetItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ItemSetItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<ItemSetItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ItemSetItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ItemSetItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ItemSetItem[]>): HttpResponse<ItemSetItem[]> {
        const jsonResponse: ItemSetItem[] = res.body;
        const body: ItemSetItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ItemSetItem.
     */
    private convertItemFromServer(itemSetItem: ItemSetItem): ItemSetItem {
        const copy: ItemSetItem = Object.assign({}, itemSetItem);
        return copy;
    }

    /**
     * Convert a ItemSetItem to a JSON which can be sent to the server.
     */
    private convert(itemSetItem: ItemSetItem): ItemSetItem {
        const copy: ItemSetItem = Object.assign({}, itemSetItem);
        return copy;
    }
}
