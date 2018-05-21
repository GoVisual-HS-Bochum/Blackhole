import { BaseEntity } from './../../shared';

export class Termin implements BaseEntity {
    constructor(
        public id?: number,
        public bezeichnung?: string,
        public startzeit?: any,
        public endzeit?: any,
        public raumNr?: BaseEntity,
    ) {
    }
}
