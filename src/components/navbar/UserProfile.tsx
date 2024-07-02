"use client";

import { useUserSession } from "@/hooks/usersession.hooks";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOutUser } from "@/lib/firebase/firebase.auth";

interface UserProfileProps {
  initialUser: any;
}

const UserProfile = ({ initialUser }: UserProfileProps) => {
  const { user } = useUserSession(initialUser);

  const handleSignout = async () => {
    await signOutUser();
    window.location.reload();
  };

  return (
    <div>
      {!user && (
        <Button>
          <Link href={"/auth/signin"}>Sign In</Link>
        </Button>
      )}
      {user && (
        <div className="flex gap-2 items-center">
          <p>{user.displayName}</p>
          <Button onClick={handleSignout}>Sign Out</Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
