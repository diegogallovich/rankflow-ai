import {
  APPWRITE_JWT_KEY,
  APPWRITE_PROJECT,
  APPWRITE_URL,
} from "@utils/constants";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

export const getSessionClient = async () => {
  const client = new Client()
    .setEndpoint(APPWRITE_URL as string)
    .setProject(APPWRITE_PROJECT as string);

  const session = cookies().get(APPWRITE_JWT_KEY as string);
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setJWT(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
};
