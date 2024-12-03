import { FC } from "react";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./BasketCheckoutPanel.module.scss";

type CheckoutBtnProps = {
  isLoading?: boolean;
  disabled?: boolean;
  handleClick: () => void;
};

const CheckoutBtn: FC<CheckoutBtnProps> = ({
  isLoading = false,
  disabled = false,
  handleClick,
}) => {
  return (
    <CommonButton
      label="Checkout"
      icon={isLoading && <Spinner color="#fff" />}
      backgroundColor="#7E8CA8"
      borderRadius={5}
      color="#FCFCFC"
      width={312}
      height={40}
      className={styles.checkoutBtn}
      onClick={handleClick}
      disabled={disabled}
    />
  );
};

export default CheckoutBtn;
