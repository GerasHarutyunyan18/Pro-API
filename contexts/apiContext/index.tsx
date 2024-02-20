"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Api, Header, Parameter } from "./type";
import { HttpRequestMethods, ValueTypes } from "@/constants/enums";
import { useNotificationContext } from "../notification";
import { DefaultHeader } from "@/constants/objects";

type ApiContextData = {
  createEmptyApi: () => void;
  removeApi: (id?: string) => void;
  changeEndpoint: (id: string, value: string) => void;
  changeHttpMethod: (id: string, value: HttpRequestMethods) => void;
  addParameter: (id: string, parameter: Parameter) => void;
  deleteParameter: (id: string, name: string) => void;
  changeParamType: (id: string, name: string, type: ValueTypes) => void;
  changeHeaderValue: (id: string, value: Header[]) => void;
  deleteHeaderItem: (id: string, headerId: number) => void;
  addEmptyHeader: (id: string) => void;
  getById: (id: string) => Api | undefined;
  changeApiBody: (id: string, value: string) => void;
  validateApis: () => boolean;
  setApi: (value: Api[]) => void;
  apis: Api[];
};

const ApiContext = createContext<ApiContextData | undefined>(undefined);

export const ApiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apis, setApi] = useState<Api[]>([
    {
      _id: "1",
      method: HttpRequestMethods.GET,
      endpoint: "",
      params: [],
      body: "",
      headers: DefaultHeader,
    },
  ]);
  const { openNotification } = useNotificationContext();

  // creating empty API object in list, working with Add button in createApp page
  const createEmptyApi = () => {
    const lastApi = apis[apis.length - 1];
    const id = lastApi?._id ? lastApi._id + apis.length : "1";
    const newApi: Api = {
      _id: id,
      method: HttpRequestMethods.GET,
      endpoint: "",
      params: [],
      body: "",
      headers: DefaultHeader,
    };
    setApi((prev) => [...prev, newApi]);
  };

  // deleting API from state with given `id`
  const removeApi = (id?: string) => {
    if (!id) {
      return;
    }
    setApi(apis.filter((el) => el._id !== id));
  };

  // changing endpoint value of API with given `id` and `value`
  const changeEndpoint = (id: string | undefined, value: string) => {
    const api = apis.find((el) => el._id === id);
    if (!api) {
      return;
    }
    const pattern = /\${([^}]+)}/g; // Regular expression pattern to match ${text}
    const matches: string[] = [];

    let match;
    while ((match = pattern.exec(value)) !== null) {
      match[0] = match[0].replace("{", "");
      match[0] = match[0].replace("}", "");
      match[0] = match[0].replace("$", "");
      matches.push(match[0]);
    }

    let params = api?.params;
    const paramsName = params?.map((el) => el.name);

    matches.map((el) => {
      if (!paramsName?.includes(el)) {
        params?.push({ name: el, type: ValueTypes.ANY });
      }
    });

    paramsName.map((param) => {
      if (!matches.includes(param)) {
        params = params.filter((el) => el.name !== param);
      }
    });

    setApi(
      apis.map((el) => {
        if (el._id === id) {
          return { ...el, endpoint: value, params };
        }
        return el;
      })
    );
  };

  // changing API http request method with given `id` and `value`
  const changeHttpMethod = (id: string, value: HttpRequestMethods) => {
    setApi(
      apis.map((el) => {
        if (el._id === id) {
          return { ...el, method: value };
        }
        return el;
      })
    );
  };

  // add parameter to API with given `id`
  const addParameter = (id: string, parameter: Parameter) => {
    if (!parameter.name) {
      openNotification("error", "Pls give name to your parameter.");
      return;
    }

    if (!parameter?.type) {
      openNotification("error", "Pls select type for your parameter.");
      return;
    }

    const isExist = apis
      .find((el) => el._id === id)
      ?.params.find((param) => param.name === parameter.name);

    if (isExist) {
      openNotification(
        "error",
        `Parameter with name '${parameter.name}' already exist.`
      );
      return;
    }

    setApi(
      apis.map((el) => {
        if (el._id === id) {
          return {
            ...el,
            endpoint: el.endpoint + `/${"${" + parameter?.name + "}"}`,
            params: [...el.params, parameter],
          };
        }
        return el;
      })
    );
  };

  // delete parametr from API with `name` and `id`
  const deleteParameter = (id: string, name: string) => {
    const valueOnEndpoint = "/${" + name + "}";
    setApi(
      apis.map((el) => {
        if (el._id === id) {
          const endpoint = el.endpoint.includes(valueOnEndpoint)
            ? el.endpoint.replace(valueOnEndpoint, "")
            : el.endpoint;

          return {
            ...el,
            endpoint,
            params: el.params.filter((param) => param.name !== name),
          };
        }
        return el;
      })
    );
  };

  // changing parametr type in list
  const changeParamType = (id: string, name: string, type: ValueTypes) => {
    setApi(
      apis.map((el) => {
        if (el._id === id) {
          return {
            ...el,
            params: el.params.map((el) =>
              el.name === name ? { ...el, type } : el
            ),
          };
        }
        return el;
      })
    );
  };

  // change header
  const changeHeaderValue = (id: string, value: Header[]) => {
    setApi(
      apis.map((el) => {
        if (el._id === id) {
          return { ...el, headers: value };
        }
        return el;
      })
    );
  };

  // delete header with id
  const deleteHeaderItem = (id: string, headerId: number) => {
    setApi(
      apis.map((el) => {
        if (el._id === id) {
          return {
            ...el,
            headers: el.headers.filter((el) => el.id !== headerId),
          };
        }
        return el;
      })
    );
  };

  // add empty header
  const addEmptyHeader = (id: string) => {
    setApi(
      apis.map((el) =>
        el._id === id
          ? {
              ...el,
              headers: [
                ...el.headers,
                {
                  id: el?.headers[el.headers?.length - 1]?.id
                    ? (el?.headers[el?.headers?.length - 1]?.id as any) + 1
                    : 1,
                  key: "Some value",
                  value: "Some value",
                },
              ],
            }
          : el
      )
    );
  };

  // find API with id
  const getById = (id: string) => {
    return apis.find((el) => el._id === id);
  };

  // change api body
  const changeApiBody = (id: string, value: string): void => {
    setApi(apis.map((el) => (el._id === id ? { ...el, body: value } : el)));
  };

  // validating all apis
  const validateApis = (): boolean => {
    let isThereErros = true;

    const res = apis.map((el) => {
      if (!el.endpoint) {
        isThereErros = false;
        return { ...el, error: "Endpoint is missing." };
      }

      if (el.body) {
        try {
          JSON.parse(el.body);
        } catch {
          isThereErros = false;
          return { ...el, error: "Body is not JSON." };
        }
      }

      return { ...el, error: "" };
    });

    setApi(res);
    return isThereErros;
  };

  const contextValue: ApiContextData = {
    createEmptyApi,
    removeApi,
    changeEndpoint,
    changeHttpMethod,
    addParameter,
    getById,
    deleteParameter,
    changeParamType,
    changeHeaderValue,
    deleteHeaderItem,
    addEmptyHeader,
    changeApiBody,
    validateApis,
    setApi,
    apis,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within a ApiContextProvider");
  }
  return context;
};
