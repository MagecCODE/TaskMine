import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../models/config';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private endpoint = `${config.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  // Fetch all tasks
  getTasks() {
    return this.http.get(this.endpoint);
  };

  // Fetch a single task by ID
  getTaskById(id: any) {
    return this.http.get(`${this.endpoint}/${id}`);
  };
  
  // Create a new task
  create(task: Task) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('title', task.title);
    body.set('task', task.task);
    body.set('priority', task.priority); 
    return this.http.post(this.endpoint, body.toString(), { headers });
  }

  // Update task
  update(id: any, task: Task){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('title', task.title);
    body.set('task', task.task);
    body.set('priority', task.priority); 
    return this.http.put(`${this.endpoint}/${id}`, body.toString(), { headers });
  };

  // Update status task
  updateStatus(id: any, newStatus: boolean){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('status', String(newStatus));   
    return this.http.put(`${this.endpoint}/${id}/status`, body.toString(), { headers });
  };

  // Delete task
  delete(id: any) {
    return this.http.delete(`${this.endpoint}/${id}`);
  };
};
