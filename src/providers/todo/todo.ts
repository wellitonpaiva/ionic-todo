import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage'

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(todo: Todo) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, todo);
  }

  public update(key: string, todo: Todo) {
    return this.save(key, todo);
  }

  private save(key: string, todo: Todo) {
    return this.storage.set(key, todo);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getOnlyNotDone() {

    let todos: TodoList[] = [];

    return this.storage.forEach((value: Todo, key: string, iterationNumber: Number) => {
      let todo = new TodoList();
      todo.key = key;
      todo.todo = value;
      if (!todo.todo.done)
        todos.push(todo);
    })
      .then(() => {
        return Promise.resolve(todos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAll() {

    let todos: TodoList[] = [];

    return this.storage.forEach((value: Todo, key: string, iterationNumber: Number) => {
      let todo = new TodoList();
      todo.key = key;
      todo.todo = value;
      todos.push(todo);
    })
      .then(() => {
        return Promise.resolve(todos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Todo {
  task: string;
  done: boolean;
}

export class TodoList {
  key: string;
  todo: Todo;
}


