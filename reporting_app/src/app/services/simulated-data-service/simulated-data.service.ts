import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Gender, Reporting, Observation } from '../reporting-service/reporting.service';

@Injectable({
  providedIn: 'root',
})
export class SimulatedDataService implements InMemoryDbService {
  createDb() {
    const reportings: Reporting[] = []
    const observations = [
      {
        id: 1,
        name: 'Bug'
      },
      {
        id: 2,
        name: 'Authorization'
      },
      {
        id: 3,
        name: 'Request'
      },
      {
        id: 4,
        name: 'Low priority'
      },
      {
        id: 5,
        name: 'Medium priority'
      },
      {
        id: 6,
        name: 'High priority'
      },
      {
        id: 7,
        name: 'Urgent'
      },
      {
        id: 8,
        name: 'Software'
      }
    ];
    return { reporting: reportings, observation: observations };
  }

  genId(reportings: Reporting[]): number {
    return reportings.length > 0
      ? Math.max(...reportings.map((reporting) => reporting.id)) + 1
      : 1;
  }
}
