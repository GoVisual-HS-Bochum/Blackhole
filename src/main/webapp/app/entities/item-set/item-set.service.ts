import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ItemSet } from './item-set.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ItemSet>;

@Injectable()
export class ItemSetService {

    private resourceUrl =  SERVER_API_URL + 'api/item-sets';

    constructor(private http: HttpClient) { }

    create(itemSet: ItemSet): Observable<EntityResponseType> {
        const copy = this.convert(itemSet);
        return this.http.post<ItemSet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(itemSet: ItemSet): Observable<EntityResponseType> {
        const copy = this.convert(itemSet);
        return this.http.put<ItemSet>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ItemSet>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ItemSet[]>> {
        const options = createRequestOption(req);
        return this.http.get<ItemSet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ItemSet[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ItemSet = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ItemSet[]>): HttpResponse<ItemSet[]> {
        const jsonResponse: ItemSet[] = res.body;
        const body: ItemSet[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ItemSet.
     */
    private convertItemFromServer(itemSet: ItemSet): ItemSet {
        const copy: ItemSet = Object.assign({}, itemSet);
        return copy;
    }

    /**
     * Convert a ItemSet to a JSON which can be sent to the server.
     */
    private convert(itemSet: ItemSet): ItemSet {
        const copy: ItemSet = Object.assign({}, itemSet);
        return copy;
    }
}
