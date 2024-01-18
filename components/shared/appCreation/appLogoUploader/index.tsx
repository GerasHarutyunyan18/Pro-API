"use client";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

export default function AppLogoUploader() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    return false;
  };

  const renderUploadButton = () => {
    if (fileList.length === 0) {
      return "+ Upload";
    }
    return null;
  };

  return (
    <ImgCrop>
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
      >
        {renderUploadButton()}
      </Upload>
    </ImgCrop>
  );
}
