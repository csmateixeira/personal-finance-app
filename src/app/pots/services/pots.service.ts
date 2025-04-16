import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pot} from '../models/pot.model';
import {HttpService} from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PotsService {
  private readonly httpService: HttpService = inject(HttpService);

  getAllPots(): Observable<Pot[]> {
    return this.httpService.doGet<Pot[]>('pots');
  }
}
