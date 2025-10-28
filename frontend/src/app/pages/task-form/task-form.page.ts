import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TaskService} from '../../services/task-service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: false
})

export class TaskFormPage implements OnInit {

  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  

  constructor(private taskService: TaskService,
    private activedRoute: ActivatedRoute ,
    private router: Router,
    public formBuilder: FormBuilder) {

      this.taskForm = this.formBuilder.group({
        title: ['', Validators.compose([Validators.required]),],
        task: ['', Validators.compose([Validators.required]),],
        priority: ['', Validators.compose([Validators.required]),]
      });
    };

  ngOnInit() {
    const id = this.activedRoute.snapshot.paramMap.get('id');

    if(id){
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    };
  };

  // Method and service call
  onSubmit() {
    if(this.taskId && this.isEditMode ){
      this.saveChanges();
    }else{
      this.createTask();
    };
  };

  createTask(){
    if(this.taskForm.valid){
      console.log("Form Valid: ", this.taskForm.value);
      this.taskService.create(this.taskForm.value).subscribe(res => {
        this.router.navigate(['/home']);
      });
    }else{
      console.log("Form not valid: ", this.taskForm.value);
    }
  };

  saveChanges(){
    const id = this.activedRoute.snapshot.paramMap.get('id');

    if(id){
      this.taskService.update(+id, this.taskForm.value).subscribe(()=>{
        this.router.navigate(['/home']);
      });
    };
  };

  loadTask(id:any){
    this.taskService.getTaskById(id).subscribe((res:any)=>{
      console.log('Response data: ', res);
      this.taskForm.patchValue({
          title: res.title,
          task: res.task,
          priority: res.priority
      });
    });
  };

  // Clean Form

}
