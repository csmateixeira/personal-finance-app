import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiResponse} from '../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly http: HttpClient = inject(HttpClient);

    private readonly baseApiUrl: string = environment.baseApiUrl;

    doGet<T>(uri: string): Observable<T> {
        return this.http.get<ApiResponse<T>>(`${this.baseApiUrl}/${uri}`)
            .pipe(
                map((response: ApiResponse<T>) => response.data as T),
                catchError((error) => {
                    console.log('Error in GET request:', error);
                    return EMPTY;
                }),
            );
    }

    doPost<T>(uri: string, body: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(`${this.baseApiUrl}/${uri}`, body)
            .pipe(
                map((response: ApiResponse<T>) => response.data as T),
                catchError((error) => {
                    console.log('Error in POST request:', error);
                    return EMPTY;
                }),
            );
    }
}
