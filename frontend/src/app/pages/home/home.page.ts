import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  tasksList : Array<Task> = [];

  constructor(private router: Router, 
              private taskServices : TaskService) {      
    //Eventlistener to reload data
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd ){
        this.getAllTasks();
      }
    });
    
  };

  ngOnInit() {
    //Settimeout to not duplicated data
    setTimeout(() => this.getAllTasks(), 100);
  }

  // Service calls
  getAllTasks() {
    // Clean array to not duplicated data
    this.taskServices.getTasks().subscribe((res: any) => {
      this.tasksList = res;
      console.log(this.tasksList);
    });
  };

  updateTask(id:any){
    this.router.navigate([`/task-form/${id}`])
  };

  deleteTask(id:any){
    this.taskServices.delete(id).subscribe(()=>{
      this.getAllTasks();
    });
  };

  doTask(task:Task){
    const newStatus = !task.status
    this.taskServices.updateStatus(task.id,newStatus).subscribe(()=>{
      task.status=newStatus;
    }, error =>{console.log('Error to updte status: ', error)});
  };
  
  // Routes Task Form
  newTask() {
    this.router.navigateByUrl('/task-form');
  }
}
