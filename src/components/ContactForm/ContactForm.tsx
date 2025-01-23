import { FC, FormEventHandler } from "react";
import { IonIcon } from "@ionic/react";
import ArrowIcon from "../../assets/icons/header/back.svg";
import styles from "./ContactForm.module.scss";

const ContactForm: FC = () => {
  const handleSendMessage: FormEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form className={styles.form} onSubmit={handleSendMessage}>
      <h4 className={styles.header}>Contact Us</h4>
      <p className={styles.formText}>
        Still have more questions? Would be glad to assist.
      </p>
      <div className={styles.fields}>
        <label>
          <span>Name</span>
          <input type="text" name="name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" />
        </label>
        <label>
          <span>Phone</span>
          <input type="text" name="phone" />
        </label>
        <textarea name="message" rows={4} placeholder="Message..." />
      </div>
      <button type="submit">
        <span>Send message</span>
        <IonIcon src={ArrowIcon} />
      </button>
    </form>
  );
};

export default ContactForm;
