import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../models/config';
import { Task } from '../../models/task';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  AUTH_SERVER_ADDRESS: string = config.apiURL;

  constructor(private httpClient: HttpClient, private storage : Storage) { this.initStorage();}

  // Headers options
  private getOptions(token: string) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  };

  // Init Storage
  async initStorage() {
    await this.storage.create();
  };

  // Fetch all tasks
  getTasks(token: string) {  
    let myOptions = this.getOptions(token);
    console.log(myOptions);
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS,myOptions);
  };

  // Fetch a single task by ID
  getTaskById(id: any, token: string) {
    let myOptions = this.getOptions(token);
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/${id}`,myOptions);
  };
  
  // Create a new task
  create(task: Task, token:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}` 
    }); 
    return this.httpClient.post(this.AUTH_SERVER_ADDRESS,task, { headers });
  }

  // Update task
  update(id: any, task: Task, token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}` 
    });
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/${id}`, task, { headers });
  };

  // Update status task
  updateStatus(id: any, newStatus: boolean,token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}` 
    });
    const body = { status: newStatus };  
    
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/${id}/status`, body, { headers });
  };

  // Delete task
  delete(id: any, token: string) {
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/${id}`, { headers });
  }; 
};
