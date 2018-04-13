import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TodoProvider, Todo, TodoList } from '../../providers/todo/todo';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  todos: TodoList[];
  model: Todo;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private todoProvider: TodoProvider, private toast: ToastController) {
    if (this.navParams.data.todo && this.navParams.data.key) {
      this.model = this.navParams.data.todo;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Todo();
    }
  }

  ionViewDidEnter() {
    this.todoProvider.getOnlyNotDone()
      .then((result) => {
        this.todos = result;
      });
  }

  complete(singleTodo: TodoList) {
    singleTodo.todo.done = true;
    this.updateTodo(singleTodo.key, singleTodo.todo)
    .then(() => {
      this.toast.create({ message: 'Todo completed', duration: 3000, position: 'botton' }).present();
      this.todoProvider.getOnlyNotDone()
        .then((result) => {
          this.todos = result;
        });
    }).catch(() => {
      this.toast.create({ message: 'Error when completing todo', duration: 3000, position: 'botton' }).present();
    });
  }

  save() {
    this.model.done = false;
    this.saveTodo()
      .then(() => {
        this.toast.create({ message: 'Todo created', duration: 3000, position: 'botton' }).present();
        this.model.task = "";
        this.todoProvider.getOnlyNotDone()
          .then((result) => {
            this.todos = result;
          });
      }).catch(() => {
        this.toast.create({ message: 'Error when creation todo', duration: 3000, position: 'botton' }).present();
      });
  }

  delete(singleTodo: TodoList) {
    this.removeTodo(singleTodo.key)
      .then(() => {
      this.toast.create({ message: 'Todo deleted', duration: 3000, position: 'botton' }).present();
      this.todoProvider.getOnlyNotDone()
        .then((result) => {
          this.todos = result;
        });
    }).catch (() => {
      this.toast.create({ message: 'Error when deleting todo', duration: 3000, position: 'botton' }).present();
    });
  }

  private removeTodo(key: string) {
    return this.todoProvider.remove(key);
  }

  private updateTodo(key: string, todo: Todo) {
    return this.todoProvider.update(key, todo);
  }


  private saveTodo() {
    return this.todoProvider.insert(this.model);
  }

}
