import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InterestGroup, InterestGroupCreate } from './models';

@Injectable({ providedIn: 'root' })
export class InterestGroupService {
  private url = '/api/interest_groups/';
  private http = inject(HttpClient);

  get(): Observable<InterestGroup[]> {
    return this.http.get<InterestGroup[]>(this.url);
  }

  create(entity: InterestGroupCreate): Observable<InterestGroup> {
    return this.http.post<InterestGroup>(this.url, entity);
  }

  edit(entity: InterestGroup): Observable<InterestGroup> {
    return this.http.post<InterestGroup>(this.url, entity);
  }
}
