import { Input as AntdInput } from "antd";

interface Input {
  placeholder?: string;
}

export default function Input({ placeholder }: Input) {
  return <AntdInput placeholder={placeholder} />;
}
