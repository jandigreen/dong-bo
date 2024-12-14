import styled, { css, keyframes } from "styled-components";

type Props = {
  onClickBackDrop?: () => void;
  children: React.ReactNode;
  type?: "center" | "top" | "bottom" | "custom";
  isAnimation?: boolean;
  backDropAnimation?: boolean;
  isCloseBtn?: boolean;
  onHide?: () => void;
};

const Modal = ({
  children,
  onClickBackDrop,
  type = "center",
  isAnimation = true,
  backDropAnimation = true,
  isCloseBtn = true,
  onHide,
}: Props) => {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClickBackDrop && onClickBackDrop();
    }
  };

  return (
    <BackDrop onClick={handleBackdropClick} $isAnimation={backDropAnimation}>
      {isAnimation ? (
        <ModalView type={type}>
          {children}
          {isCloseBtn && <PopCloseBtn onClick={onHide}>X</PopCloseBtn>}
        </ModalView>
      ) : (
        <>
          {type === "center" && <CenterModalBody>{children}</CenterModalBody>}
          {type === "top" && <TopModalBody>{children}</TopModalBody>}
          {type === "bottom" && <BottomModalBody>{children}</BottomModalBody>}
          {type === "custom" && <>{children}</>}
        </>
      )}
    </BackDrop>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const BackDrop = styled.div<{ $isAnimation: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${({ $isAnimation }) =>
    $isAnimation &&
    css`
      animation: ${fadeIn} 0.3s ease-out;
    `}
`;

const ModalView = styled.div<{ type: Props["type"] }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  ${({ type }) => {
    switch (type) {
      case "center":
        return css`
          top: 50%;
          transform: translate(-50%, -50%);
          animation: ${fadeIn} 0.3s ease-out;
        `;
      case "top":
        return css`
          top: 0;
          animation: ${slideDown} 0.3s ease-out;
        `;
      case "bottom":
        return css`
          bottom: 0;
          animation: ${slideUp} 0.3s ease-out;
        `;
      default:
        return "";
    }
  }}
`;

const CenterModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TopModalBody = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const BottomModalBody = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const PopCloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #fff;
  padding: 10px;
`;

export default Modal;
