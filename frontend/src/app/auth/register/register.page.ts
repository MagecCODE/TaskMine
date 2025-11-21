import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../models/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;  

  constructor(
    private router: Router, 
    private authService: AuthService,
    private alertController: AlertController,
    public formBuilder: FormBuilder) {

      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', [Validators.required, Validators.minLength(6)]],

      });
    };

  ngOnInit() {};

  registerUser() {
    const { name, username, email, password, confirm }= this.userForm.value; 
  
    if(password !=confirm){this.presentAlert("Password do not match!!")};
    
    if(this.userForm.valid){
      let user: User = { name, username, password, email};
      console.log("Usuario antes de llamar al servicio auth:",user);
      this.authService.register(user).subscribe(() => {
      this.router.navigateByUrl('login');
      });
    }else{
      this.presentAlert("Format form invalid!!")
    };   
  };
  
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      buttons: ['OK']
    });
    await alert.present();
  };
};