import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'; 
import { user } from 'src/datainterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dataSubject = new BehaviorSubject<any>(null);
  private loguserSubject = new BehaviorSubject<user>({ id: '', username: '', password: '', role: '' });
  // private booleanDataSubject = new BehaviorSubject<boolean>(false);

  public data$ = this.dataSubject.asObservable();
  public loguser$ = this.loguserSubject.asObservable();
  // public isSearched$ = this.booleanDataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  } 

  setLogUser(loguser: user){ 
    this.loguserSubject.next(loguser); 
  }

  

  // setBoolean(value : boolean){
  //   this.dataSubject.next(value);
  // }
}
