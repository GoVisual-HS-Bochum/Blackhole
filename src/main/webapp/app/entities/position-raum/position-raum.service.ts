import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PositionRaum } from './position-raum.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PositionRaum>;

@Injectable()
export class PositionRaumService {

    private resourceUrl =  SERVER_API_URL + 'api/position-raums';

    constructor(private http: HttpClient) { }

    create(positionRaum: PositionRaum): Observable<EntityResponseType> {
        const copy = this.convert(positionRaum);
        return this.http.post<PositionRaum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(positionRaum: PositionRaum): Observable<EntityResponseType> {
        const copy = this.convert(positionRaum);
        return this.http.put<PositionRaum>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PositionRaum>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PositionRaum[]>> {
        const options = createRequestOption(req);
        return this.http.get<PositionRaum[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PositionRaum[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PositionRaum = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PositionRaum[]>): HttpResponse<PositionRaum[]> {
        const jsonResponse: PositionRaum[] = res.body;
        const body: PositionRaum[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PositionRaum.
     */
    private convertItemFromServer(positionRaum: PositionRaum): PositionRaum {
        const copy: PositionRaum = Object.assign({}, positionRaum);
        return copy;
    }

    /**
     * Convert a PositionRaum to a JSON which can be sent to the server.
     */
    private convert(positionRaum: PositionRaum): PositionRaum {
        const copy: PositionRaum = Object.assign({}, positionRaum);
        return copy;
    }
}
