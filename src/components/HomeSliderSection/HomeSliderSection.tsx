import { ReactNode } from "react";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/icons/arrow-right.svg";
import HomeSlider from "../HomeSlider/HomeSlider";
import styles from "./HomeSliderSection.module.scss";

type HomeSliderSectionProps<T> = {
  title: string;
  link: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
};

const HomeSliderSection = <T,>({
  title,
  link,
  items,
  renderItem,
}: HomeSliderSectionProps<T>) => {
  return (
    <div>
      <div className={styles.header}>
        <h3>{title}</h3>
        <Link to={link}>
          <span>Show all</span>
          <IonIcon src={ArrowIcon} />
        </Link>
      </div>
      <HomeSlider items={items} renderItem={renderItem} />
    </div>
  );
};

export default HomeSliderSection;
