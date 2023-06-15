import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<string>('');

  getCategory() {
    return this.categorySubject.asObservable();
  }

  setCategory(category: string) {
    this.categorySubject.next(category);
  }
}
