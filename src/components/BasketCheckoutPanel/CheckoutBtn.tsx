import { FC } from "react";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./BasketCheckoutPanel.module.scss";

type CheckoutBtnProps = {
  isLoading?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
};

const CheckoutBtn: FC<CheckoutBtnProps> = ({
  isLoading = false,
  disabled = false,
  handleClick = () => {},
}) => {
  return (
    <CommonButton
      label="Checkout"
      icon={isLoading && <Spinner color="#fff" />}
      backgroundColor={disabled ? "#BDC4D2" : "#7E8CA8"}
      borderRadius={5}
      color="#FCFCFC"
      block={true}
      height="40px"
      className={styles.checkoutBtn}
      onClick={handleClick}
      disabled={isLoading}
    />
  );
};

export default CheckoutBtn;
