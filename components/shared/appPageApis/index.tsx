import { useState } from "react";
import { Collapse } from "antd";
import { useApiContext } from "@/contexts/apiContext";
import { getMethodColor } from "@/constants/functions";
import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";
import CustomModal from "@/components/primitives/modal";
import ParamTabView from "../paramTabView";
import BodyTab from "../appCreation/bodyTab";

import styles from "./appPageApis.module.scss";
import ApiCaller from "../apiCaller";

interface AppPageApisProps {
  id: string;
}

export default function AppPageApi({ id }: AppPageApisProps) {
  const { getById } = useApiContext();
  const [callModalOpen, setCallModalOpen] = useState<boolean>(false);
  const api = getById(id);

  const openCallModal = () => {
    setCallModalOpen(true);
  };

  const closeCallModal = () => {
    setCallModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Collapse
        items={[
          {
            key: 1,
            label: (
              <div className={styles.header}>
                <div>
                  <b
                    style={{
                      background: getMethodColor(api?.method),
                      color: "white",
                      borderRadius: 5,
                      marginRight: 5,
                      padding: "0px 5px",
                    }}
                  >
                    {api?.method}
                  </b>{" "}
                  <b>{api?.endpoint}</b>
                </div>
                <div>
                  <Button
                    onClick={openCallModal}
                    text="Do Call"
                    className={styles.callBtn}
                    type={ButtonTypes.WARNING}
                  />
                </div>
              </div>
            ),
            children: (
              <div className={styles.content}>
                {api?.description ?? "No description."}
                {api?.params.length ? <ParamTabView id={id} /> : <></>}
                {api?.body ? <BodyTab id={id} view /> : <></>}
                {api?.headers.map((el) => {
                  return (
                    <div key={el.id} className={styles.headerItem}>
                      <div className={styles.key}>{el.key}</div>
                      <div className={styles.value}>{el.value}</div>
                    </div>
                  );
                })}
              </div>
            ),
          },
        ]}
      />
      <CustomModal isOpen={callModalOpen} onClose={closeCallModal}>
        <ApiCaller id={id} />
      </CustomModal>
    </div>
  );
}
