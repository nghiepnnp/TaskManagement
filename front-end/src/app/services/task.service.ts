import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  search(keyword: string): Observable<any> {
    const url = `https://localhost:44305/api/task?name=${keyword}`;
    return this.http.get(url);
  }

  find(id: number): Observable<any> {
    const url = `https://localhost:44305/api/staff/${id}`;
    return this.http.get(url);
  }

  insert(data: any): Observable<any> {
    const url = `https://localhost:44305/api/staff`;
    return this.http.post(url, data);
  }

  update(id: number, data: any): Observable<any> {
    const url = `https://localhost:44305/api/staff/${id}`;
    return this.http.put(url, data);
  }

  delete(id: number): Observable<any> {
    const url = `https://localhost:44305/api/staff/${id}`;
    return this.http.delete(url);
  } 
}
