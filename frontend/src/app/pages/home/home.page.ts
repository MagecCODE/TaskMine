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
    //Settimeout to not duplicated data
    setTimeout(() => this.getAllTasks(), 100);
  }

  // Service calls
  getAllTasks() {
    // Clean array to not duplicated data
    this.tasksList = [];
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

  doTask(task:any){
    const newStatus = !task.status
    this.taskServices.updateStatus(task.id,newStatus).subscribe(()=>{
      task.status=newStatus;
    }, error =>{console.log('Error to updte status: ', error)});
  };

  // Methods for styling card colors
  getPriorityColor(priority: any){
    switch (priority.toLowerCase().trim()) {
      case 'importante':
        return 'danger';
      case 'no importante':
        return 'success';
      default:
        return 'primary';
    };
  };

  getStatusLabel(task: any) {
    return task.status ? 'Realizada' : 'Pendiente';
  };

  getStatusColor(task: any) {
    return task.status ? 'primary' : 'dark';
  };

  // Routes Task Form
  newTask() {
    this.router.navigateByUrl('/task-form');
  }
}
