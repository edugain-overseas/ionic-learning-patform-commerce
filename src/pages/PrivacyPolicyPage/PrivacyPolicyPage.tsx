import { IonContent, IonPage } from "@ionic/react";
import Header from "../../components/Header/Header";
import styles from "./PrivacyPolicyPage.module.scss";

const headerProps = {
  left: [{ name: "back" }],
  title: "Privacy Policy",
};

const PrivacyPolicyPage = () => {
  return (
    <IonPage className="primaryPage">
      <Header {...headerProps} />
      <IonContent className={styles.privacyPolicyContent}>
        <h1>Privacy Policy, Terms of Use, Refund Policy and Cookie Policy</h1>
        <p>
          <strong>Online Courses by First European University</strong> <br></br>
          Effective date: 3 August 2026
        </p>

        <h2>General Information</h2>
        <p>
          First European University respects the privacy of its users and is
          committed to providing a safe, transparent and reliable online
          learning experience.
        </p>
        <p>
          This Privacy Policy, Terms of Use, Refund Policy and Cookie Policy
          apply to the Online Courses website and mobile application operated by
          First European University. They describe how personal information is
          collected and used, as well as the general conditions for accessing
          courses, making payments, receiving certificates and using the
          platform.
        </p>
        <p>
          Online Courses provides access to short and long educational courses
          offered by First European University and its authorised instructors.
          Certain courses may include assignments, assessments or final tests
          and may lead to a digital certificate after successful completion of
          the applicable course requirements.
        </p>
        <p>
          By creating an account, purchasing a course or using the Online
          Courses website or application, you confirm that you have read and
          understood the information provided in this document.
        </p>

        <h2>Privacy Policy</h2>
        <p>
          To provide access to the platform and its educational services, First
          European University may collect personal information such as your full
          name, email address, account details, course enrolments, learning
          progress, assessment results, certificate records, payment
          confirmation details and communications submitted through the
          platform.
        </p>
        <p>
          We may also collect limited technical information, including your
          device type, operating system, browser type, IP address, language
          settings and general information about how the website or application
          is used. This information helps us operate the platform securely,
          identify technical issues and improve the learning experience.
        </p>
        <p>
          Personal information may be used to create and manage your account,
          provide access to purchased courses, record your learning progress,
          process assignments and assessments, issue certificates, confirm
          payments, send important service-related notifications, provide
          technical support, protect the platform from misuse and improve our
          educational services.
        </p>
        <p>
          First European University does not sell or rent users’ personal
          information.
        </p>
        <p>
          Where necessary for the operation of the platform, information may be
          shared with trusted service providers that assist with secure hosting,
          authentication, payment processing, analytics, communications,
          notifications and technical support. These providers may process
          information only for the purpose of providing their respective
          services and in accordance with their own privacy obligations.
        </p>
        <p>
          Information may also be disclosed where this is required by applicable
          law, a lawful request from an authorised public body or where
          reasonably necessary to protect the rights, safety and security of
          users, First European University or the Online Courses platform.
        </p>

        <h2>Payments and Payment Information</h2>
        <p>
          Payments may be processed through authorised third-party payment
          providers, the Apple App Store, Google Play or other payment services
          available through the website or application.
        </p>
        <p>
          Full bank card details are handled by the relevant payment provider
          and are not intended to be stored directly by First European
          University. The University may receive confirmation of the
          transaction, including the payment status, amount, currency, date and
          purchased course.
        </p>
        <p>
          Course prices are determined by First European University and may
          differ depending on the course, programme, promotion, currency or
          country in which the service is offered. The final price and any
          applicable taxes or fees will be displayed before the purchase is
          confirmed.
        </p>

        <h2>Data Storage and Protection</h2>
        <p>
          Personal information is retained only for as long as reasonably
          necessary to provide access to the platform, maintain learning and
          certificate records, comply with financial and legal obligations,
          resolve payment or support issues and protect the security of the
          service.
        </p>
        <p>
          Information that is no longer required may be deleted or anonymised
          where reasonably possible.
        </p>
        <p>
          First European University applies reasonable technical and
          organisational measures to protect personal information against
          unauthorised access, accidental loss, alteration, misuse or
          disclosure. Although we take appropriate steps to protect user
          information, no online service or electronic storage system can
          guarantee complete security.
        </p>
        <p>
          As Online Courses may be accessed internationally, personal
          information may be processed or stored in a country other than the
          user’s country of residence. Where applicable, First European
          University and its service providers take reasonable measures to
          protect information during such processing.
        </p>

        <h2>Your Personal Data Rights</h2>
        <p>
          Depending on the user’s country and applicable law, users may have the
          right to access their personal information, correct inaccurate
          details, request deletion of their information, restrict certain
          processing activities, object to certain uses of their information or
          withdraw previously provided consent.
        </p>
        <p>
          Users may update certain information through their account settings.
          Where account deletion is available, users may submit a deletion
          request through the application or the relevant request option
          provided on the First European University website.
        </p>
        <p>
          Some records may be retained where required for financial, legal,
          security, certificate verification or academic record-keeping
          purposes.
        </p>

        <h2>Terms of Use</h2>
        <p>
          Users are responsible for providing accurate and current information
          when creating and maintaining an account. Login details should be kept
          confidential, and users should notify the University through the
          available support options if they believe that their account has been
          accessed without permission.
        </p>
        <p>
          Each account is intended for individual use. Account access, purchased
          courses, assessment results and certificates may not be transferred to
          another person unless First European University expressly permits
          otherwise.
        </p>
        <p>
          The description, duration, language, price, learning format, access
          period and certificate requirements of each course are displayed on
          the relevant course page before purchase. Users are encouraged to
          review this information carefully before completing a payment.
        </p>
        <p>
          After a successful purchase, the user receives a personal, limited and
          non-transferable right to access the selected course in accordance
          with its description and access conditions. Purchasing a course does
          not transfer ownership of the course or its materials to the user.
        </p>
        <h2>Courses and Certificates</h2>
        <p>
          Certificates are available only for courses that specifically include
          certification. A certificate may be issued after the user successfully
          completes all applicable lessons, assignments, assessments or other
          requirements stated in the course description.
        </p>
        <p>
          A certificate confirms completion of the particular online course.
          Unless expressly stated otherwise in the course description, it does
          not constitute an academic degree, professional licence,
          state-recognised qualification or automatic admission to another
          educational programme.
        </p>
        <p>
          First European University may refuse to issue or may revoke a
          certificate where there is reasonable evidence of identity misuse,
          fraud, plagiarism, academic dishonesty, manipulation of assessment
          results or another serious violation of the platform rules.
        </p>

        <h2>Intellectual Property and Acceptable Use</h2>
        <p>
          All videos, texts, presentations, graphics, assessments, downloadable
          materials, certificates, logos, trademarks, software and other content
          available through Online Courses belong to First European University,
          its authorised instructors, licensors or other respective rights
          holders.
        </p>
        <p>
          Course materials are provided for the user’s personal educational use.
          They may not be copied, recorded, reproduced, published, sold,
          distributed, modified or used for commercial purposes without prior
          permission from the relevant rights holder.
        </p>
        <p>
          Users are expected to use the platform respectfully and lawfully.
          Users may not share paid access with other people, attempt to access
          another user’s account, interfere with the platform’s operation or
          security, upload harmful software, misuse certificates, copy protected
          educational materials or use the platform for fraudulent or unlawful
          purposes.
        </p>
        <p>
          Where a serious or repeated violation occurs, First European
          University may temporarily restrict or permanently terminate access to
          the relevant account or course. Where reasonably possible, the
          circumstances will be reviewed before such action is taken.
        </p>

        <h2>Refund Policy</h2>
        <p>
          Course purchases are generally considered final because access to
          digital educational materials may be provided shortly after payment.
        </p>
        <p>
          Refunds are therefore not normally available where a user changes
          their mind, does not complete the course, does not have sufficient
          time to study, does not achieve the expected result or is dissatisfied
          for reasons unrelated to a technical problem with the purchased
          service.
        </p>
        <p>
          Payment or access issues may be reviewed where there has been a
          duplicate charge, an incorrect transaction, a verified technical error
          preventing access to the purchased course or another situation in
          which a refund or alternative remedy is required by applicable law.
        </p>
        <p>
          Where a purchase has been completed through the Apple App Store,
          Google Play or another external payment provider, any refund request
          may also be processed in accordance with that provider’s payment and
          refund procedures.
        </p>
        <p>
          If a verified technical issue prevents access to a purchased course,
          First European University may first attempt to restore access or
          resolve the issue before considering another appropriate solution.
        </p>

        <h2>Cookie Policy</h2>
        <p>
          The Online Courses website may use cookies and similar technologies to
          keep users signed in, remember preferences, maintain security, process
          essential website functions, measure performance and understand how
          the service is used.
        </p>
        <p>
          The mobile application may use comparable technologies, such as secure
          local storage, device identifiers or analytics tools, where necessary
          for its operation.
        </p>
        <p>
          Some cookies and similar technologies are necessary for the website or
          application to function correctly. Optional analytics or preference
          technologies may be used with the user’s consent where such consent is
          required.
        </p>
        <p>
          Users may manage cookies through their browser or device settings and,
          where available, through the cookie settings provided on the website.
          Disabling certain essential technologies may affect account login,
          course access, payments or other important platform functions.
        </p>

        <h2>Service Availability and Educational Results</h2>
        <p>
          First European University aims to keep Online Courses accessible,
          secure and accurate. Temporary interruptions may occasionally occur
          because of scheduled maintenance, updates, technical issues or
          circumstances outside the University’s reasonable control.
        </p>
        <p>
          Where possible, reasonable steps will be taken to restore the service
          and minimise disruption.
        </p>
        <p>
          Educational materials are provided for learning and informational
          purposes within the scope described for each course. First European
          University does not guarantee that completion of a course will result
          in employment, promotion, admission to another institution, a
          particular professional outcome or recognition by an external
          organisation unless such an outcome is expressly stated in the course
          description.
        </p>

        <h2>Updates and Support</h2>
        <p>
          This document may be updated when necessary to reflect the current
          operation of the platform, applicable legal requirements or changes to
          the services. The version published on the official Online Courses
          website will be considered the current version.
        </p>
        <p>
          Questions about personal information, course access, payments or the
          use of the platform may be submitted through the official support
          options available on the First European University website or within
          the Online Courses application.
        </p>
        <p>
          By creating an account, purchasing or enrolling in a course, or
          continuing to use the Online Courses website or application, you
          acknowledge that you have read and understood this Privacy Policy,
          Terms of Use, Refund Policy and Cookie Policy.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicyPage;
