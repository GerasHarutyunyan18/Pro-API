"use client";
import React, { useEffect } from "react";
import { Modal } from "antd";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
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
