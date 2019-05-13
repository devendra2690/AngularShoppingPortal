
export interface OrderCart {

    id: number;
    quantity: number;
    totalPrice: number;
    title: string;
    category: string;
    imageUrl: string;
}


export class OrderProduct implements OrderCart{

    id: number;
    quantity: number;
    totalPrice: number;
    title: string;
    category: string;
    imageUrl: string;
}
