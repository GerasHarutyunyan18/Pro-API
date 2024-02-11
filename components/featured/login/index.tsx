"use client";
import { Form, Input } from "antd";
import Link from "next/link";
import SidebarImage from "@/public/loginSidebarImg.png";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import { useAuthContext } from "@/contexts/auth";
import { AuthService } from "@/services/auth";
import { useNotificationContext } from "@/contexts/notification";
import { LocalStorageKeys } from "@/constants/objects";

import styles from "./login.module.scss";

export default function Login() {
  const [form] = Form.useForm();
  const { openNotification } = useNotificationContext();
  const { updateCurrentUser } = useAuthContext();

  const onFinish = async (values: any) => {
    const res = await AuthService.login(values);
    if (!res?.success) {
      openNotification("error", res?.error?.message);
    } else if (res?.success) {
      localStorage.setItem(LocalStorageKeys.authToken, res.token);
      openNotification("success", "Successfully logged in.");
      updateCurrentUser(res.user);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.rightPart}>
          <img width={500} src={SidebarImage.src} />
        </div>
        <div className={styles.leftPart}>
          <h2>Sign In</h2>
          <Form
            form={form}
            className={styles.form}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              rules={[{ required: true, message: "Please input your email!" }]}
              name="nickname"
            >
              <Input placeholder="Nickname" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              name="password"
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                className={styles.submitBtn}
                htmlType="submit"
                text="Sign In"
                type={ButtonTypes.PRIMARY}
              />
            </Form.Item>
          </Form>
          <p className={styles.formBottomInfo}>
            Have not account yet? <Link href="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
