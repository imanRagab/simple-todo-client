import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Array<object>;
  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todos = [];
    this.getTodosList();
  }

  getTodosList() {

    this.todoService.getTodosList().subscribe(
      result => {
        this.todos = result['data']
      },
      error => {
        console.log(error);
      }

    );
  }

  // check todo as done
  changeState(index) {

    const state = this.todos[index]['state'];
    this.todos[index]['state'] = state?false:true;
    this.todoService.updateTodo(this.todos[index]).subscribe();
  }

  

}
