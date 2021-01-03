/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomersService } from '../../services/customers.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FlashMessagesService }  from 'angular2-flash-messages'; 
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  pageTitle: string = 'Customer Edit Form';
  headerIcon: string = 'fas fa-user';
  address: string = '';
  notes: string = '';

  @ViewChild('search') public searchElement: ElementRef;


  customer: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  };


  constructor(
    private customersService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private fms: FlashMessagesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    document.title = 'Company CRM | Edit Cusomer Form';
    this.titleService.setTitle('Company CRM | Edit Form');
    this.headerIcon = 'fas fa-pen';
    
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
  
    this.customer.id = this.activatedRoute.snapshot.params['id'];
    this.customersService.getCustomer(this.customer.id).subscribe(customer => this.customer = customer);
  }

  onSubmit({ value, valid} : { value: Customer, valid: boolean }) {
    
    if (valid){
      this.fms.show('Customer updated', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-weite text-center',
        timeout: 3000
    });
      value.id = this.customer.id;
      this.customersService.updateCustomer(value);
      this.router.navigate(['/customers']);
      }

    }
}