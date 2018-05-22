import { BaseEntity } from './../../shared';

export class ItemSetItem implements BaseEntity {
    constructor(
        public id?: number,
        public anzahl?: number,
        public itemSetBez?: BaseEntity,
        public itemBez?: BaseEntity,
    ) {
    }
}
