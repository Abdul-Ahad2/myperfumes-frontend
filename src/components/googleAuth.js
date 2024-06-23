import firebase_initialize from "./firebase-config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const signInController = () => {
  const auth = getAuth(firebase_initialize);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userEmail = result.user.email;
      const userName = result.user.displayName;
      const userId = result.user.uid;
      localStorage.setItem("username", userName);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      toast.success(`Signed in as ${userName}`);
      axios.post("http://localhost:8000/api/user/createUser", {
        _id: userId,
        username: userName,
        email: userEmail,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error("Error while signing in.");
    });
};

export const signOutController = () => {
  const auth = getAuth(firebase_initialize);
  signOut(auth)
    .then(() => {
      localStorage.removeItem("username");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      console.log("Sign-out successful");
    })
    .catch((error) => {
      console.error("Error during sign-out:", error);
    });
};
