import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef } from "antd";
import { Form, Input, Table } from "antd";
import { ButtonTypes } from "@/constants/enums";
import Button from "@/components/primitives/button";
import { DeleteOutlined } from "@ant-design/icons";
import { useApiContext } from "@/contexts/apiContext";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: number;
  key: string;
  value: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface HeaderTabProps {
  id: number;
}

export default function HeaderTab({ id }: HeaderTabProps) {
  const { getById, changeHeaderValue, deleteHeaderItem, addEmptyHeader } =
    useApiContext();
  const api = getById(id);

  const handleDelete = (headerId: number) => {
    deleteHeaderItem(id, headerId);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Key",
      dataIndex: "key",
      width: "30%",
      editable: true,
    },
    {
      title: "Value",
      dataIndex: "value",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Button
          onClick={() => handleDelete(record.id)}
          type={ButtonTypes.DANGER}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const handleAdd = () => {
    addEmptyHeader(id);
  };

  const handleSave = (row: DataType) => {
    const newData = [...(api?.headers as any)];
    console.log("row -----let ---", row);
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    changeHeaderValue(id, newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={api?.headers}
        columns={columns as ColumnTypes}
      />
      <Button onClick={handleAdd} type={ButtonTypes.PRIMARY}>
        Add a row
      </Button>
    </div>
  );
}
