import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, isAuthSelect } from "../../redux/authSlice";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(isAuthSelect);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "123@123.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const responce = await dispatch(fetchAuth(data));
    if (!responce.payload._id) {
      return alert("Не удалось авторизоваться!");
    }
    if ("token" in responce.payload) {
      window.localStorage.setItem("token", responce.payload.token);
    } else {
      alert("Не удалось авторизоваться!");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register("email", { required: "Укажите почту" })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register("password", { required: "Введите верный пароль" })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
