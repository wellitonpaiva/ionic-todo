import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TodoList, Todo, TodoProvider } from '../../providers/todo/todo';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  filteredTodos: TodoList[];
  todos: TodoList[];
  model: Todo;
  key: string;
  searchTerm: string = '';

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
    this.todoProvider.getAll()
      .then((result) => {
        this.todos = result;
        this.setFilteredItems();
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
          this.setFilteredItems();
      }).catch(() => {
        this.toast.create({ message: 'Error when deleting todo', duration: 3000, position: 'botton' }).present();
      });
  }

  setFilteredItems() {
    this.filteredTodos = this.filterItens(this.searchTerm);
  }

  filterItens(searchTerm) {
    return this.todos.filter((item) => {
      return undefined != item.todo.task ? item.todo.task.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 : false ;
    });
  }

  private removeTodo(key: string) {
    return this.todoProvider.remove(key);
  }

}