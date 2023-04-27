import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PubSubService } from '../services/pubSubService';

@Component({
  selector: 'error-dialog',
  templateUrl: 'errordialog.component.html',
  styles: [],
})
export class ErrorDialogComponent implements OnInit, OnDestroy {

  errorDurationInSeconds: number = 2 * 1000;
  subscription!: Subscription;
  constructor(public snackBarRef: MatSnackBarRef<any>, @Inject(MAT_SNACK_BAR_DATA) public data: any, private pubsubService: PubSubService, private _snackBar: MatSnackBar) { }

  ngOnInit(): any {
    /** 
     *   This function waits for a message from Notification service, it gets
     *   triggered when we call this from any other component 
     */
    this.subscription = this.pubsubService.message$.subscribe(msg => {
      this.openSnackBar(msg);
    });
  }
  configsuccess: MatSnackBarConfig = { horizontalPosition: 'center', verticalPosition: 'top', duration: this.errorDurationInSeconds }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openSnackBar(errorMessage: string) {
    this._snackBar.openFromComponent(ErrorDialogComponent, {
      data: errorMessage, ...this.configsuccess
    });
  }
}


