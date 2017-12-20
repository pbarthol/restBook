import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { User } from '../../store/user/models';
/** Store */
import { Store } from '@ngrx/store';
import { UIState } from '../../store/user-interface/reducer';
import { HideRegisterAction } from '../../store/user-interface/actions';
import { UserState } from '../../store/user/reducer';
import { CreateUserAction } from '../../store/user/actions';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['user-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class UserEditComponent implements OnInit {

  private msgs: Message[] = [];
  private selectedSalutation: string;
  private salutations: SelectItem[];
  private user: User;

  constructor(private uiStore: Store<UIState>,
  private userStore: Store<UserState>) {
    this.user = new User();
  }

  ngOnInit() {
    this.salutations = [];
    this.salutations.push({label: 'Select Salutation', value: 0});
    this.salutations.push({label: 'Herr', value: 'Herr'});
    this.salutations.push({label: 'Frau', value: 'Frau'});
  }

  hideRegister() {
    this.uiStore.dispatch(new HideRegisterAction()); // set registerIsVisible false
  }

  saveUser() {
    this.user._id = '0';
    this.userStore.dispatch(new CreateUserAction(this.user));
    // show success save message
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Registering', detail: 'Your profile is saved.'});
}
