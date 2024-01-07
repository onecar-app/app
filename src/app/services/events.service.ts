import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private data = new Subject<any>();

    pushData(data: any) {
        this.data.next(data);
    }

    getObservable(): Subject<any> {
        return this.data;
    }
}