export const REGEX = {
  NAME: /^[a-zA-Z]*$/,
  PASSWORD: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const COLOR = {
  BUTTON_COLOR: "#005DAB",
  WHITE_COLOR: "#FFFFFF",
  APP_COLOR: "#253EC8",
  BLACK_COLOR: "#000000",
  GREY_COLOR: "#808080",
  WHITE_SMOKE: "#BFBFBF",
};

export const FONT_SIZE = {
  BIG: 32,
  XXXL: 28,
  XXL: 24,
  XL: 22,
  L: 20,
  M: 18,
  REGULAR: 16,
  S: 14,
  XS: 12,
  TINY: 10,
};
