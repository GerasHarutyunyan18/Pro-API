import { HttpRequestMethods, ValueTypes } from "./enums";

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

export const getValueTypeColor = (type: ValueTypes) => {
  switch (type) {
    case ValueTypes.ANY:
      return "#fadb14"
    case ValueTypes.NUM:
      return "#f5222d"
    case ValueTypes.STR:
      return "#389e0d"
    case ValueTypes.BOOL:
      return "#531dab"
  }
}
