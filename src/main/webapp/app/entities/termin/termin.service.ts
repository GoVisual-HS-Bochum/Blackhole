import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Termin } from './termin.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Termin>;

@Injectable()
export class TerminService {

    private resourceUrl =  SERVER_API_URL + 'api/termins';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(termin: Termin): Observable<EntityResponseType> {
        const copy = this.convert(termin);
        return this.http.post<Termin>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(termin: Termin): Observable<EntityResponseType> {
        const copy = this.convert(termin);
        return this.http.put<Termin>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Termin>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Termin[]>> {
        const options = createRequestOption(req);
        return this.http.get<Termin[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Termin[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Termin = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Termin[]>): HttpResponse<Termin[]> {
        const jsonResponse: Termin[] = res.body;
        const body: Termin[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Termin.
     */
    private convertItemFromServer(termin: Termin): Termin {
        const copy: Termin = Object.assign({}, termin);
        copy.startzeit = this.dateUtils
            .convertDateTimeFromServer(termin.startzeit);
        copy.endzeit = this.dateUtils
            .convertDateTimeFromServer(termin.endzeit);
        return copy;
    }

    /**
     * Convert a Termin to a JSON which can be sent to the server.
     */
    private convert(termin: Termin): Termin {
        const copy: Termin = Object.assign({}, termin);

        copy.startzeit = this.dateUtils.toDate(termin.startzeit);

        copy.endzeit = this.dateUtils.toDate(termin.endzeit);
        return copy;
    }
}
