import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from '../../services/customers.service'; 
import { ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

   customer: Customer = {
     firstName: '',
     lastName: '',
     email: '',
     phone: '',
     address: '',
     notes: ''
   };
   pageTitle: string = 'Customer Details';
   headerIcon: string = 'fas fa-users';
   
  constructor(
    private customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Company CRM | Customer Details');
    const id = this.activatedRoute.snapshot.params['id'];
    this.customersService.getCustomer(id).subscribe(customer => this.customer = customer);
  }

}
