import { HttpRequestMethods } from "./enums";

export const getMethodColor = (method?: HttpRequestMethods) => {
  switch (method) {
    case HttpRequestMethods.GET:
      return "#237804";
    case HttpRequestMethods.POST:
      return "#fadb14";
    case HttpRequestMethods.PUT:
      return "#003eb3";
    case HttpRequestMethods.DELETE:
      return "#a8071a";
  }
};
