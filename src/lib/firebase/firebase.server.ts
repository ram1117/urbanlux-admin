import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase.config";
import { initializeServerApp } from "firebase/app";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getAuthenticatedAppForUser() {
  const idToken = headers().get("Authorization")?.split("Bearer ")[1];

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {},
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}

export async function redirectToLogin() {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) redirect(`/auth/signin`);
}
