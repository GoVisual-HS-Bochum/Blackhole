import { Component, OnInit } from '@angular/core';
import { PositionRaumService } from '../entities/position-raum';
import { Raum, RaumService } from '../entities/raum';

@Component({
  selector: 'jhi-room-overview',
  templateUrl: './room-overview.component.html',
  styles: []
})
export class RoomOverviewComponent implements OnInit {

  selectedLevel: number;
  maxLevel = 0;
  levels: number[] = new Array<number>();
  raeume: Raum[];

  constructor(private positionRaumService: PositionRaumService, private raumService: RaumService) { }

  ngOnInit() {
    this.positionRaumService.query()
      .map((positionRaum) => positionRaum.body)
      .subscribe((positionRaum) => {
        positionRaum.forEach((element) => {
          if (element.etage > this.maxLevel) {
            this.maxLevel = element.etage;
          }
        });

        for (let i = 1; i <= this.maxLevel; i++) {
          this.levels.push(i);
        }

        this.onLevelClick(0);
      });
  }

  onLevelClick(level: number) {
    this.selectedLevel = this.levels[level];
    this.getRäumeWithLevel();
  }

  getClass(level: number) {
    if (this.levels[level] === this.selectedLevel) {
      return 'btn btn-light active';
    } else {
      return 'btn btn-secondary';
    }
  }

  private getRäumeWithLevel() {
    this.raeume = new Array<Raum>();
    this.positionRaumService.query()
    .map((positionRaum) => positionRaum.body)
    .subscribe((positionRaum) => {
      positionRaum.forEach((element) => {
        if (element.etage === this.selectedLevel) {
          this.getRäumeAtLevel(element.id);
        }
      });
    });
  }

  private getRäumeAtLevel(raumId: number) {
    this.raumService.find(raumId).map( (r) => r.body).subscribe( (r) => this.raeume.push(r));
  }
}
