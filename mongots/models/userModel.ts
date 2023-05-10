import { ObjectId } from "mongodb";
export class User {
  _id?: ObjectId;
  email: string;
  password: string;
  phoneno: number;
  constructor(email: string, password: string, phoneno: number) {
    this.email = email;
    this.password = password;
    this.phoneno = phoneno;
  }
}