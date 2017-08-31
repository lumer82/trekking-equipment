import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'equip-edit-equipment-list',
  templateUrl: './edit-equipment-list.component.html',
  styleUrls: ['./edit-equipment-list.component.scss']
})
export class EditEquipmentListComponent implements OnInit {

  id$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id$ = this.activatedRoute.paramMap.map(map => +map.get('id'));
  }

}
