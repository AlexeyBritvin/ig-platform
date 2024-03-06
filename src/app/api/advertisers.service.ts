import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Advertiser } from './models';

@Injectable({ providedIn: 'root' })
export class AdvertiserService {
  private url = '/api/advertisers/';
  private http = inject(HttpClient);

  get() {
    return this.http.get<Advertiser[]>(this.url);
  }
}
