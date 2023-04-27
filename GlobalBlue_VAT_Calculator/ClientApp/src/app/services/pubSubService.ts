import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PubSubService {
  //observable sources
  messageSuject = new Subject<string>();

  //observable string streams
  message$ = this.messageSuject.asObservable();

  //service message commands
  publishMessage(message: string) {
    this.messageSuject.next(message);
  }

}
