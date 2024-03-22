import { Space, Table, TableProps, Tag } from "antd";
import styles from "./makedRequest.module.scss";
import { useEffect, useState } from "react";

interface MakedRequestProps {
  data: any;
  onChange: (index: number) => void;
}
interface DataType {
  time: string;
  status: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "tags",
    render: (_, { status }) => {
      return <Tag color={status === 200 ? "green" : "red"}>{status}</Tag>;
    },
  },
];

export default function MakedRequest({ data, onChange }: MakedRequestProps) {
  const [prettyData, setPrettyData] = useState<DataType[]>();

  useEffect(() => {
    setPrettyData(
      data.map((el: any) => {
        return { time: el.createdAt, status: el.status };
      })
    );
  }, [data]);

  // const rowConfig = {
  //   onChange: (record: DataType, index: number) => {
  //     onChange2(index);
  //   },
  // };

  return <Table columns={columns} dataSource={prettyData} />;
}
