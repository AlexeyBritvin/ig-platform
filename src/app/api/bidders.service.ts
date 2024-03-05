import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { WithName } from './models';

@Injectable({ providedIn: 'root' })
export class BiddersService {
  private url = '/api/bidders/';
  private http = inject(HttpClient);

  get() {
    return this.http.get<WithName[]>(this.url);
  }
}
