import { BaseEntity } from './../../shared';

export class Item implements BaseEntity {
    constructor(
        public id?: number,
        public bezeichnung?: string,
        public anzahl?: number
    ) {
    }
}
