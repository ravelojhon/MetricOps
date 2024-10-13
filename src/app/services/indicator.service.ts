import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class IndicatorService {
  isloading$ = false;
  private infoPerson$ = new BehaviorSubject<any | undefined>(undefined);

  setData(data: any | undefined) {
    this.infoPerson$.next(data)
  }

  getData$(): Observable<any | undefined> {
    return this.infoPerson$.asObservable()
  }

  getInfoPerson(typeDocument: string, document: number) {
    
    
  }


}
