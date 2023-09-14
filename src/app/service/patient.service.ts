import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientModel } from '../model/patient-model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  getPatients(): Observable<PatientModel[]> {
    return this.httpClient
      .get<PatientModel[]>('http://localhost:8080/api/v1/patients' + '/list')
      .pipe(map((res) => res));
  }

  savePatient(request: any): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/v1/patients' + '/save', request)
      .pipe(map((res) => res));
  }

  updatePatient(request: any): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/v1/patients' + '/update', request)
      .pipe(map((res) => res));
  }

  deletePatient(id: number): Observable<any> {
    return this.httpClient
      .delete<any>('http://localhost:8080/api/v1/patients/delete/' + id)
      .pipe(map((res) => res));
  }
}
