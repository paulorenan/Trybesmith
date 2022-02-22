export interface Product {
  'name': string;
  'amount': string;
}

export interface ProductId extends Product {
  'id': number;
}