import { useApiContext } from "@/contexts/apiContext";
import styles from "./apiCaller.module.scss";
import ApiMethod from "@/components/primitives/apiMethod";
import BodyTab from "../appCreation/bodyTab";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Api } from "@/contexts/apiContext/type";
import Input from "@/components/primitives/input";
import { ButtonTypes, ValueTypes } from "@/constants/enums";
import copy from "clipboard";
import Button from "@/components/primitives/button";
import { Spin, Typography } from "antd";
import { CopyOutlined, LoadingOutlined } from "@ant-design/icons";
import { createApiFetch } from "@/constants/functions";
import { useAppContext } from "@/contexts/appContext";
import { useNotificationContext } from "@/contexts/notification";
import MakedRequest from "../makedRequest";

interface ApiCallerProps {
  id: string;
}

export default function ApiCaller({ id }: ApiCallerProps) {
  const { getById } = useApiContext();
  const { currentApp } = useAppContext();
  const [api, setApi] = useState<Api>();
  const { openNotification } = useNotificationContext();
  const [body, setBody] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [makedRequest, setMakedRequests] = useState<any[]>([]);
  const [activeResponse, setActiveResponse] = useState<any>();

  useEffect(() => {
    const newApi = getById(id);

    if (!newApi) {
      return;
    }

    setBody(newApi?.body);
    setApi(newApi);
  }, [id]);

  const handleCall = async () => {
    if (fetching || !api) {
      return;
    }
    setFetching(true);
    const obj = createApiFetch(
      api?.method,
      "api/auth/signain",
      body,
      api?.headers,
      api?.params
    );

    let status;
    const res = await fetch(`${currentApp?.domain}${obj.url}`, obj.options)
      .then((data) => {
        status = data.status;
        console.log("data ===", data);
        try {
          return data.json();
        } catch {
          return {
            success: false,
            message:
              "Something went wrong, API didnt return the valid json string.",
          };
        }
      })
      .catch((err) => {
        status = err.status;
        try {
          return err.json();
        } catch {
          return {
            success: false,
            message:
              "Something went wrong, API didnt return the valid json string.",
          };
        }
      });

    let result = { status: res.status, message: "" };
    if (!res.ok) {
      switch (res.status) {
        case 404:
          result.message = "Not found";
          break;
        default:
          result = res as any;
      }
    }
    setActiveResponse(res);
    setMakedRequests([...makedRequest, res]);
    setFetching(false);
  };

  console.log("ss", makedRequest);

  const handleResponseCopy = () => {
    const jsonString = JSON.stringify(activeResponse);
    copy.copy(jsonString);
    openNotification("info", "Copied to clipboard.");
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <ApiMethod method={api?.method} size="lg" />
          <b>{api?.endpoint}</b>
        </div>
        <div className={styles.content}>
          {api?.body && (
            <TextArea
              className={styles.bodyInput}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
            />
          )}
          <div>
            <p>Headers</p>
            {[{ key: "Neighbors API key" }].map((el) => (
              <div className={styles.headerItem}>
                <Input placeholder={`${el.key} (Header item)`} />
              </div>
            ))}
          </div>
          <div>
            <p>Params</p>
            {[
              { name: "login", type: ValueTypes.ANY },
              { name: "password", type: ValueTypes.STR },
            ].map((el) => (
              <div className={styles.paramItem}>
                <label>{`${el.name} (parameter) ${el.type}`}</label>
                <Input placeholder={`${el.name} (parameter) ${el.type}`} />
              </div>
            ))}
          </div>
          <Button
            disabled={fetching}
            onClick={handleCall}
            type={ButtonTypes.SUCCESS}
          >
            {api?.method}
          </Button>
        </div>
      </div>
      <div className={styles.response}>
        <h3>Response</h3>
        {fetching && (
          <div className={styles.loadinContainer}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          </div>
        )}
        {!fetching && activeResponse && (
          <Typography className={styles.responseJson}>
            <Button
              onClick={handleResponseCopy}
              className={styles.copyBtn}
              type={ButtonTypes.SECONDARY}
            >
              COPY
              <CopyOutlined />
            </Button>
            <pre>{JSON.stringify(activeResponse, null, 2)}</pre>
          </Typography>
        )}
        <div className={styles.history}>
          {makedRequest.map((el) => (
            <div>
              <MakedRequest el={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
