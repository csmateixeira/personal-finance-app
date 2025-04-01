import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../utils/data';
import {Budget, Pot} from '../models/features.models';

@Injectable({
  providedIn: 'root'
})
export class PotsService {
  getAllPots(): Observable<Pot[]> {
    return of(Data.getPots());
  }
}
