import Container from "@/components/Container";
import OwnedMeshi from "@/components/OwnedMeshi";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

export default async function page() {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return <RedirectToSignIn />;
  }

  const ownedMeshis = await fetchQuery(api.query.getMeshiByCreatorId, {
    creatorId: userId,
  });

  return (
    <Container className="grid grid-cols-4 gap-4 pt-4">
      {ownedMeshis.map((ownedMeshi) => (
        <OwnedMeshi key={ownedMeshi._id} ownedMeshi={ownedMeshi} />
      ))}
    </Container>
  );
}
