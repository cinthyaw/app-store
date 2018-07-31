import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

  constructor(private db:AngularFireDatabase){ 
  }

  login(path):Observable<any>{
    return this.db.list(path).valueChanges();
  }

}
