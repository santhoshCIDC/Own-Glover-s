import { REGEX } from "./constants";

export default class Utility {
  static validateEmail = (email: string) => {
    return String(email).toLowerCase().match(REGEX.EMAIL);
  };
  static validatePassword = (password: string) => {
    return String(password).toLowerCase().match(REGEX.PASSWORD);
  };
}
