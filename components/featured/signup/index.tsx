"use client";
import styles from "./signup.module.scss";
import SidebarImage from "@/public/loginSidebarImg.png";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import Link from "next/link";
import { Form, Input, Result } from "antd";
import { AuthService } from "@/services/auth";
import { useNotificationContext } from "@/contexts/notification";

export default function Register() {
  const [form] = Form.useForm();
  const { openNotification } = useNotificationContext();

  const onFinish = async (values: any) => {
    const res = await AuthService.signup(values);
    if (res?.errors?.length) {
      res.errors.map((error: string) => {
        openNotification("error", error);
      });
    }
  };

  const validatePasswordRepeat = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The passwords do not match"));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.leftPart}>
          <h2>Sign Up</h2>
          <Form
            form={form}
            className={styles.form}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              rules={[{ required: true, message: "Please input your name!" }]}
              name="name"
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your surname!" },
              ]}
              name="surname"
            >
              <Input placeholder="Surname" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your email!" }]}
              name="email"
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your nickname!" },
              ]}
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
            <Form.Item
              rules={[
                { required: true, message: "Please input your password!" },
                validatePasswordRepeat(form),
              ]}
              name="passwordRepeat"
            >
              <Input type="password" placeholder="Password Repeat" />
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
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
        </div>
        <div className={styles.rightPart}>
          <img width={500} src={SidebarImage.src} />
        </div>
      </div>
    </div>
  );
}
