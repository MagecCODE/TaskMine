import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../models/config';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    AUTH_SERVER_ADDRESS: string = config.authURL;

  constructor(private httpClient: HttpClient, private storage : Storage) { }

  // Headers options
  private getOptions(token: string) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  };

  getUsers(token: string) {
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS, myOptions);
  }  
}
