"use client";
import { useApiContext } from "@/contexts/apiContext";
import { Alert, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

interface BodyTabProps {
  id: string;
  view?: boolean;
}

export default function BodyTab({ id, view }: BodyTabProps) {
  const { changeApiBody, getById } = useApiContext();
  const api = getById(id);
  const onChange = (value: string) => {
    changeApiBody(id, value);
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
