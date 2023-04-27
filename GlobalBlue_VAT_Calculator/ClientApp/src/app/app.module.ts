import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { VatcalculatorComponent } from './vatcalculator/vatcalculator.component';
import { MaterialModule } from '././module/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { PubSubService } from './services/pubSubService';
import { ErrorDialogComponent } from './errordialog/errordialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    VatcalculatorComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: VatcalculatorComponent },
      { path: 'vatcalculator', component: VatcalculatorComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [MatSnackBar, PubSubService,
    {
      provide: MatSnackBarRef,
      useValue: {}
    },
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
