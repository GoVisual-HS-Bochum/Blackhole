import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Raum } from './raum.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Raum>;

@Injectable()
export class RaumService {

    private resourceUrl =  SERVER_API_URL + 'api/raums';

    constructor(private http: HttpClient) { }

    create(raum: Raum): Observable<EntityResponseType> {
        const copy = this.convert(raum);
        return this.http.post<Raum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(raum: Raum): Observable<EntityResponseType> {
        const copy = this.convert(raum);
        return this.http.put<Raum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Raum>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Raum[]>> {
        const options = createRequestOption(req);
        return this.http.get<Raum[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Raum[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Raum = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Raum[]>): HttpResponse<Raum[]> {
        const jsonResponse: Raum[] = res.body;
        const body: Raum[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Raum.
     */
    private convertItemFromServer(raum: Raum): Raum {
        const copy: Raum = Object.assign({}, raum);
        return copy;
    }

    /**
     * Convert a Raum to a JSON which can be sent to the server.
     */
    private convert(raum: Raum): Raum {
        const copy: Raum = Object.assign({}, raum);
        return copy;
    }
}
