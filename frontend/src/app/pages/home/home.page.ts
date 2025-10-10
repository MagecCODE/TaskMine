import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  tasksList : any=[];

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
    this.getAllTasks();
  }

  // Service calls
  getAllTasks() {
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



  // Routes Task Form
  newTask() {
    this.router.navigateByUrl('/task-form');
  }
}
