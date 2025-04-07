import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Data} from '../../shared/utils/data';
import {Pot} from '../models/pot.model';

@Injectable({
  providedIn: 'root'
})
export class PotsService {
  getAllPots(): Observable<Pot[]> {
    return of(Data.getPots());
  }
}
