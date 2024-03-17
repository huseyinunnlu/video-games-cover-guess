import { Modal } from "antd";
import { useEffect, useState } from "react";
import { IModalProps } from "../../types/utils.ts";
import StartNewGame from "./CustomModals/StartNewGame";
import TrueGuessInfo from "./CustomModals/TrueGuessInfo/index.tsx";
import FalseGuessInfo from "./CustomModals/FalseGuessInfo/index.tsx";

//import CustomModals from "./CustomModals";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModalProps>({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({});
  };

  const renderCustomContent = () => {
    if (modalContent?.customComponentName) {
      switch (modalContent.customComponentName) {
        case "startNewGameModal":
          return <StartNewGame {...modalContent.customComponentProps} />;
        case "trueGuessInfoModal":
          return <TrueGuessInfo {...modalContent.customComponentProps} />;
        case "falseGuessInfoModal":
          return <FalseGuessInfo {...modalContent.customComponentProps} />;
        default:
          return null;
      }
    }

    if (modalContent?.customComponent)
      // @ts-ignore:next-line
      return <modalContent.customComponent {...modalContent} />;
  };

  useEffect(() => {
    //write custom show modal event listener
    window.addEventListener("GLOBAL-EVENT-SHOW-MODAL", (e: Event) => {
      const event = e as CustomEvent<IModalProps>;
      setModalContent(event.detail);
      showModal();
    });

    window.addEventListener("GLOBAL-EVENT-HIDE-MODAL", () => {
      closeModal();
    });
  });

  return (
    <>
      <Modal
        title={modalContent?.title}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
        closable={modalContent?.closable || false}
        maskClosable={modalContent?.closable}
      >
        {modalContent?.customComponentName || modalContent?.customComponent
          ? renderCustomContent()
          : modalContent.content}
      </Modal>
    </>
  );
}

export default Index;
