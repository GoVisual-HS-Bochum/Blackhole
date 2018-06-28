import { Component, OnInit } from '@angular/core';
import { PositionRaumService } from '../entities/position-raum';
import { Raum, RaumService } from '../entities/raum';
import { ItemSet, ItemSetService } from '../entities/item-set';
import { ItemSetItemService, ItemSetItem } from '../entities/item-set-item';
import { ItemService, Item } from '../entities/item';
import { TerminService, Termin } from '../entities/termin';

@Component({
  selector: 'jhi-room-overview',
  templateUrl: './room-overview.component.html',
  styles: []
})
export class RoomOverviewComponent implements OnInit {

  filterIsVisible: Boolean = false;
  selectedLevel: number;
  maxLevel = 0;
  levels: number[] = new Array<number>();
  raeume: Raum[];
  setClickedRow: Function;
  selectedRow: Number;
  itemSets: ItemSet[];
  itemSetItems: ItemSetItem[];
  filterList: Item[];
  selectedFilter: Item[];
  items: Item[];
  termine: Termin[];
  showBuchen: Boolean = false;

  constructor(private positionRaumService: PositionRaumService,
    private raumService: RaumService,
    private itemSetService: ItemSetService,
    private itemSetItemService: ItemSetItemService,
    private itemService: ItemService,
    private terminService: TerminService) {
    this.setClickedRow = function(index) {
      this.selectedRow = index;
      this.items = new Array<Item>();
      this.termine = new Array<Termin>();

      const raum: Raum = this.raeume[index];
      if (this.itemSets !== null && this.itemSets !== undefined) {
        this.itemSets.forEach((element) => {
          const itemSet: ItemSet = element;

          if (itemSet.id === raum.itemSetBez.id) {
            this.itemSetItems.forEach((e) => {
              const itemSetItem: ItemSetItem = e;

              if (itemSetItem.itemSetBez.id === itemSet.id) {
                let item: Item;
                itemService.find(itemSetItem.itemBez.id).subscribe((i) => {
                  item = i.body;
                  item.anzahl = itemSetItem.anzahl;
                  this.items.push(item);
                });
              }
            });
          }
        });
      }

      this.terminService.query()
      .map((termine) => termine.body)
      .subscribe((termine) => {
        termine.forEach((element) => {
          const termin = element;
          this.raeume.forEach((r) => {
            if (r.id === termin.raumNr.id) {
              termin.raum = r;

              if (termin.raum === this.raeume[index]) {
                this.termine.push(element);
              }
            }
          });
        });
      });
    };
  }

  ngOnInit() {
    this.itemSets = new Array<ItemSet>();
    this.itemSetItems = new Array<ItemSetItem>();
    this.filterList = new Array<Item>();
    this.selectedFilter = new Array<Item>();

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

    this.itemSetService.query()
      .map((itemSets) => itemSets.body)
      .subscribe((itemSets) => {
        itemSets.forEach((element) => {
          this.itemSets.push(element);
        });
      });

    this.itemSetItemService.query()
      .map((itemSetItems) => itemSetItems.body)
      .subscribe((itemSetItems) => {
        itemSetItems.forEach((element) => {
          this.itemSetItems.push(element);
        });
      });

    this.itemService.query()
      .map((items) => items.body)
      .subscribe((items) => {
        this.filterList = items;
      });
  }

  onLevelClick(level: number) {
    this.selectedLevel = this.levels[level];
    this.getRäumeWithLevel();
  }

  getClass(level: number) {
    if (this.levels[level] === this.selectedLevel) {
      return 'btn btn-light';
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
    this.raumService.find(raumId).map((r) => r.body).subscribe((r) => this.raeume.push(r));
  }

  public checkboxClick(filterID: Item) {
    const index: number = this.selectedFilter.indexOf(filterID);
    if ( index > -1 ) {
      this.selectedFilter.splice(index, 1);
    } else {
      this.selectedFilter.push(filterID);
    }
    this.colorRoomsByFilter();
  }

  private colorRoomsByFilter() {
    const raeume: Raum[] = new Array<Raum>();

    this.raeume.forEach((raum) => {
      if (raum.itemSetBez !== null && raum.itemSetBez !== undefined) {
        let itemSet: ItemSet;
        this.itemSets.forEach((element) => {
          if (element.id === raum.itemSetBez.id) {
            itemSet = element;
          }
        });
        const items: Item[] = new Array<Item>();

        this.itemSetItems.forEach((element) => {
          if (element.itemSetBez.id === itemSet.id) {
            this.filterList.forEach((item) => {
              if (item.id === element.itemBez.id) {
                items.push(item);
              }
            });
          }
        });

        this.selectedFilter.forEach((filter) => {
          const index: number = items.indexOf(filter);
          if ( index > -1 ) {
            raeume.push(raum);
          }
        });
      }
    });
    this.raeume.forEach((r) => {
      document.getElementById(r.raumNr).style.backgroundColor = '#FFFFFF';
    });

    this.raeume.forEach((r) => {
      raeume.forEach((filteredRaum) => {
        
        if (r.id === filteredRaum.id) {
          document.getElementById(filteredRaum.raumNr).style.backgroundColor = '#660066';
        }
      });
    });
  }
}
