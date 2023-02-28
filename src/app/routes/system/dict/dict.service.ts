import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SystemDictService {
  refreshCache(): Observable<any> {
    return this.http.get('/api/sys/dict/refleshCache');
  }
  // eslint-disable-next-line prettier/prettier
  constructor(private http: _HttpClient) { }

  public getDictList(): Observable<any> {
    return this.http.get('/api/sys/dict/list', {});
  }

  deleteDict(id: string): Observable<any> {
    return this.http.delete('/api/sys/dict/delete', { id });
  }
}
