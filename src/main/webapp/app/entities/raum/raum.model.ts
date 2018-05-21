import { BaseEntity } from './../../shared';

export class Raum implements BaseEntity {
    constructor(
        public id?: number,
        public raumNr?: string,
        public art?: string,
        public posID?: BaseEntity,
        public groID?: BaseEntity,
        public itemSetBez?: BaseEntity,
    ) {
    }
}
