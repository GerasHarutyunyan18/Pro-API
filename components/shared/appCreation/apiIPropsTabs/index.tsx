import { Tabs } from "antd";
import ParamTab from "../paramTab";
import BodyTab from "../bodyTab";
import HeaderTab from "../headerTab";

interface ApiIPropsTabsProps {
  id: number;
}

export default function ApiIPropsTabs({ id }: ApiIPropsTabsProps) {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: "Params",
          key: "1",
          children: <ParamTab id={id} />,
        },
        {
          label: "Body",
          key: "2",
          children: <BodyTab />,
        },
        {
          label: "Headers",
          key: "3",
          children: <HeaderTab id={id} />,
        },
      ]}
    />
  );
}
