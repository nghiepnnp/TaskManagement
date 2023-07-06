import { Component, OnInit } from '@angular/core';
import { Task, gantt } from "dhtmlx-gantt";
import { TaskService } from '../services/task.service';
//import { Task } from '../models/task';
import * as moment from 'moment';
import { timeout } from 'rxjs';

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



      gantt.config.date_format = '%Y-%m-%d %H:%i';


      var dp = gantt.createDataProcessor({
        task: {
          update: (id: number, data: Task) => {

            console.log('Alo data update dau')
            console.log(id)
            console.log(data)

            this.taskService.update(id, data).subscribe(
              (response) => {
                if (response.Ok === true) {
                  alert('Success')
                } else {
                  alert('Error');
                }
              }
            )

            //setTimeout(() => console.log(result.), 500)

          },
          create: (data: Task) => this.taskService.insert(data),
          delete: (id: any) => this.taskService.delete(id)
        }
      });
      setTimeout(() => {
        console.log("Init Success")
        gantt.init('ganttContainer');
        console.log("Parse")
        gantt.parse({ data: this.listTask })

      }, 500)


    }, 200) // end func timeout

  }



  loadData(): void {
    this.taskService.search('').subscribe(
      (response) => {
        this.listTask = response.Result.map((item: any) => {
          const mappedItem: Task = {
            id: item.Id,
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
