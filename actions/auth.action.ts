"use server";

import { AuthCookie } from "@/action/auth.action";
import { cookies } from "next/headers";

export const createAuthCookie = async () => {
  cookies().set("userAuth", "myToken", { secure: true });
};

export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};
