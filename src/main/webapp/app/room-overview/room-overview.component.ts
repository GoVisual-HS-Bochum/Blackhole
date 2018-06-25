import { Component, OnInit } from '@angular/core';
import { PositionRaumService } from '../entities/position-raum';
import { Raum, RaumService } from '../entities/raum';
import { Item, ItemService } from '../entities/item';

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
  items: Item[];
  isVisible = false; // zeigen oder verstecken die Inventare

  constructor(private positionRaumService: PositionRaumService, private raumService: RaumService, private itemService: ItemService) { }

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

    // laden die Inventare
    this.getItem();
  }

    // zeigen und verstecken die Inventare
    onHideShow() {
      if (this.isVisible === true) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    }

//  get selectedItems() {
//    return this.items
//              .filter(opt => opt.checked)
//              .map(opt => opt.value)
//  }

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

  // laden alle Inventare
  private getItem() {
    this.items = new Array<Item>();
    this.itemService.query()
    .map((item) => item.body)
    .subscribe((item) => {
      item.forEach((element) => {
        this.itemService.find(element.id).map((r) => r.body).subscribe((r) => this.items.push(r));
      });
    });
  }

  public onCheckboxStateChange(changeEvent: MatCheckboxChange, id: number) {
      const index = this.items.findIndex(x => x.id === id);

      if (index === -1) {
          console.warn('Keine Inventare');
          return;
      }

      items[index].checked = changeEvent.checked;
  }
}
