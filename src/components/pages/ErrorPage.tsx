import { FC } from "react";
import { Link } from "react-router-dom";

import { Copyright } from "..";
import { CONSTANTS } from "../../constants";

import image from "../../assets/404.jpg";

import styles from "../../styles/errorPage.module.less";

const ErrorPage: FC = () => (
  <main className={styles.imageBlock}>
    <img src={image} alt={CONSTANTS.ERROR_IMAGE_ALT} />

    <Link to="/Youtube-clone/home" className={styles.homePageLink}>
      {CONSTANTS.BACK_TO_HOME_PAGE}
    </Link>

    <Copyright />
  </main>
);

export default ErrorPage;
