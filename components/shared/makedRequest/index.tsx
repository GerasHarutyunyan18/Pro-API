import { Space, Table, TableProps, Tag } from "antd";
import styles from "./makedRequest.module.scss";
import { useEffect, useState } from "react";
import { Key, RowSelectMethod } from "antd/es/table/interface";

interface MakedRequestProps {
  data: any;
  onRowClick: (index: number) => void;
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

export default function MakedRequest({ data, onRowClick }: MakedRequestProps) {
  const [prettyData, setPrettyData] = useState<DataType[]>();

  useEffect(() => {
    setPrettyData(
      data.map((el: any) => {
        return { time: el.createdAt, status: el.status };
      })
    );
  }, [data]);

  return (
    <Table
      columns={columns}
      dataSource={prettyData}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (!rowIndex) {
              return;
            }
            onRowClick(rowIndex);
          },
        };
      }}
    />
  );
}
