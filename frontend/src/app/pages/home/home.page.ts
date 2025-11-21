import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TaskService } from '../../services/task/task-service';
import { Task } from '../../models/task';
import { AuthService } from '../../auth/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  tasksList : Array<Task> = [];
  loading = true;

  constructor(private router: Router, 
              private taskServices : TaskService,
              private authService : AuthService,
              private storage : Storage
            ) {  

    //Eventlistener to reload data
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd ){
        this.getAllTasks();
      }
    });
    
  };

  async ngOnInit() {
    const token = await this.authService.getToken();
    console.log(await this.storage.get("token"));
    if (!token) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.loading = false;
    //Settimeout to not duplicated data
    setTimeout(() => this.getAllTasks(), 100);
  };

  // loginOrJustEnter(){
  //   this.authService.isLoggedIn().then(loggedIn => {
  //     if(loggedIn){
  //       this.router.navigateByUrl("/home");
  //       return;
  //     } 
  //     this.router.navigateByUrl("/login");
  //   })
  // };

  // Service Call
  async getAllTasks(){
    const token = await this.authService.getToken();
    
    if (!token) {
    console.error("No token found in storage");
    this.router.navigateByUrl('/login');
    return;
    };

    this.taskServices.getTasks(token).subscribe({
      next: (res: any) => {
        this.tasksList = res;
        console.log(this.tasksList);
      },
      error: err => {
        console.error("Error fetching tasks:", err);
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        };
      }
    });
  };

  // Service calls
  // async getAllTasks() {
  //   // Clean array to not duplicated data
  //   let token = await this.storage.get("token");
  //   this.taskServices.getTasks(token).subscribe((res: any) => {
  //     this.tasksList = res;
  //     console.log(this.tasksList);
  //   });
  // };

  async updateTask(id:any){
    this.router.navigate([`/task-form/${id}`])
  };

  async deleteTask(id:any){
    const token = await this.storage.get("token");
    this.taskServices.delete(id, token).subscribe(()=>{
      this.getAllTasks();
    });
  };

  async doTask(task:Task){
    const token = await this.storage.get("token");
    const newStatus = !task.status
    this.taskServices.updateStatus(task.id,newStatus,token).subscribe(()=>{
      task.status=newStatus;
    }, error =>{console.log('Error to updte status: ', error)});
  };
  
  // Routes Task Form
  async newTask() {
    this.router.navigateByUrl('/task-form');
  };  
};
