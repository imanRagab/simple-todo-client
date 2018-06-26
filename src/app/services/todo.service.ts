import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private apiService: ApiService,
  ) { }

  // get todos list
  getTodosList(): Observable<Array<object>> {
    const route = `/api/todos/`;
    return this.apiService.get(route);
  }

  // get todo data
  getTodo(id :number): Observable<object> {
    const route = `/api/todos/${id}`;
    return this.apiService.get(route);
  }

  //create todo
  createTodo(todo :object): Observable<object> {
    const route = `/api/todos/`;
    return this.apiService.post(route, todo);
  }

  // update todo
  updateTodo(todo :object): Observable<object> {
    const route = `/api/todos/${todo['id']}`;
    return this.apiService.put(route, todo);
  }

  // delete todo
  deleteTodo(id :number) {
    const route = `/api/todos/${id}`;
    return this.apiService.delete(route);
  }

}
