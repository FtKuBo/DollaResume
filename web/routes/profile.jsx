import { SignedInOrRedirect } from "@gadgetinc/react";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile() {
  return (
    <SignedInOrRedirect>
      <ProfileContent />
    </SignedInOrRedirect>
  );
}