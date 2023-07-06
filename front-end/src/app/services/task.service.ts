// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { HandleError } from './service-helper';
// import { Task } from '../models/task';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private taskUrl = 'https://localhost:44305/api/task';

//   constructor(private http: HttpClient) { }

//   get(): Promise<any> {
//     return this.http.get(this.taskUrl)
//       .toPromise()
//       .catch(HandleError);
//   }

//   insert(task: Task): Promise<Task> {
//     return this.http.post(this.taskUrl, task)
//       .toPromise()
//       .catch(HandleError);
//   }

//   update(task: Task): Promise<void> {
//     return this.http
//       .put(`${this.taskUrl}/${task.id}`, task)
//       .toPromise()
//       .catch(HandleError);
//   }

//   remove(id: number): Promise<void> {
//     return this.http.delete(`${this.taskUrl}/${id}`)
//       .toPromise()
//       .catch(HandleError);
//   }
// }





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'dhtmlx-gantt';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  private url = 'https://localhost:44305/api/task';

  search(keyword: string): Observable<any> {
    return this.http.get(`${this.url}?name=${keyword}`);
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  //
  update(id: number, task: Task): Observable<any> {

    console.log('service')
    console.log(id)
    console.log(task)

    const url = `${this.url}/${task.id}`;
    return this.http.put(url, task);
  }




  insert(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }





  find(id: number): Observable<any> {
    const url = `https://localhost:44305/api/staff/${id}`;
    return this.http.get(url);
  }

}
