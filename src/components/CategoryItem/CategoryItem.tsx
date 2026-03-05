import React from "react";
import { IonRippleEffect, IonRouterLink, IonText } from "@ionic/react";
import { CategoryType } from "../../context/CoursesContext";
import categoryIcon from "../../assets/icons/category.svg";
import InfoBtn from "../InfoBtn/InfoBtn";
import styles from "./CategoryItem.module.scss";
import { serverName } from "../../http/server";

interface CategoryItemTypes {
  category: CategoryType;
}

const CategoryItem: React.FC<CategoryItemTypes> = ({ category }) => {
  console.log(category);

  const categoryIconPath = category.icons?.find((icon) => icon.is_main)?.path;

  return (
    <li
      key={category.id}
      className={`${styles.categoriesItem} ion-activatable`}
    >
      <IonRouterLink
        className={`${styles.link} ion-activatable`}
        routerLink={`/category/${category.id}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.itemIcon}>
            <img
              src={
                categoryIconPath
                  ? `${serverName}/${categoryIconPath}`
                  : categoryIcon
              }
            />
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
        <IonRippleEffect></IonRippleEffect>
      </IonRouterLink>
      <div className={styles.infoBtn}>
        {category.description && (
          <InfoBtn info={category.description} ripple={false} />
        )}
      </div>
    </li>
  );
};

export default CategoryItem;
