import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return <RedirectToSignIn />;
  }

  return <div className="">Portfolio</div>;
}
