"use client";
import { Alert, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

export default function BodyTab() {
  const [body, setBody] = useState<string>("");
  const onChange = (value: string) => {
    setBody(value);
  };

  return (
    <div>
      <TextArea
        onChange={(ev) => onChange(ev.target.value)}
        placeholder="Body"
        style={{ minHeight: 200 }}
      ></TextArea>
      {body.length ? (
        <>
          <h3>Pretty View</h3>
          <Typography>
            <pre>
              {(function () {
                try {
                  return <>{JSON.stringify(JSON.parse(body), null, 2)}</>;
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
