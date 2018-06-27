import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TodoService } from '../services/todo.service';

import { NewTodoDialogComponent } from '../new-todo-dialog/new-todo-dialog.component';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Array<object>;
  todo: object;
  constructor(
    private newTodoDialog: MatDialog,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todos = [];
    this.getTodosList();
  }

  // get list of saved todos
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

  
  // open new todo dialog
  openDialog(todo = {}) {
    this.todo = todo;
    this.todo['state'] = false;
    let dialogRef = this.newTodoDialog.open(NewTodoDialogComponent, {
      width: '400px',
      data: this.todo
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if(result == "Confirm") {
        this.addTodo(this.todo);
      }
    });
  }

  // add new todo
  addTodo(todo) {
    this.todoService.createTodo(todo).subscribe(
      result => {
        this.todos.unshift(result['data']);
      }
    );
  }
}
