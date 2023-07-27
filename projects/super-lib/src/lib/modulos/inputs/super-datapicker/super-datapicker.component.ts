import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'super-datapicker',
  templateUrl: './super-datapicker.component.html',
  styleUrls: ['./super-datapicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SuperDatapickerComponent,
      multi: true
    }
  ]
})
export class SuperDatapickerComponent  implements OnInit, ControlValueAccessor {

 
  onTouched: any = () => {};
  public onChange: any = () => {};

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  constructor() { }
	displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
  model!: string;
  public formControl: FormControl = new FormControl();
  ngOnInit() {
    this.formControl.valueChanges.subscribe({
      next:(value) =>{
        
        let string: string = value.year+"-"+value.month+"-"+value.day;
        this.onChange(new Date(string));
      },
      error(err) {
      }
    })
  }

}
