"use server";

import { cookies } from "next/headers";

export type AuthCookie = {
  token: string;
  username: string;
  id_perumahan: string;
  id_warga: string;
  biaya_ipl: string;
  role: string;
};

export const createAuthCookie = async (authCookie: AuthCookie) => {
  const cookieStore = cookies();

  cookieStore.set("token", authCookie.token, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 1000),
    maxAge: 60 * 60,
  });
  cookieStore.set("nama", authCookie.username, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  cookieStore.set("id_perumahan", authCookie.id_perumahan, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  cookieStore.set("id_warga", authCookie.id_warga, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  cookieStore.set("biaya_ipl", authCookie.biaya_ipl, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  cookieStore.set("userAuth", authCookie.token, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  cookieStore.set("role", authCookie.role, {
    secure: true,
    //httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
};

export const deleteAuthCookie = async () => {
  cookies().delete("token");
  cookies().delete("userAuth");
  cookies().delete("nama");
  cookies().delete("id_perumahan");
  cookies().delete("id_warga");
  cookies().delete("biaya_ipl");
  cookies().delete("role");
};
