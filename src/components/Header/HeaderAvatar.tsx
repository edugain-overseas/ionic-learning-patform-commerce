import { useUser } from "../../context/UserContext";
import { serverName } from "../../http/server";
import { isValidUrl } from "../../utils/isValidUrl";
import AvatarFallback from "../Avatar/AvatarFallback/AvatarFallback";
import styles from "./Header.module.scss";

const HeaderAvatar = () => {
  const user = useUser()?.user;
  const src = user?.avatarURL;
  const alt = user?.username;

  return (
    <div className={styles.headerUserWrapper}>
      {src ? (
        <img src={isValidUrl(src) ? src : `${serverName}/${src}`} alt={alt} />
      ) : (
        <AvatarFallback size={22} />
      )}
    </div>
  );
};

export default HeaderAvatar;
