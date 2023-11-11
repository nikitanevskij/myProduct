import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelect, logout } from "../../redux/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelect);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>PRODUCT STORE</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <Button onClick={onClickLogout} variant="contained" color="error">
                Выйти
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
