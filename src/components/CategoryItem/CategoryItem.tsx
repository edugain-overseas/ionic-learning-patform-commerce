import React from "react";
import { IonRouterLink, IonText } from "@ionic/react";
import { CategoryType } from "../../context/CoursesContext";
import categoryIcon from "../../assets/icons/category.svg";
import InfoBtn from "../InfoBtn/InfoBtn";
import styles from "./CategoryItem.module.scss";

interface CategoryItemTypes {
  category: CategoryType;
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
      <div className={styles.infoBtn}>
        {category.description && (
          <InfoBtn
            info={category.description}
            id={`info-${category.id}-trigger`}
          />
        )}
      </div>
    </li>
  );
};

export default CategoryItem;
