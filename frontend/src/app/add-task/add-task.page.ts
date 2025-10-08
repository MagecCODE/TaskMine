import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: false
})
export class AddTaskPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
 
  goHome() {
    this.router.navigateByUrl('/home');
  } 
}
