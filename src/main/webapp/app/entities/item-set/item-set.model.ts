import { BaseEntity } from './../../shared';

export class ItemSet implements BaseEntity {
    constructor(
        public id?: number,
        public itemSetBez?: string,
    ) {
    }
}
