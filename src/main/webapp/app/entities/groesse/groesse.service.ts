import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Groesse } from './groesse.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Groesse>;

@Injectable()
export class GroesseService {

    private resourceUrl =  SERVER_API_URL + 'api/groesses';

    constructor(private http: HttpClient) { }

    create(groesse: Groesse): Observable<EntityResponseType> {
        const copy = this.convert(groesse);
        return this.http.post<Groesse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(groesse: Groesse): Observable<EntityResponseType> {
        const copy = this.convert(groesse);
        return this.http.put<Groesse>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Groesse>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Groesse[]>> {
        const options = createRequestOption(req);
        return this.http.get<Groesse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Groesse[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Groesse = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Groesse[]>): HttpResponse<Groesse[]> {
        const jsonResponse: Groesse[] = res.body;
        const body: Groesse[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Groesse.
     */
    private convertItemFromServer(groesse: Groesse): Groesse {
        const copy: Groesse = Object.assign({}, groesse);
        return copy;
    }

    /**
     * Convert a Groesse to a JSON which can be sent to the server.
     */
    private convert(groesse: Groesse): Groesse {
        const copy: Groesse = Object.assign({}, groesse);
        return copy;
    }
}
