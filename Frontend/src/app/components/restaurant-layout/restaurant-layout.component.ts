import { Component, OnInit } from '@angular/core';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';

import { Shape, Table } from './models';
/** Store */
import {
  HideRestaurantLayoutAction
} from '../../store/user-interface/actions';

@Component({
  selector: 'app-restaurant-layout',
  templateUrl: './restaurant-layout.component.html',
  styleUrls: ['./restaurant-layout.component.css']
})


export class RestaurantLayoutComponent implements OnInit {

  private shapes: Shape[];
  private shape: Shape;
  private tables: Table[];
  private table: Table;
  private gridTemplate: string;
  // private showGrid: boolean;

  constructor(private appState: Store<AppState>) { }

  ngOnInit() {
    this.gridTemplate = 'noGrid';
    // this.showGrid = false;
    /** initialized Shapes */
    this.shapes = [];
    this.shape = new Shape();
    this.shape.icon = '../../icons/shapes/noun_103003.svg';
    this.shapes.push(this.shape);
    this.shape = new Shape();
    this.shape.icon = '../../icons/shapes/noun_103013.svg';
    this.shapes.push(this.shape);
    this.shape = new Shape();
    this.shape.icon = '../../icons/shapes/noun_102999.svg';
    this.shapes.push(this.shape);
    this.shape = new Shape();
    this.shape.icon = '../../icons/shapes/noun_103000.svg';
    this.shapes.push(this.shape);
    this.shape = new Shape();
    this.shape.icon = '../../icons/shapes/noun_103001.svg';
    this.shapes.push(this.shape);
    this.shape = new Shape();
    this.shape.icon = '../../icons/shapes/noun_103002.svg';
    this.shapes.push(this.shape);
    /** initialized Tables */
    this.tables = [];
    this.table = new Table();
    this.table.icon = '../../icons/tables/noun_585107.svg';
    this.tables.push(this.table);
    this.table = new Table();
    this.table.icon = '../../icons/tables/noun_692194.svg';
    this.tables.push(this.table);
    this.table = new Table();
    this.table.icon = '../../icons/tables/noun_1106551.svg';
    this.tables.push(this.table);
    this.table = new Table();
    this.table.icon = '../../icons/tables/noun_1420511.svg';
    this.tables.push(this.table);
  }

  cancel(){
    this.appState.dispatch(new HideRestaurantLayoutAction());
  }

  shapeChosen(shape: Shape) {
    if (shape.icon === '../../icons/shapes/noun_103003.svg') {
      this.gridTemplate = 'grid1';
      // this.showGrid = true;
    }
    if (shape.icon === '../../icons/shapes/noun_103013.svg') {
      this.gridTemplate = 'grid2';
      // this.showGrid = true;
    }

  }

  tableChosen(table: Table) {

  }
}
