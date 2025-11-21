import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;  

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    public formBuilder: FormBuilder){

      this.loginForm = this.formBuilder.group({        
        username: ['', Validators.required],       
        password: ['', Validators.required]
      });
    };

  ngOnInit() {};

  loginUser() {
    const {name,username,password,email, filename}= this.loginForm.value;
    let user: User = { name,username, password, email, filename};
    
    this.authService.login(user).subscribe({
      next: (res) => {
        if (!res.access_token) {
          this.presentAlert("invalid credentials");
          return;
        }
        this.router.navigateByUrl('/home');
        this.loginForm.reset();
      },
      error: err => {
        this.presentAlert("Error");
      }
    });
  };


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
