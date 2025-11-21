import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { config } from '../models/config';
import { AuthResponse } from '../auth/auth-response';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  initializedStorage: boolean = false;
  AUTH_SERVER_ADDRESS: string = config.authURL;

  constructor(private httpClient: HttpClient, private storage: Storage){
    this.initializeStorage();
  };

  async initializeStorage(){
    if (!this.initializedStorage) await this.storage.create();
    this.initializedStorage = true;
  };

  isInitializedStorage(){
    return this.initializedStorage;
  };

  // Create the headers for basic access authentication base64 encoding
  private getOptions(user: User) { 
    console.log();   
    let base64UserAndPassword = window.btoa(user.username + ":" + user.password);
    let basicAccess = 'Basic ' + base64UserAndPassword;
    let options = {
      headers: {
        'Authorization': basicAccess
      }
      //, withCredentials: true
    };
    return options;
  };


  register(user: User): Observable<AuthResponse> {

    console.log("Opciones de Headers:", user);

    return this.httpClient.post<AuthResponse>(
      this.AUTH_SERVER_ADDRESS, user, this.getOptions(user)).pipe(tap(async (res: AuthResponse) => {
        if (res.user) {          
          await this.storage.set("token", res.access_token);
        };
        console.log("token del Register: ", res.access_token);
      })
    );    
  };

  login(user: User): Observable<AuthResponse> {

    return this.httpClient.post<AuthResponse>(
      `${this.AUTH_SERVER_ADDRESS}/signin`, null,this.getOptions(user)).pipe(tap(async (res:AuthResponse) =>{
        if (res.user) {
          await this.storage.set("token", res.access_token);
          await this.storage.set("user", res.user)
        }
        console.log("token del Login: ", res.access_token);
      })
    );
  };

  async logout() {
    await this.storage.remove("token");
  };

  async isLoggedIn() {
    let token = await this.storage.get("token");
    if (token) { //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  };

  //Helper to GetToken
  async getToken(): Promise<string | null> {
  return await this.storage.get("token");
  };
};