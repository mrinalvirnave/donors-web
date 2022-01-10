import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donor } from 'src/app/models/donor.model';

const baseUrl = 'http://localhost:5000/api/donors';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Donor[]> {
    return this.http.get<Donor[]>(baseUrl);
  }

  get(id: any): Observable<Donor> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByEmail(email: any): Observable<Donor[]> {
    return this.http.get<Donor[]>(`${baseUrl}?email=${email}`);
  }
}
