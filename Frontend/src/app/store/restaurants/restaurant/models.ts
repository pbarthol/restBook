/**
 * Created by Peter on 11.11.2017.
 */
export class Restaurant {
  _id: string;
  name: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  village: string;
  phoneNumber: string;
  webpage: string;
  foodType: string;
  teaserTitle: string;
  teaserDescription: string;
  createddate:  Date;
  userId: string;
  thumbnail: string;
  teaserImage: string;
}

export class RestaurantImage {
  _id: string;
  restaurantId: string;
  image: string;
  thumbnail: string;
  teaserImage: string;
  sortorder: number;
}
