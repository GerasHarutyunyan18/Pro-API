"use client";
import { useApiContext } from "@/contexts/apiContext";
import styles from "./apiCheckerItem.module.scss";
import { getMethodColor } from "@/constants/functions";
import { Collapse, Tabs } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ApiMethod from "@/components/primitives/apiMethod";

interface ApiCheckerItemProps {
  id: string;
}

export default function ApiCheckerItem({ id }: ApiCheckerItemProps) {
  const { getById } = useApiContext();
  const api = getById(id);

  return (
    <Collapse
      expandIconPosition="end"
      expandIcon={() => <PlusCircleOutlined />}
      items={[
        {
          key: "1",
          label: (
            <div>
              <ApiMethod method={api?.method} size="lg"/>
              <span className={styles.endpoint}>{api?.endpoint}</span>
            </div>
          ),
          children: (
            <div>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: "Params",
                    key: "1",
                    children: <></>,
                  },
                  {
                    label: "Body",
                    key: "2",
                    children: <></>,
                  },
                  {
                    label: "Headers",
                    key: "3",
                    children: <></>,
                  },
                ]}
              />
            </div>
          ),
        },
      ]}
    />
  );
}
