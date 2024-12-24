import { axiosInstance as axios } from ".";

import { ReqUserLogin, FetchedUserLogin } from "@/types/users";

export async function tryLogin(
  user: ReqUserLogin
): Promise<FetchedUserLogin | undefined> {
  try {
    const response = await axios.post("/login/professor", user);
    return response.data;
  } catch (error) {
    console.log("error in src/api/auth.ts/tryLogin(): ", error);
  }
}
