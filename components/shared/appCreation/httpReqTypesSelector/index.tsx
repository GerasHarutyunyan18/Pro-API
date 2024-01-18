import {
  HttpRequestMethods,
  HttpRequestMethodsOptions,
} from "@/constants/options";
import { useApiContext } from "@/contexts/apiContext";
import { Select } from "antd";

interface ApiTypesSelectorProps {
  id: number;
  current: HttpRequestMethods;
}

export default function ApiTypesSelector({
  id,
  current,
}: ApiTypesSelectorProps) {
  const { changeHttpMethod } = useApiContext();

  return (
    <Select
      style={{ minWidth: 100, width: 100 }}
      placeholder="Method"
      optionFilterProp="children"
      value={current}
      options={HttpRequestMethodsOptions}
      onChange={(value) => changeHttpMethod(id, value)}
      optionRender={(item) => {
        return (
          <span style={{ color: item.data.color }}>
            <b>{item.data.label}</b>
          </span>
        );
      }}
    />
  );
}
