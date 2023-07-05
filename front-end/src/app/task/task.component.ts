import { Component, OnInit } from '@angular/core';
import { gantt } from "dhtmlx-gantt";
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  private listTask: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadGantt();
  }

  loadGantt() {
    this.loadData();
    setTimeout(() => {

      // console.info('loadGantt: ');
      // console.info(this.listTask);

      gantt.init('ganttContainer');
      gantt.parse({

        data: this.listTask,

        links: [
          { id: 1, source: 2, target: 3, type: "0" },
          { id: 2, source: 3, target: 4, type: "0" },
          { id: 3, source: 5, target: 6, type: "0" }
        ]
      })
    }, 200)





  }


  loadData() {
     this.taskService.search('').subscribe(
      (response) => {
        this.listTask = response.Result.map((item: any) => {
          const mappedItem: Task = {
            //...item
            id: item.Id,
            text: item.Name,
            start_date: '2022-10-10',
            duration: item.Duration,
            parent: item.IdParent,
            progress: item.Progress
          };
          return mappedItem;
        })
        console.info('loadData: ')
        console.info(this.listTask);
      }
    );
  }


//tend
}