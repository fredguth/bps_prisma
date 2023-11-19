import db from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";

export const load = (async ({ params }) => {
  const response = await db.material.findMany({
    where: {
      id: parseInt(params.id),
    },
  });
  console.log(response);
  return { props: response };
}) satisfies PageServerLoad;
