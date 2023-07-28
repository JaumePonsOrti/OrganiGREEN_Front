import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class SuperDatapickerComponent  implements OnInit, OnChanges, ControlValueAccessor {
  @Input () buttonClass: string | undefined = "btn-danger";
  @Input () placeholder: string | undefined  = "yyyy-mm-dd";
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
        
        let string: string = value.year+"-"+value.month+"-"+value.day+" 00:00:00:UTC";
        this.onChange(string);
      },
      error(err) {
      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if(typeof changes["buttonClass"].currentValue ===  "undefined"){
      this.buttonClass = changes["buttonClass"].previousValue;
    }
  }

}
