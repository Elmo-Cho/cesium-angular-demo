import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SystemDictItemService {
  refreshCache(): Observable<any> {
    return this.http.get('/api/sys/dict/refleshCache');
  }
  // eslint-disable-next-line prettier/prettier
  constructor(private http: _HttpClient) { }


  deleteDictItem(id: string): Observable<any> {
    return this.http.delete('/api/sys/dictItem/delete', { id });
  }
}
