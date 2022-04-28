

export class Image{
    constructor(image:string,caption:string,categories:string [],location:string){
        this.caption = caption;
        this.categories = categories;
        this.location = location;  
        this.image = image;
    }
    caption:string;
    categories:string [] = [];
    location:string;
    image:string;
}