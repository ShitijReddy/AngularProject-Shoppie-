import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private dataSubject = new BehaviorSubject<any>(null);

  public data$ = this.dataSubject.asObservable();
  public isSearched$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
