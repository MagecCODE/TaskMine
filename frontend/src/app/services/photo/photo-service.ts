import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { config } from '../../models/config';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})

export class PhotoService {

  AUTH_SERVER_ADDRESS: string = config.authURL;
  
  constructor(private http: HttpClient,private storage: Storage){};

  public async takePhoto(): Promise<Photo> {
    
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return capturedPhoto;
  }

  public async pickImage(): Promise<GalleryPhoto> {
    // Pick an image
    const capturedPhotos = await Camera.pickImages({
      limit: 1,
      quality: 100
    });

    return capturedPhotos.photos[0];
  };

  async updateProfilePhoto(webPath: string) {
    this.initStoragePhoto();    

    const response = await fetch(webPath);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, 'profile.jpg');

    const user = await this.storage.get('user');
    const token = await this.storage.get('token');

    if (!user || !token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.AUTH_SERVER_ADDRESS}/${user.id}/photo`, formData, { headers }).subscribe(async (res: any) => {
        // Actualizar storage con la nueva foto
        user.filename = webPath;
        await this.storage.set('user', user);
    });
  };
/*
  async updateProfilePhoto(photo: Photo | GalleryPhoto) {
  await this.initStoragePhoto();

  // Usa webPath si viene de Camera, o convierte path si viene de Filesystem
  const safePath = photo.webPath || Capacitor.convertFileSrc(`${photo.path}`);

  const response = await fetch(safePath);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append('file', blob, 'profile.jpg');

  const user = await this.storage.get('user');
  const token = await this.storage.get('token');

  if (!user || !token) return;

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.put(`${this.AUTH_SERVER_ADDRESS}/${user.id}/photo`, formData, { headers })
    .subscribe(async (res: any) => {
      // Guarda la URL que te devuelva el backend, no el webPath temporal
      user.filename = res.filename || safePath;
      await this.storage.set('user', user);
    });
};
*/

  async initStoragePhoto(){
    await this.storage.create();    
  };
};
