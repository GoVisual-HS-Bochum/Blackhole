import { BaseEntity } from './../../shared';

export class Groesse implements BaseEntity {
    constructor(
        public id?: number,
        public breite?: number,
        public laenge?: number,
    ) {
    }
}
