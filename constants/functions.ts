import { Header, Parameter } from "@/contexts/apiContext/type";
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

export const createApiFetch = (method: HttpRequestMethods, endpoint: string, body: string, headers: Header[], params: Parameter[]) => {
  const headersObject: { [key: string]: string } = {};
  headers.forEach(header => {
    headersObject[header.key] = header.value;
  });

  let url = endpoint;
  if (params.length > 0) {
    const queryString = params.map(param => `${encodeURIComponent(param.name)}=${encodeURIComponent(param.type || '')}`).join('&');
    url += `?${queryString}`;
  }

  const options: RequestInit = {
    method,
    headers: headersObject,
    body: body,
  };

  return {
    url: url,
    options: options
  };
} 