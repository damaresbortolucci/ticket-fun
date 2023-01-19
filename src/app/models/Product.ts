export default class Product {
  image: string='';
  title: string='';
  description: string='';
  price: number = 0;
  quantity: number=1;
  stock: number=0
  _id: string='';


  constructor(image: string, title: string, descr: string, price: number, quantity: number=1, stock: number, id: string) {
    this.image = image;
    this.title = title;
    this.description = descr;
    this.price = price;
    this.quantity = quantity;
    this.stock = stock;
    this._id = id;
  }
}