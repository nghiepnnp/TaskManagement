import { Component, OnInit } from '@angular/core';
import { Task, gantt } from "dhtmlx-gantt";
import { TaskService } from '../services/task.service';
import { StaffService } from '../services/staff.service';
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
  private listStaff: any[] = [];

  constructor(private taskService: TaskService, private staffService: StaffService) { }

  ngOnInit(): void {
    this.loadGantt();
  }


  loadGantt() {
    this.loadData();
    setTimeout(() => {
      this.ganttConfig()
      gantt.init('ganttContainer');
      gantt.parse({ data: this.listTask })
      gantt.createDataProcessor({
        task: {
          create: (data: any) => {
            data.id = 0;
            this.taskService.insert(data).subscribe(
              (response) => {
                if (response.Ok === true) {
                  alert('Success')
                } else {
                  alert('Error');
                }
              })
          },
          update: (data: any, id: any) => {

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
          },

          delete: (id: number) => {
            this.taskService.delete(id).subscribe(
              (response) => {
                if (response.Ok === true) {
                  alert('Success')
                } else {
                  alert('Error');
                }
              }
            )
          }
        }
      });

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
            parent: item.IdParent,
            type: item.Type,
            label: item.Label,
            staffId: item.StaffId
          };
          return mappedItem;
        })
        console.info('loadData: ')
        console.info(this.listTask);
      }
    );

    this.loadListStaff();
  }


  ganttConfig() {

    //setTimeout(() => this.loadListStaff(), 400);

    console.log(this.listStaff)

    gantt.config.date_format = '%Y-%m-%d %H:%i';

    gantt.config.grid_width = 800;
    gantt.config.columns = [
      { name: "text", label: 'Name', tree: true, width: 200, resize: true },
      { name: "label", label: "Label", align: "center", width: 50 },
      { name: "type", label: "Type", align: "center", width: 50 },
      { name: "start_date", label: "Start Date", align: "center", width: 100 },
      { name: "duration", label: "Duration", align: "center", width: 100 },
      { name: "add", label: "", width: 44 }
    ];

    gantt.config.lightbox.sections = [
      { name: "description", height: 55, map_to: "text", type: "textarea", focus: true },
      {
        name: "label", height: 32, map_to: "label", type: "select", options: [
          { key: "Feature", label: "Feature" },
          { key: "Bug", label: "Bug" },
          { key: "Hotfix", label: "Hotfix" }
        ]
      },
      {
        name: "type", height: 32, map_to: "type", type: "select", options: [
          { key: "High", label: "High" },
          { key: "Normal", label: "Normal" },
          { key: "Low", label: "Low" }
        ]
      },
      {
        name: "staff", height: 32, map_to: "staffId", type: "select", options: this.listStaff
      },
      { name: "time", type: "duration", map_to: "auto" }];

  }

  loadListStaff() {
    this.staffService.search('').subscribe(
      (response: any) => {

        this.listStaff = response.Result.map((item: any) => ({
          key: item.Id,
          label: item.ShortName
        }));

        console.log(this.listStaff)

      }
    );
  }



  //tend
}
