"use client";

import { AuthCookie, createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { BASE_URL, Login as LoginAPI } from "@/constants/constants";
import { LoginFormType } from "@/helpers/types";
import api from "@/services/services";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/react";

export const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginErrorMessage, setIsLoginErrorMessage] = useState("");

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      setLoading(true);
      try {
        const res = await api.post(LoginAPI, {
          no_hp: String(values.noHp),
          password: values.password,
          fcm_token: "",
        });

        if (!res.data) {
          throw res;
        }

        const authCookie: AuthCookie = {
          token: res.data?.accessToken,
          nama: res.data?.nama,
          id_perumahan: res.data?.id_perumahan,
          id_warga: res.data?.id_warga,
          biaya_ipl: res.data?.biaya_ipl,
          role: res.data?.role
        };

        await createAuthCookie(authCookie);
        router.replace("/home");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsLoginError(true);
          setIsLoginErrorMessage(
            error.response?.data?.message ?? "Login Failed, Please Try Again"
          );
        } else {
          setIsLoginError(true);
          setIsLoginErrorMessage("Login Failed, Please Try Again");
        }
      } finally {
        setTimeout(() => {
          setIsLoginError(false);
          setIsLoginErrorMessage("");
        }, 2500);
        setLoading(false);
      }
    },
    [router]
  );

  const renderError = (title: string) => {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full">
        <div className="flex flex-col w-full p-4">
          <div key="danger" className="w-full flex items-center my-3">
            <Alert color={"danger"} title={title} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoginError && renderError(isLoginErrorMessage)}
      <div className="text-center text-[25px] font-bold mb-6">
        Login <br /> <span className="text-primary">KitaWarga</span>
      </div>

      <Formik
        initialValues={{ noHp: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="No Hp"
                type="text"
                value={values.noHp}
                isInvalid={!!errors.noHp && !!touched.noHp}
                errorMessage={errors.noHp}
                onChange={handleChange("noHp")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              {loading ? <Spinner size="sm" color="primary" /> : "Login"}
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Belum Punya Akun ?{" "}
        <Link
          href="https://kitawarga.com/register"
          target="_blank"
          className="font-bold"
        >
          Registrasi disini
        </Link>
      </div>
    </>
  );
};
