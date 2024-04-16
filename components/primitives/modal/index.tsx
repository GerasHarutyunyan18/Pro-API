"use client";
import React, { useEffect } from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  width?: string | number;
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "auto",
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      width={width}
      centered
      title={title}
      open={isOpen}
      footer={null}
      onCancel={handleClose}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
