import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  /*
  | -------------------------------------------------------------------
  |  Create API_URL in environment.ts
  */
  apiUrl = environment.API_URL;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  randomUniq(lenght: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < lenght; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  setHttpOptions(auth: {username: string, password: string}) {
    return {headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${auth.username}:${auth.password}`)
    })}
  }

  filter(value: string, field: string[]) {
    const filterValue = value.toLowerCase();
    return field.filter(option => option.toLowerCase().includes(filterValue));
  }

  showSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'CLOSE', {
      duration: duration
    }).onAction().subscribe(() => {
      this.snackBar.dismiss();
    });
  }

  showSnackBarWithUndo(message: string, undoMessage: string, duration: number) {
    let undo = false;

    const snackBarRef = this.snackBar.open(message, 'UNDO', {
      duration: duration
    })
    
    snackBarRef.onAction().subscribe(() => {
      undo = true;
      this.snackBar.open(undoMessage, 'CLOSE', {
        duration: duration
      }).onAction()
        .subscribe(() => {
          this.snackBar.dismiss();
        });
    });

    return new Promise((resolve, reject) => {
      snackBarRef.afterDismissed().subscribe(result => {
        resolve(undo);
      }, reject);
    }); 
  }
}
