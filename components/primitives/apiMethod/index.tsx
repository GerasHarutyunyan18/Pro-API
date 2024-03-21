import { HttpRequestMethods } from "@/constants/enums";
import { getMethodColor } from "@/constants/functions";

interface ApiMethodProps {
  method?: HttpRequestMethods;
  size: "lg" | "sm";
}

export default function ApiMethod({ method, size }: ApiMethodProps) {
  return size === "sm" ? (
    <b
      style={{
        background: getMethodColor(method),
        color: "white",
        borderRadius: 5,
        marginRight: 5,
        padding: "0px 5px",
      }}
    >
      {method}
    </b>
  ) : (
    <span
      style={{
        background: getMethodColor(method),
        padding: "4px 8px",
        borderRadius: 5,
        color: "white",
      }}
    >
      {method}
    </span>
  );
}
