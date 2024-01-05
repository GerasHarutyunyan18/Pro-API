"use client";
import styles from "./login.module.scss";
import SidebarImage from "@/public/loginSidebarImg.png";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import Link from "next/link";
import { Form, Input } from "antd";

export default function Login() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("login", values);
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
              name="email"
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              name="password"
            >
              <Input placeholder="Password" />
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
