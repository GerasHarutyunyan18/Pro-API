"use client";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Card, Input } from "antd";
import ApiIPropsTabs from "../apiIPropsTabs";
import ApiTypesSelector from "../httpReqTypesSelector";
import { useApiContext } from "@/contexts/apiContext";

import styles from "./apiCreations.module.scss";
import { useEffect } from "react";

export default function APICreations() {
  const { createEmptyApi, apis, removeApi, changeEndpoint } = useApiContext();

  return (
    <div
      style={{
        display: "flex",
        rowGap: 16,
        flexDirection: "column",
        width: 1000,
      }}
    >
      {apis.map((el) => (
        <Card
          title={<ApiTypesSelector id={el._id} current={el.method} />}
          key={el._id}
          extra={
            <CloseOutlined
              onClick={() => {
                removeApi(el._id);
              }}
            />
          }
        >
          {el.error && <Alert className={styles.error} showIcon message={el.error} type="error" />}
          <Input
            placeholder="Endpoint"
            value={el.endpoint}
            onChange={(event) => changeEndpoint(el._id, event.target.value)}
          />
          <div>
            <ApiIPropsTabs id={el._id} />
          </div>
        </Card>
      ))}
      {!apis.length ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <Button
            type={ButtonTypes.SUCCESS}
            className={styles.addBtn}
            onClick={() => {
              createEmptyApi();
            }}
          >
            Add API <PlusOutlined />
          </Button>
        </div>
      ) : (
        <Button
          type={ButtonTypes.SUCCESS}
          className={styles.addBtn}
          onClick={() => {
            createEmptyApi();
          }}
        >
          Add API <PlusOutlined />
        </Button>
      )}
    </div>
  );
}
