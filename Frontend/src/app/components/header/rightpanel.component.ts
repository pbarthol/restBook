import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';
import { AppState } from '../../reducers/index';
//  declare var jQuery: any;

/** Store */
import { Store } from '@ngrx/store';
import {
  ShowRegisterAction,
  HideRegisterAction,
  ShowLoginAction,
  HideLoginAction,
  ClearMessageAction,
  ShowPasswordChangeAction,
  HidePasswordChangeAction,
  SetMessageAction,
  ShowRestaurantOverviewAction,
  HideRestaurantOverviewAction,
  ShowMealOverviewAction,
  HideMealOverviewAction,
  ShowMealEditAction,
  HideMealEditAction, HideMenuAction
} from '../../store/user-interface/actions';
import { LogoutAction } from '../../store/user/actions';
import { User } from '../../store/user/models';
import {Observable} from "rxjs";

@Component({
    selector: 'app-rightpanel',
    templateUrl: 'rightpanel.component.html',
  styleUrls: ['rightpanel.component.css'],
})
export class RightpanelComponent implements AfterViewInit {

  @ViewChild('scrollRightPanel') rightPanelMenuScrollerViewChild: ScrollPanel;
  private showMenu$: Observable<boolean>;
  private rightPanelActive: boolean;
  private rightPanelClick: boolean;

  constructor(private appStore: Store<AppState>) {
    this.showMenu$ = this.appStore.select(state => state.userinterface.showMenu);
  }

  ngOnInit() {
    this.showMenu$.subscribe(showMenu => {
      if (showMenu) {
        this.rightPanelActive = true;
      } else {
        this.rightPanelActive = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {this.rightPanelMenuScrollerViewChild.moveBar(); }, 100);
  }

  onRightPanelClick() {
    this.rightPanelClick = true;
  }

  editUser() {
    this.hideAllForms();
    this.appStore.dispatch(new ShowRegisterAction());
    // this.showMenu = false;
  }

  logout() {
    this.hideAllForms();
    this.appStore.dispatch(new LogoutAction());
    this.appStore.dispatch(new SetMessageAction({
      message: {
        type: 'success',
        title: 'Logout',
        message: 'You are logged out!',
        acknowledgeAction: ''
      }
    }));
  }

  changePassword() {
    this.hideAllForms();
    this.appStore.dispatch(new ShowPasswordChangeAction());
    // this.showMenu = false;
  }

  showRestaurantOverview(){
    this.hideAllForms();
    this.appStore.dispatch(new ShowRestaurantOverviewAction())
    // this.showMenu = false;
  }

  hideAllForms() {
    this.appStore.dispatch(new HideRegisterAction());
    this.appStore.dispatch(new HideLoginAction());
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new HideMealOverviewAction());
    this.appStore.dispatch(new HideMealEditAction());
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new HideMenuAction());
  }

}

