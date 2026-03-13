import { FC } from "react";
import { IonIcon } from "@ionic/react";
import ArrowIcon from "../../assets/icons/header/back.svg";
import styles from "./ContactForm.module.scss";
import { useForm } from "react-hook-form";
import { useToast } from "../../hooks/useToast";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
};

const API_URL = import.meta.env
  .VITE_CONTACT_SERVICE_WEB_APP_BY_GOOGLE_SCRIPT_URL;

const ContactForm: FC = () => {
  const [present] = useToast();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ContactFormData>();

  const handleSendMessage = async (data: ContactFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("company", data.company || "");

      await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      reset();

      present({
        message: "Your message has been sent!",
        type: "success",
      });
    } catch (error) {
      present({
        message: "Contact service is currently unavailable. Try again later",
        type: "error",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSendMessage)}>
      <h4 className={styles.header}>Contact Us</h4>
      <p className={styles.formText}>
        Still have more questions? Would be glad to assist.
      </p>
      <div className={styles.fields}>
        <label>
          <span>Name</span>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </label>
        <label>
          <span>Phone</span>
          <input
            type="number"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <span className={styles.error}>{errors.phone.message}</span>
          )}
        </label>
        <div className={styles.textareaWrapper}>
          <textarea
            rows={4}
            placeholder="Message..."
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span className={styles.error}>{errors.message.message}</span>
          )}
        </div>
      </div>
      <input type="text" style={{ display: "none" }} {...register("company")} />
      <button type="submit" disabled={isSubmitting}>
        <span>Send message</span>
        <IonIcon src={ArrowIcon} />
      </button>
    </form>
  );
};

export default ContactForm;
