import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FlightsService } from './flights.service';
import { GenericValidator } from '../shared/generic-validator';
import { debounceTime } from 'rxjs/operators';
import { merge as observableMerge, fromEvent as observableFromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: QueryList<ElementRef[]>;

  message: string;
  info: any = {};
  flights: any = {};
  flightForm: FormGroup;
  isResult = false;
  isEmpty = false;

  // Validation options.
  genericValidator: GenericValidator;
  displayMessage: { [key: string]: string } = {};
  changeEventEnable = true;

  private translateSubscription: Subscription = null;
  private validatorSubscription: Subscription = null;
  private fieldSubscription: Subscription = null;

  public badgeList: Array<{ text: string; value: string }> = [
    { text: this.translate.instant('American Dollar'), value: 'USD' },
    { text: this.translate.instant('Colombian Peso'), value: 'COP' },
    { text: this.translate.instant('Mexican Peso'), value: 'MXN' }
  ];

  constructor(private fb: FormBuilder,
    private flightsService: FlightsService,
    private translate: TranslateService) {
    this.genericValidator = new GenericValidator(translate.instant('Fligts_ValMgs'));
  }

  ngOnInit() {
    this.flightForm = this.fb.group({
      origin: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[A-Z]*$')]],
      destination: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[A-Z]*$')]],
      badge: ['']
    });
    this.onDataRetrieved();
    this.isResult = false;
    this.isEmpty = false;
  }

  get flightFormControl() {
    return this.flightForm.controls;
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    this.fieldSubscription = this.formInputElements.changes.subscribe((c: any) => {
      const controlBlurs: Observable<any>[] = c.toArray().map((formControl: ElementRef) => observableFromEvent(formControl.nativeElement, 'blur'));
      // Merge the blur event observable with the valueChanges observable
      if (this.validatorSubscription) {
        this.validatorSubscription.unsubscribe();
      }
      this.validatorSubscription = observableMerge(this.flightForm.valueChanges, ...controlBlurs).pipe(debounceTime(250)).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.flightForm);
      });
    });

    this.translateSubscription = this.translate.onLangChange.subscribe(() => {
      this.genericValidator.setValidationMessages(this.translate.instant('Fligts_ValMgs'));
    });
  }

  ngOnDestroy(): void {
    if (this.fieldSubscription) {
      this.fieldSubscription.unsubscribe();
    }
    if (this.validatorSubscription) {
      this.validatorSubscription.unsubscribe();
    }
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  onDataRetrieved() {
    this.flightForm.patchValue({
      origin: '',
      destination: '',
      badge: 'USD'
    });
  }

  canSearch() {
    return this.flightForm.valid;
    //return true;
  }

  search() {
    if (this.flightForm.valid) {
      const data = this.loadSearch();
      this.message = this.translate.instant('No flights found for origin and destination', { blOrigin: data.origin, blDestination: data.destination });
      this.flightsService.getFly(data.origin, data.destination, data.badge).toPromise().then((result: any) => {
        this.flights = result[0]?.Flights;
        this.info = result[0];
        if (this.info) {
          this.isResult = true;
          this.isEmpty = false;
        } else {
          this.isResult = false;
          this.isEmpty = true;
        }
      });
    }
  }

  loadSearch() {
    let data = {
      origin: '',
      destination: '',
      badge: ''
    };
    const fv = this.flightForm.value;
    Object.assign(data, {
      origin: fv.origin.trim(),
      destination: fv.destination.trim(),
      badge: fv.badge.trim()
    });
    return data;
  }

}
