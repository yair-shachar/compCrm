/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Title} from '@angular/platform-browser';
import { Customer } from '../../models/customer';
import { CustomersService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { FlashMessagesService }  from 'angular2-flash-messages'; // This may coase a problem via fms:
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  
    pageTitle: string = '';
    headerIcon: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    adderss: string = '';
    notes: string = '';

@ViewChild('search') public searchElement: ElementRef;

constructor(
    private titleService: Title,
    private customersService: CustomersService,
    private router: Router,
    private fms: FlashMessagesService, // This may coase a problem via fms:
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
   ) { }

  ngOnInit(): void {
    document.title = ' Company CRM | Add Customer Form';
    this.pageTitle = 'Add Customer Form';
    this.headerIcon = 'fas fa-plus-circle';
    
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );

    this.titleService.setTitle('Company CRM | Add Customer from');
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }): void {

    if (valid) {
      this.customersService.addCustomer(value);
      this.router.navigate(['/customers']);
    }
  }

}
