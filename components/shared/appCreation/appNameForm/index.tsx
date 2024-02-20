import { Form, Input, Select, Spin } from "antd";
import { AppIndustries, AppTypesOptions } from "@/constants/options";
import styles from "./appNameForm.module.scss";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import { App } from "@/contexts/appContext/type";
import { AppService } from "@/services/app";
import { useApiContext } from "@/contexts/apiContext";
import { useAuthContext } from "@/contexts/auth";
import { useNotificationContext } from "@/contexts/notification";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { TextArea } = Input;
const { Option } = Select;

export default function AppNameForm() {
  const { apis, validateApis } = useApiContext();
  const { openNotification } = useNotificationContext();
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: App) => {
    if (!apis.length) {
      openNotification("error", "There is no added apis.");
      return;
    }

    const isValidApis = validateApis();

    if (!isValidApis) {
      return;
    }

    setLoading(true);
    const res = await AppService.create(
      values,
      apis,
      currentUser?.personalAccessKey
    );

    console.log("res ===", res);

    if (res.success) {
      router.push(`/app/${res.id}`);
    }
    setLoading(false);
  };

  return (
    <Form name="app_name_form" onFinish={onFinish} className={styles.container}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your app name!" }]}
      >
        <Input placeholder="App name" />
      </Form.Item>
      <Form.Item
        name="type"
        rules={[{ required: true, message: "Please select your app type!" }]}
      >
        <Select placeholder="Select APP type">
          {AppTypesOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="industry"
        rules={[{ required: true, message: "Please select your industry!" }]}
      >
        <Select placeholder="Select Industry">
          {AppIndustries.map((industry) => (
            <Option key={industry.value} value={industry.value}>
              {industry.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="domain"
        rules={[
          {
            required: true,
            message: "Please input your domain!",
          },
        ]}
      >
        <Input placeholder="Domain" />
      </Form.Item>
      <Form.Item name="description">
        <TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type={ButtonTypes.PRIMARY}>
          {loading ? <Spin /> : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
}
