import { HttpRequestMethods, ValueTypes } from "@/constants/enums";

export interface Api {
  _id: string;
  method: HttpRequestMethods;
  appId?: string;
  description?: string;
  endpoint: string;
  params: Parameter[];
  body: string;
  headers: Header[];
  error?: string;
}

export type Parameter = {
  name: string;
  type?: ValueTypes;
  description?: string;
};

export type Header = {
  id?: number;
  key: string;
  value: string;
};
