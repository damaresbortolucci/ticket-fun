import Product from "./Product";

export default class Cart {
    product: Product[];
    quantity: number;
    valueTotal: number;
  
  
    constructor(product: Product[], quantity: number, valueTotal: number) {
      this.product = product;
      this.quantity = quantity;
      this.valueTotal = valueTotal;
    }
}