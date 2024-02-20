import Button from "@/components/primitives/button";
import { ButtonTypes, ValueTypes } from "@/constants/enums";
import { ParamTypeOptions } from "@/constants/options";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { useApiContext } from "@/contexts/apiContext";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

import styles from "./paramTab.module.scss";

interface ParamTabProps {
  id: string;
  view?: boolean;
}

export default function ParamTab({ id, view }: ParamTabProps) {
  const { addParameter, getById, deleteParameter, changeParamType } =
    useApiContext();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<ValueTypes>();
  const [description, setDescription] = useState<string>("");

  const api = getById(id);

  return (
    <div className={styles.container}>
      {!view && (
        <div className={styles.leftPart}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(el) => setName(el.target.value)}
          />
          <Select
            placeholder="Type"
            optionFilterProp="children"
            options={ParamTypeOptions}
            value={type}
            onChange={(value) => setType(value)}
          />
          <TextArea
            onChange={(el) => setDescription(el.target.value)}
            value={description}
            placeholder="Description"
          ></TextArea>
          <Button
            type={ButtonTypes.WARNING}
            onClick={() => addParameter(id, { name, type, description })}
          >
            Add Parameter <PlusOutlined />
          </Button>
        </div>
      )}
      <div className={styles.rightPart}>
        {api?.params.map((el, index) => {
          return (
            <div key={index} className={styles.parametr}>
              <div className={styles.item}>
                <span>{el.name}</span> |{" "}
                <span>
                  <Select
                    placeholder="Type"
                    optionFilterProp="children"
                    options={ParamTypeOptions}
                    value={el.type}
                    disabled={view}
                    onChange={(value) => changeParamType(id, el.name, value)}
                  />
                </span>
              </div>
              {!view && (
                <Button
                  onClick={() => {
                    deleteParameter(id, el.name);
                  }}
                  className={styles.deleteBtn}
                  type={ButtonTypes.DANGER}
                >
                  <DeleteOutlined />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
