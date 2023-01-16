import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum Gender {
  'Homme',
  'Femme',
  'Non-binaire'
}

export interface Author {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  sex: Gender;
}

export interface Observation {
  id: number;
  name: string;
}

export interface Reporting {
  id: number;
  author: Author;
  observations: Observation[];
  description: string;
  title: string;
}
@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  private reportingUrl = 'api/reporting';
  private observationUrl = 'api/observation'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  reportingIdToModify = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  getReportings(): Observable<Reporting[]> {
    return this.http.get<Reporting[]>(this.reportingUrl)
    .pipe(
      tap(_ => this.log('fetched reportings')),
      catchError(this.handleError<Reporting[]>('getReportings', []))
    );
  }

  getReportingById(id: number): Observable<Reporting> {
    const url = `${this.reportingUrl}/${id}`;
    return this.http.get<Reporting>(url).pipe(
      tap(_ => this.log(`fetched reporting id=${id}`)),
      catchError(this.handleError<Reporting>(`getReporting id=${id}`))
    );
  }

  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(this.observationUrl)
    .pipe(
      catchError(this.handleError<Observation[]>('getObservations', []))
    );
  } 

  updateReporting(reporting: Reporting): Observable<any> {
    return this.http.put(this.reportingUrl, reporting, this.httpOptions).pipe(
      tap(_ => this.log(`updated reporting id=${reporting.id}`)),
      catchError(this.handleError<any>('updateReporting'))
    );
  }

  addReporting(reporting: Reporting): Observable<Reporting> {
    return this.http.post<Reporting>(this.reportingUrl, reporting, this.httpOptions).pipe(
      tap((reporting: Reporting) => this.log(`added reporting with id=${reporting.id}`)),
      catchError(this.handleError<Reporting>('addReporting', reporting))
    );
  }

  private log(message: string) {
    this._snackBar.open(message, 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
}
