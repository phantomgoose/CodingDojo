export class Product {
    private _title: string;
    private _price: number;
    private _image_url: string;

    constructor(title: string, price: any, image_url: string) {
        this._title = title;
        this._price = parseFloat(price);
        this._image_url = image_url;
    }

    get title() {
        return this._title;
    }

    get price() {
        return this._price;
    }

    get image_url() {
        return this._image_url;
    }

    set title(new_title: string) {
        this._title = new_title;
    }

    set price(new_price: any) {
        this._price = parseFloat(new_price);
    }

    set image_url(new_image_url: string) {
        this._image_url = new_image_url;
    }
}