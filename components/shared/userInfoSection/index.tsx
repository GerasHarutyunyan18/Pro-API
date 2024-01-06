"use client";
import { Card, Input, message } from "antd";
import { useAuthContext } from "@/contexts/auth";
import { ButtonTypes } from "@/constants/enums";
import Button from "@/components/primitives/button";
import { CopyOutlined, ShareAltOutlined } from "@ant-design/icons";
import CustomModal from "@/components/primitives/modal";
import copy from "clipboard";
import { useState } from "react";

import styles from "./userInfoSection.module.scss";

export default function UserInfoSection() {
  const { currentUser } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = () => {
    copy.copy(currentUser?.url ?? "");
    messageApi.info("Copied.");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Card style={{ width: "100%", height: "100%" }} title="Personal Info">
        <p>
          <b>ID : </b>
          {currentUser?.id}
        </p>
        <p>
          <b>Email : </b>
          {currentUser?.email}
        </p>
        <p>
          <b>Name : </b>
          {currentUser?.name}
        </p>
        <p>
          <b>Surname : </b>
          {currentUser?.surname}
        </p>
        <Button onClick={handleOpen} type={ButtonTypes.WARNING}>
          Share Profile
          <ShareAltOutlined />
        </Button>
        <CustomModal title="Share profile" onClose={handleClose} isOpen={open}>
          <div className={styles.shareTypes}>
            <div className={styles.shareItems}>
              <Button
                onClick={handleCopy}
                className={styles.copyBtn}
                type={ButtonTypes.SECONDARY}
              >
                Copy Profile URL <CopyOutlined />
              </Button>
              <Input disabled value={currentUser?.url} />
            </div>
          </div>
        </CustomModal>
      </Card>
    </div>
  );
}
