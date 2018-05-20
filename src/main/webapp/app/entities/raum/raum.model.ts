import { BaseEntity } from './../../shared';

export class Raum implements BaseEntity {
    constructor(
        public id?: number,
        public raumNr?: string,
        public etage?: number,
        public groesse?: number,
    ) {
    }
}
