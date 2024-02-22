"use client";
import React from "react";
import { Alert, Typography } from "antd";
import Button from "@/components/primitives/button";
import { CopyOutlined } from "@ant-design/icons";
import { useNotificationContext } from "@/contexts/notification";
import { ButtonTypes } from "@/constants/enums";
import { useApiContext } from "@/contexts/apiContext";
import TextArea from "antd/es/input/TextArea";
import copy from "clipboard";

import styles from "./bodyTab.module.scss";

interface BodyTabProps {
  id: string;
  view?: boolean;
}

export default function BodyTab({ id, view }: BodyTabProps) {
  const { changeApiBody, getById } = useApiContext();
  const { openNotification } = useNotificationContext();

  const api = getById(id);

  const onChange = (value: string) => {
    changeApiBody(id, value);
  };

  const handleCopy = (value?: string): void => {
    copy.copy(value ?? "");
    openNotification("info", "Copied to clipboard.");
  };

  return (
    <div>
      {!view && (
        <TextArea
          onChange={(ev) => onChange(ev.target.value)}
          placeholder="Body"
          style={{ minHeight: 200 }}
        ></TextArea>
      )}
      {api?.body.length ? (
        <>
          {!view && <h4>Pretty View</h4>}
          {view && (
            <>
              <hr />
              Request body
              <br />
              <Button
                type={ButtonTypes.SUCCESS}
                className={styles.copyBtn}
                onClick={() => handleCopy(api?.body)}
              >
                Copy as JSON <CopyOutlined />
              </Button>
            </>
          )}
          <Typography>
            <pre>
              {(function () {
                try {
                  return <>{JSON.stringify(JSON.parse(api?.body), null, 2)}</>;
                } catch {
                  return <Alert message="Syntax Error" type="error" showIcon />;
                }
              })()}
            </pre>
          </Typography>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
