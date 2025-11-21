import { Component, AfterViewInit} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService} from '../app/services/photo/photo-service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements AfterViewInit{
  
  user:any ={};
  capturePhoto: string = "";


  // Inert attribute to hidden pages for accessibility
  ngAfterViewInit() {
    const observer = new MutationObserver(() => {
      
      // Remove Inert from visible pages and add to hidden ones
      document.querySelectorAll('.ion-page').forEach(page => {
        if (page.classList.contains('ion-page-hidden')) {
          page.setAttribute('inert', '');
        } else {
          page.removeAttribute('inert'); 
        }
      });
    observer.observe(document.body, { attributes: true, subtree: true });
    });
  }

  
  constructor(
    private storage: Storage, 
    private authService : AuthService, 
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private photoService:PhotoService
) {
    this.initStorage();
    this.initUser();
  };

  async initUser(){
    await this.initStorage();
  };

  async initStorage() {
    await this.storage.create();
    this.user = await this.storage.get("user");
  };
  
  //Logout
  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/login");
    });
  };

  // Capitaliza Title Menu
  myCapitalize(str: string) : string {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async changeProfilePhoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiar Foto Perfil',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera-outline',
          handler: async () => {
            const data = await this.photoService.takePhoto();
            if (data.webPath) {
              await this.photoService.updateProfilePhoto(data.webPath);
              this.user = await this.storage.get('user'); // refrescar menú
            }
          }
        },
        {
          text: 'Seleccionar de Archivos',
          icon: 'image-outline',
          handler: async () => {
            const data = await this.photoService.pickImage();
            if (data.webPath) {
              await this.photoService.updateProfilePhoto(data.webPath);
              this.user = await this.storage.get('user'); // refrescar menú
            }
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  };
};
