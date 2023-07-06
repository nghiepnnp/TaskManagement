import { Component, OnInit } from '@angular/core';
import { Task, gantt } from "dhtmlx-gantt";
import { TaskService } from '../services/task.service';
//import { Task } from '../models/task';
import * as moment from 'moment';

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

    gantt.config.date_format = '%Y-%m-%d %H:%i';

    gantt.init('ganttContainer');

    const dp = gantt.createDataProcessor({
      task: {
        // update: (data: Task) => this.staffService.update(1,data),
        // create: (data: Task) => this.taskService.insert(data),
        // delete: (id: any) => this.taskService.remove(id)
      },
      link: {
      }
    });

    // const kk = this.taskService.get() .then((response) => response.Result);

    // console.log(kk.result)

    // gantt.parse(kk);





    //   Promise.all([this.taskService.get()])
    //   	.then(([data]) => {
    //   		gantt.parse({ data });
    //   	});

    //     // new Promise((resolve, reject) => {
    //     //   setTimeout(() => {
    //     //     resolve('foo');
    //     //   }, 300);
    //     // });

    //   console.log('k')
    // }

  }








  loadGantt() {

    this.loadData();

    setTimeout(() => {

      // console.info('loadGantt: ');
      // console.info(this.listTask);

      // console.info('loadGantt: ');
      // console.info(this.listTask);

      //this.ganttConfig();

      //gantt.deleteTask( 16)


      gantt.init('ganttContainer');
      gantt.config.date_format = '%Y-%m-%d %H:%i';
      // Promise.all([this.taskService.search('')])
      //       .then(([data]) => {
      //         console.log(data)
      //           gantt.parse({ data });
      //       });

      //gantt.

      // gantt.parse({
      //   data: this.listTask,
      // })

      var dp = gantt.createDataProcessor({
        task: {
          update: (data: Task) => {

            console.log(data)

            this.taskService.update(data)
          },
           create: (data: Task) => this.taskService.insert(data),
           delete: (id: any) => this.taskService.delete(id)
        },
        link: {
          // update: (data: Link) => this.linkService.update(data),
          // create: (data: Link) => this.linkService.insert(data),
          // delete: (id: any) => this.linkService.remove(id)
        }
      });

      console.log("hasData")
      gantt.parse({ data: this.listTask })

    }, 200) // end func timeout

  }



  loadData(): void {
    this.taskService.search('').subscribe(
      (response) => {
        this.listTask = response.Result.map((item: any) => {
          const mappedItem: Task = {
            id: item.id,
            text: item.Name,
            start_date: new Date(item.StartDate),
            duration: item.Duration,
            progress: item.Progess,
            parent: item.IdParent
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
