import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import * as _ from  'lodash';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

pageTitle: string = 'Customers';
headerIcon: string = 'fas fa-users'; 
customers: Customer[];
customersOrigin: Customer[];
phone: string = '';

  constructor(
    private titeService: Title,
    private customersService: CustomersService
    ) { }

  ngOnInit():void {
    this.titeService.setTitle('Company CRM | Customers');
    this.customersService.getCustomers().subscribe(customers => this.customers = this.customersOrigin = customers);
  }

  showTools(event: any): void {

    event.target.children[0].children[0].style.cssText = 'visibility: visible !important';
   }

   hideTools(event: any): void {
    event.target.children[0].children[0].style.cssText = 'visibility: hidden !important';
   }

   onClickDeleteCustomer(customerId: string, event: any, firstName: string): void {
     event.preventDefault();
     if (confirm(`Aru you sure you want to delete ${firstName}?`)) { // ${firstName} THIS MAY EBE PROBLEMATIC
       this.customersService.deleteCustomer(customerId);
     }

   }

   onKeyupPhoneSearch(): void {

    let phone = this.phone.trim();

    this.customers =(phone.length > 0)
    ? this.customersOrigin.filter(customer => _.includes(customer.phone, phone))
    : this.customersOrigin;      
   }

}