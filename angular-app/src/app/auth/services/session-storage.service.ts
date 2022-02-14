import { Injectable } from '@angular/core';

// function getWindow (): any {
//   return window;
// }

// @Injectable()
// export class WindowRefService {
//   get nativeWindow () {
//       return getWindow();
//   }
// }

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService {

  constructor() { }

  setToken(token: string){
    sessionStorage.setItem('value', token);
  }

  getToken(){
    const token = sessionStorage.getItem('value')
    if(token !== null){
      return token;
    }else{
      return "";
    }
  }

  deleteToken(){
    sessionStorage.removeItem('value');
  }
}
