import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Entry } from '../../shared/domain/entry';

@Component({
  selector: 'equip-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent implements OnInit {



  @Input()
  entries: Array<Entry>;

  constructor() { }

  ngOnInit() {
  }

  calcCost(index: number): number {
      return this.calc(index, e => e.selectedItem.cost);
  }

  calcWeight(index: number): number {
    return this.calc(index, e => e.selectedItem.weight);
  }

  private calc(index, selector: (entry) => number): number {
    return this.entries
      .slice(0, index)
      .filter(e => !!e.selectedItem)
      .map(selector)
      .reduce((a, b) => a + b, 0);
  }

}
