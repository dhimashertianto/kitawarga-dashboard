"use server";

import { cookies } from "next/headers";

export type AuthCookie = {
  token: string;
  nama: string;
  id_perumahan: string;
  id_warga: string;
  biaya_ipl: string;
};

export const createAuthCookie = async (authCookie: AuthCookie) => {
  cookies().set("token", authCookie.token, { secure: true });
  cookies().set("nama", authCookie.nama, { secure: true });
  cookies().set("id_perumahan", authCookie.id_perumahan, { secure: true });
  cookies().set("id_warga", authCookie.id_warga, { secure: true });
  cookies().set("biaya_ipl", authCookie.biaya_ipl, { secure: true });
  cookies().set("userAuth", authCookie.token, { secure: true });
};

export const deleteAuthCookie = async () => {
  cookies().delete("token");
  cookies().delete("userAuth");
  cookies().delete("nama");
  cookies().delete("id_perumahan");
  cookies().delete("id_warga");
  cookies().delete("biaya_ipl");
};
