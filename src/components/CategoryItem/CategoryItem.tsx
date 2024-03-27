import React from "react";
import {
  IonContent,
  IonIcon,
  IonPopover,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { CategoryTypes } from "../../constants";
import categoryIcon from "../../assets/icons/category.svg";
import infoIcon from "../../assets/icons/info.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./CategoryItem.module.scss";

interface CategoryItemTypes {
  category: CategoryTypes;
}

const CategoryItem: React.FC<CategoryItemTypes> = ({ category }) => {
  return (
    <li key={category.id} className={styles.categoriesItem}>
      <IonRouterLink
        className={styles.link}
        routerLink={`/courses/category/${category.id}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.itemIcon}>
            <img src={categoryIcon} />
          </div>
          <div>
            <IonText>
              <h3>{category.title}</h3>
            </IonText>
            <IonText>
              <p>
                (Complete all 4 courses to receive a <b>MBA Certificate</b>)
              </p>
            </IonText>
          </div>
        </div>
      </IonRouterLink>
      <div className={styles.infoBtn} id="info-trigger">
        <InsetBtn
          icon={<IonIcon src={infoIcon} style={{ fontSize: "16px" }} />}
          width="32px"
          height="32px"
          disabled={false}
          onClick={() => {}}
        />
        <IonPopover trigger="info-trigger">
          <IonContent className={styles.infoContent}>
            <IonText>{category.description}</IonText>
          </IonContent>
        </IonPopover>
      </div>
    </li>
  );
};

export default CategoryItem;
