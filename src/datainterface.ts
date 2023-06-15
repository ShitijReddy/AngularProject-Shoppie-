export interface product {
    prodName: string,
    prodDesc: string,
    image: string,
    sideImg: string,
    price: number,
    quant: number,
    category: string,
    custName: string,
    vendorName: string,
    tags: Array<string>
}

export interface user {
    id:string,
    username: string,
    password: string,
    role: string
}

export interface Review {
    id: number;
    productId: string;
    userId: string;
    rating: number;
    content: string;
    createdAt: Date;
  }
  