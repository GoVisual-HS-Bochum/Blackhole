import { BaseEntity } from './../../shared';

export class ItemSet_item implements BaseEntity {
    constructor(
        public id?: number,
        public anzahl?: number,
        public itemSetBez?: BaseEntity,
        public bezeichnung?: BaseEntity,
    ) {
    }
}
