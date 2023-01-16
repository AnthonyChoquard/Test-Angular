import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import {
  Gender,
  Observation,
  Reporting,
  ReportingService,
} from '../services/reporting-service/reporting.service';
import { SimulatedDataService } from '../services/simulated-data-service/simulated-data.service';

@Component({
  selector: 'app-reporting-form',
  templateUrl: './reporting-form.component.html',
  styleUrls: ['./reporting-form.component.scss'],
})
export class ReportingFormComponent implements OnInit {
  reportingForm: FormGroup;
  genderList: string[];
  observationList: Observation[] = [];
  minDateLimit: moment.Moment = moment().subtract(100, 'years');
  maxDateLimit: moment.Moment = moment();
  currentReportingList: Reporting[] = [];
  emailUnavailableError: string = 'This email already exist';
  isUpdatingCase: boolean = false;
  reportingUnderModification: Reporting = {} as Reporting;

  constructor(
    private reportingService: ReportingService,
    private simulatedDataService: SimulatedDataService,
    private _snackBar: MatSnackBar
  ) {
    this.genderList = ['Homme', 'Femme', 'Non-binaire'];
    this.reportingForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.required]),
      observations: new FormControl('', [Validators.required]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
    this.reportingService.reportingIdToModify.subscribe((idToModify) => {
      if (idToModify !== 0) {
        this.editReporting(idToModify);
      }
    });
  }

  editReporting(id: number) {
    this.reportingService
      .getReportingById(id)
      .subscribe((reportingToModify) => {
        this.reportingUnderModification = reportingToModify;
        this.reportingForm.patchValue({
          firstName: reportingToModify.author.firstName,
          lastName: reportingToModify.author.lastName,
          birthDate: moment(reportingToModify.author.birthDate),
          gender: reportingToModify.author.sex,
          email: reportingToModify.author.email,
          description: reportingToModify.description,
          observations: reportingToModify.observations,
          title: reportingToModify.title,
        });
      });
    this.isUpdatingCase = true;
  }

  compareWith(observation1: any, observation2: any): boolean {
    return observation1 && observation2 && observation1.id === observation2.id;
  }

  async ngOnInit() {
    this.reportingService.getObservations().subscribe((observations) => {
      this.observationList = observations;
    });
  }

  checkEmailAvailability(email: string): boolean {
    let emailAvailable: boolean = true;
    this.currentReportingList.forEach((reporting) => {
      if (email === reporting.author.email) {
        emailAvailable = false;
      }
    });
    return emailAvailable;
  }

  sendReporting() {
    this.reportingForm.markAllAsTouched();
    if (this.reportingForm.valid) {
      this.reportingService.getReportings().subscribe((reportings) => {
        this.currentReportingList = reportings;
        if (this.checkEmailAvailability(this.reportingForm.value.email)) {
          let newReporting: Reporting = {
            id: this.simulatedDataService.genId(this.currentReportingList),
            author: {
              birthDate: (
                this.reportingForm.value.birthDate as moment.Moment
              ).format('MM/DD/YYYY'),
              email: this.reportingForm.value.email,
              firstName: this.reportingForm.value.firstName,
              lastName: this.reportingForm.value.lastName,
              sex: this.reportingForm.value.gender,
            },
            description: this.reportingForm.value.description,
            title: this.reportingForm.value.title,
            observations: this.reportingForm.value.observations,
          };
          this.reportingService
            .addReporting(newReporting as Reporting)
            .subscribe((reporting) => {
            });
          this.reportingForm.reset();
        } else {
          this._snackBar.open(this.emailUnavailableError, 'ok', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      });
    }
  }

  saveChange() {
    this.reportingForm.markAllAsTouched();
    if (this.reportingForm.valid) {
      let updatedReporting: Reporting = {
        id: this.reportingUnderModification.id,
        author: {
          birthDate: (
            this.reportingForm.value.birthDate as moment.Moment
          ).format('MM/DD/YYYY'),
          email: this.reportingForm.value.email,
          firstName: this.reportingForm.value.firstName,
          lastName: this.reportingForm.value.lastName,
          sex: this.reportingForm.value.gender,
        },
        description: this.reportingForm.value.description,
        title: this.reportingForm.value.title,
        observations: this.reportingForm.value.observations,
      };
      this.reportingService
        .updateReporting(updatedReporting as Reporting)
        .subscribe((reporting) => {
        });
      this.isUpdatingCase = false;
      this.reportingForm.reset();
    }
  }
}
