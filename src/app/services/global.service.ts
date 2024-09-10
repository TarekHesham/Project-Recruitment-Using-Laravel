import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  autoComplete(query: string, type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/autocomplete?query=${query}&searchtype=${type}`, this.getAuthHeaders());
  }

  addComment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, data, this.getAuthHeaders());
  }
  
  search(filters: { [key: string]: any }): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      headers: this.getAuthHeaders()?.headers,
      params: filters
    });
  }

  locations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/locations`, this.getAuthHeaders());
  }

  skills(): Observable<any> {
    return this.http.get(`${this.baseUrl}/skills`, this.getAuthHeaders());
  }

  categories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, this.getAuthHeaders());
  }

  private getAuthHeaders(): { headers: HttpHeaders } | undefined {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Missing token...');
    }
    return token ? { headers: new HttpHeaders({ 'Authorization': token }) } : undefined;
  }
}
