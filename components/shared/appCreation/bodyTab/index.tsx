"use client";
import React from "react";
import { Alert, Typography } from "antd";
import { useApiContext } from "@/contexts/apiContext";
import TextArea from "antd/es/input/TextArea";

interface BodyTabProps {
  id: string;
  view?: boolean;
  showPretty?: boolean;
}

export default function BodyTab({ id, view, showPretty = true }: BodyTabProps) {
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
      {api?.body.length && showPretty ? (
        <>
          {!view && <h4>Pretty View</h4>}
          {view && (
            <>
              <hr />
              Request body
              <br />
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
