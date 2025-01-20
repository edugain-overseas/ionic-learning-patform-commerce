import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../HomeSliderSection/HomeSliderSection.module.scss";
import { remToPx } from "../../utils/pxToRem";

type HomeSliderProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

const HomeSlider = <T,>({ items, renderItem }: HomeSliderProps<T>) => {
  return (
    <Swiper
      className={styles.swiper}
      spaceBetween={remToPx(16)}
      slidesPerView="auto"
      style={{ padding: "10rem 18rem 26rem" }}
    >
      {items.map((item, index) => (
        <SwiperSlide
          key={index}
          className={styles.slide}
          style={{ width: "304rem" }}
        >
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
