import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  Reporting,
  Observation,
  ReportingService,
} from '../services/reporting-service/reporting.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  reportings: Reporting[] = [];
  selectedTab: number = 0;
  reportingsFiltered: Reporting[] = [];
  observationList: Observation[] = [];
  filterList: string[] = [];

  constructor(private reportingService: ReportingService) {}

  async ngOnInit() {
    this.reportingService.getReportings().subscribe((reportings) => {
      this.reportings = reportings;
      this.reportingsFiltered = reportings;
    });
    this.reportingService.getObservations().subscribe((observations) => {
      this.observationList = observations;
    });
  }

  modifySelectedReporting(id: number) {
    this.selectedTab = 0;
    this.reportingService.reportingIdToModify.next(id);
  }

  updateFilterList(observation: Observation) {
    if (this.filterList.includes(observation.name)) {
      this.filterList = this.filterList.filter((filter) => {
        return filter !== observation.name;
      });
    } else {
      this.filterList.push(observation.name);
    }
  }

  filterReportings() {
    this.reportingsFiltered = this.reportings;
    if(this.filterList.length !== 0){
      this.reportingsFiltered = this.reportingsFiltered.filter((reporting) => {
        let shouldBeDisplayed = false;
        this.filterList.forEach((filter) => {
          reporting.observations.forEach((observation) => {
            if (observation.name === filter) {
              shouldBeDisplayed = true;
            }
          });
        });
        return shouldBeDisplayed;
      });
    }
  }

  refreshList(currentTab: MatTabChangeEvent) {
    if (currentTab.index === 1) {
      this.reportingService.getReportings().subscribe((reportings) => {
        this.reportings = reportings;
        this.reportingsFiltered = reportings;
      });
    }
  }
}
