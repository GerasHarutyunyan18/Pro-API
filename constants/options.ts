import { HttpRequestMethods, ValueTypes } from "./enums";

export const AppTypesOptions = [
    {
        value: "web",
        label: "Web Application",
    },
    {
        value: "mobile",
        label: "Mobile Application",
    },
    {
        value: "other",
        label: "Other",
    },
]

export const AppIndustries = [
    {
        value: "e-commerce",
        label: "E-commerce",
    },
    {
        value: "finance",
        label: "Finance",
    },
    {
        value: "healthcare",
        label: "Healthcare",
    },
    {
        value: "education",
        label: "Education",
    },
    {
        value: "media-and-entertainment",
        label: "Media and Entertainment",
    },
    {
        value: "telecommunications",
        label: "Telecommunications",
    },
    {
        value: "travel-and-hospitality",
        label: "Travel and Hospitality",
    },
    {
        value: "automotive",
        label: "Automotive",
    },
    {
        value: "real-estate",
        label: "Real Estate",
    },
    {
        value: "manufacturing",
        label: "Manufacturing",
    },
    {
        value: "energy",
        label: "Energy",
    },
    {
        value: "information-technology",
        label: "Information Technology",
    },
    {
        value: "government",
        label: "Government",
    },
    {
        value: "agriculture",
        label: "Agriculture",
    },
    {
        value: "retail",
        label: "Retail",
    },
    {
        value: "logistics-and-transportation",
        label: "Logistics and Transportation",
    },
    {
        value: "gaming",
        label: "Gaming",
    },
    {
        value: "sports",
        label: "Sports",
    },
    {
        value: "food-and-beverage",
        label: "Food and Beverage",
    },
    {
        value: "insurance",
        label: "Insurance",
    },
    {
        value: "other",
        label: "Other",
    },
];



export const ParamTypeOptions = [
    {
        value: ValueTypes.NUM,
        label: 'Number',
    },
    {
        value: ValueTypes.STR,
        label: 'String',
    },
    {
        value: ValueTypes.BOOL,
        label: 'Boolean',
    },
    {
        value: ValueTypes.ANY,
        label: 'Any',
    },
]

export const HttpRequestMethodsOptions = [
    {
        value: HttpRequestMethods.GET,
        label: "GET",
        color: '#237804'
    },
    {
        value: HttpRequestMethods.POST,
        label: "POST",
        color: '#fadb14'
    },
    {
        value: HttpRequestMethods.PUT,
        label: "PUT",
        color: '#003eb3'
    },
    {
        value: HttpRequestMethods.DELETE,
        label: "DELETE",
        color: '#a8071a'
    },
    // todo research
    // {
    //     value: HttpRequestMethods.PATCH,
    //     label: "PATCH",
    //     color: '#531dab'
    // },
    // {
    //     value: HttpRequestMethods.HEAD,
    //     label: "HEAD",
    //     color: '#73d13d'
    // },
    // {
    //     value: HttpRequestMethods.OPTIONS,
    //     label: "OPTIONS",
    //     color: '#780650'
    // },
];
