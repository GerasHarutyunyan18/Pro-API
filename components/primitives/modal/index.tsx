"use client";
import React, { useEffect } from "react";
import { Modal } from "antd";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onCancel={handleClose}>
      {children}
    </Modal>
  );
};

export default CustomModal;
