import { BaseEntity } from './../../shared';
import { Raum } from '../raum';

export class Termin implements BaseEntity {
    constructor(
        public id?: number,
        public bezeichnung?: string,
        public startzeit?: any,
        public endzeit?: any,
        public raumNr?: BaseEntity,
        public raum?: Raum
    ) {
    }
}
