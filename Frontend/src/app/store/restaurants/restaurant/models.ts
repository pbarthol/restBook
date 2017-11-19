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

  constructor(name: string) {
    this.name = name;
  }
  // greet() {
  //   return "Hello, " + this.greeting;
  // }
}
