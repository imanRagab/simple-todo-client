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
  openDialog(todo = {}, index = 0) {
    this.todo = todo;
    let mode = 'create';
    if(todo['title']) {
      mode = 'edit';
    }
    this.todo['state'] = false;
    let dialogRef = this.newTodoDialog.open(NewTodoDialogComponent, {
      width: '400px',
      data: {todo: this.todo, mode: mode}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "Confirm") {
        if(mode == 'create')
          this.addTodo(this.todo);
        else 
          this.editTodo(this.todo, index);
      }
    });
  }

  // add new todo
  addTodo(todo) {
    this.todoService.createTodo(todo).subscribe(
      result => {
        this.todos.unshift(result['data']);
      },
      error => {
        console.log(error)
      }
    );
  }

  // edit todo
  editTodo(todo, index) {
    this.todoService.updateTodo(todo).subscribe(
      result => {
        this.todos[index] = (result['data']);
      },
      error => {
        console.log(error)
      }
    );
  }

  // delete todo 
  deleteTodo(index) {

    const todo = this.todos[index];
    if(confirm('Delete this todo ?')){
      this.todoService.deleteTodo(todo['_id']).subscribe(
        result => {
          this.todos.splice(index, 1);
        },
        error => {
          console.log(error)
        }
      );
    }
  }
}
