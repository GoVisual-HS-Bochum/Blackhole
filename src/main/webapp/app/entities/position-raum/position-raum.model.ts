import { BaseEntity } from './../../shared';

export class PositionRaum implements BaseEntity {
    constructor(
        public id?: number,
        public gebaeude?: string,
        public etage?: number,
        public gang?: number,
        public seite?: string,
        public links?: string,
        public rechts?: string,
    ) {
    }
}
