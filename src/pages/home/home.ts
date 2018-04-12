import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: string[] = [];
  completedTodo: string[] = [];
  todo: string;

  constructor(public navCtrl: NavController) {
  }

  add() {
    if(this.todo == "") {
      return;
    }
    this.todos.push(this.todo);
    this.todo = "";
  }

  complete(item) {
    var index = this.todos.indexOf(item, 0);
    if(index > -1) {
      this.todos.splice(index, 1);
    }
    this.completedTodo.push(item);
  }

  delete(item) {
    var index = this.todos.indexOf(item, 0);
    if(index > -1) {
      this.todos.splice(index, 1);
    }
  }

}
