import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';

@Component({
  selector: 'app-sumary-details',
  templateUrl: './sumary-details.component.html',
  styleUrls: ['./sumary-details.component.css']
})
export class SumaryDetailsComponent implements OnInit{



  @Input() products?: Product[];
  @Input() subTotal?:any;
  tax: number = 5.99;
  cartEmpty: boolean = true


  ngOnInit(): void {
    console.log(this.products);
    
  }
}
