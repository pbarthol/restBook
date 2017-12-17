import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/** Store */
import { Store } from '@ngrx/store';
import { UIState, getRegisterVisible } from '../../store/user-interface/reducer';
import { ShowRegisterAction, HideRegisterAction } from '../../store/user-interface/actions';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  constructor(private uiStore: Store<UIState>) { }

  ngOnInit() {
  }

  register() {
    this.uiStore.dispatch(new ShowRegisterAction()); // set registerIsVisible true
  }

  login() {
    this.uiStore.dispatch(new HideRegisterAction()); // set registerIsVisible false

  }
}
