import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportingFormComponent } from './reporting-form/reporting-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { SimulatedDataService } from './services/simulated-data-service/simulated-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AppComponent,
    ReportingFormComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    AppRoutingModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      SimulatedDataService, { dataEncapsulation: false,
        passThruUnknownUrl: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
