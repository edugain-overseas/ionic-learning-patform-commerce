import { FC, useState } from "react";
import { ExamResult, LandingBtnCallbacks } from "./CourseExamPage";
import styles from "./CourseExamPage.module.scss";
import Spinner from "../../../components/Spinner/Spinner";
import CommonButton from "../../../components/CommonButton/CommonButton";

type Status = ExamResult | "completed" | null;

type LandingPageProps = {
  status: Status;
  callbacks: LandingBtnCallbacks;
  hasAttempt: boolean;
};

type ExamLandingBtnProps = {
  label: string;
  variant: "primary" | "secondary";
  onClick: () => Promise<void>;
};

export const ExamLandingBtn: FC<ExamLandingBtnProps> = ({
  label,
  variant,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
      setIsError(false);
    } catch (error) {
      if (error) {
        setIsError(true);
      }
    } finally {
    }
    setIsLoading(false);
  };

  const textColor =
    variant === "primary"
      ? "var(--ion-color-primary-contrast)"
      : "var(--ion-color-dark)";

  const backgroundColor =
    variant === "primary" ? "var(--ion-color-dark)" : "transparent";

  const border =
    variant === "secondary" ? "1rem solid var(--ion-color-dark)" : "none";

  return (
    <>
      <CommonButton
        label={label}
        icon={
          isLoading && (
            <Spinner color={variant === "primary" ? "#fcfcfc" : undefined} />
          )
        }
        disabled={isLoading && isError}
        onClick={handleClick}
        color={textColor}
        backgroundColor={backgroundColor}
        border={border}
        height={32}
        borderRadius={5}
        className={styles.landingBtn}
      />
      {isError && (
        <p className={styles.errorMessage}>
          Something went wrong! Try to reload the page.
        </p>
      )}
    </>
  );
};

const getTemplateText = (status: Status) => {
  switch (status) {
    case "no_result":
      return (
        <>
          <h3>Welcome to Your Final Step!</h3>
          <div>
            <p className={styles.primaryText}>
              Congratulations on reaching the final stage of your course!
            </p>
            <p className={styles.primaryText}>
              This exam is your last step before earning your certificate, a
              recognition of your hard work and dedication to advancing your
              business knowledge.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              <b>Before you begin, here are a few important points:</b>
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              <b>Focus and Stay Present:</b> During the exam, it's essential to
              remain on this page. If you close it or navigate to another
              window, the exam will automatically end, and only the answers
              submitted so far will be recorded.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              <b>Stay Confident</b>: Trust in the knowledge you've gained.
              You've prepared well, and we're rooting for your success!
            </p>
            <p className={styles.secondaryText}>
              Take a deep breath, stay focused, and give it your best. We wish
              you the very best of luck—you're just one step away from achieving
              your goal!
            </p>
          </div>
        </>
      );
    case "absolute":
      return (
        <>
          <h3>Congratulations on Your Outstanding Achievement!</h3>
          <div>
            <p className={styles.primaryText}>
              You've achieved an exceptional score of points, the highest
              possible mark! This outstanding result reflects your dedication,
              perseverance, and mastery of the course material.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              <b>We are honored to celebrate your success!</b>
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              Click the button below to <b>complete your course</b> to get your
              well-deserved recognition:
            </p>
            <p className={styles.secondaryText}>
              Download Your Certificate. After it your Certificate will be ready
              to download.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              But why stop here? Unlock even more opportunities for growth and
              success with our wide range of business courses. Explore new
              topics, sharpen your skills, and continue your learning journey
              today!
            </p>
          </div>
        </>
      );
    case "acceptable":
      return (
        <>
          <h3>Well Done on Completing the Exam!</h3>
          <div>
            <p className={styles.primaryText}>
              You've achieved an exceptional score of points, the highest
              possible mark! This outstanding result reflects your dedication,
              perseverance, and mastery of the course material.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              <b>We are honored to celebrate your success!</b>
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              Ready to finalize your achievement?
            </p>
            <p className={styles.secondaryText}>
              If you're satisfied with your score, confirm your{" "}
              <b>completion of the course</b> and download your certificate of
              accomplishment:
            </p>
            <p className={styles.secondaryText}>
              Finish Course and Download Certificate
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              Your journey doesn't end here. Broaden your knowledge, sharpen
              your skills, and unlock new opportunities with our diverse range
              of business courses.
            </p>
            <p className={styles.secondaryText}>
              There's so much more to explore!
            </p>
          </div>
        </>
      );
    case "failed":
      return (
        <>
          <h3>Keep Going—You're on the Path to Success!</h3>
          <div>
            <p className={styles.primaryText}>
              You've scored points, which shows a solid effort and potential for
              improvement.
            </p>
            <p className={styles.primaryText}>
              Don't be discouraged—every attempt is a step closer to mastery!
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              You can retake the exam to improve your score and unlock your
              certificate. Take this opportunity to review the material and give
              it another try:
            </p>
            <p className={styles.secondaryText}>[Retake the Exam]</p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              We're here to support your journey and help you succeed. Remember,
              growth comes with persistence and learning from every experience!
            </p>
            <p className={styles.secondaryText}>
              Looking for more opportunities to expand your skills? Explore our
              wide range of business courses and discover topics that inspire
              you to reach new heights.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              Thank you for your hard work and determination. We believe in your
              potential and can't wait to celebrate your success!
            </p>
          </div>
        </>
      );
    case "completed":
      return (
        <>
          <h3>Well Done on Completing the Exam!</h3>
          <div>
            <p className={styles.primaryText}>
              You've achieved an exceptional score of points, the highest
              possible mark! This outstanding result reflects your dedication,
              perseverance, and mastery of the course material.
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              <b>We are honored to celebrate your success!</b>
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              You have <b>complete the course!</b>
            </p>
            <p className={styles.secondaryText}>
              <b>Download</b> your certificate of accomplishment
            </p>
          </div>
          <div>
            <p className={styles.secondaryText}>
              Your journey doesn't end here. Broaden your knowledge, sharpen
              your skills, and unlock new opportunities with our diverse range
              of business courses.
            </p>
            <p className={styles.secondaryText}>
              There's so much more to explore!
            </p>
          </div>
        </>
      );
    default:
      return null;
  }
};

const getTemplateBtns = (
  status: Status,
  callbacks: LandingBtnCallbacks,
  hasAttempt: boolean
) => {
  switch (status) {
    case "no_result":
      return (
        <ExamLandingBtn
          label="Start the exam"
          variant="primary"
          onClick={callbacks.startAttempt}
        />
      );
    case "absolute":
      return (
        <ExamLandingBtn
          label="Complete your course"
          variant="primary"
          onClick={callbacks.completeCourse}
        />
      );
    case "acceptable":
      return (
        <>
          {hasAttempt && (
            <ExamLandingBtn
              label="Re-take exam"
              variant="secondary"
              onClick={callbacks.startAttempt}
            />
          )}
          <ExamLandingBtn
            label="Complete your course"
            variant="primary"
            onClick={callbacks.completeCourse}
          />
        </>
      );
    case "failed":
      return hasAttempt ? (
        <ExamLandingBtn
          label="Re-take exam"
          variant="secondary"
          onClick={callbacks.startAttempt}
        />
      ) : (
        <p>You are out of attempts! More attempts will charge in 24 hours</p>
      );
    case "completed":
      return (
        <ExamLandingBtn
          label="Download certificate"
          variant="primary"
          onClick={callbacks.downloadCertificate}
        />
      );
    default:
      return <Spinner />;
  }
};

const ExamLanding: FC<LandingPageProps> = ({
  status,
  callbacks,
  hasAttempt,
}) => {
  return (
    <div className={styles.landingWrapper}>
      <div className={styles.textWrapper}>{getTemplateText(status)}</div>
      <div className={styles.btnsWrapper}>
        {getTemplateBtns(status, callbacks, hasAttempt)}
      </div>
    </div>
  );
};

export default ExamLanding;
