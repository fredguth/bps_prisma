import db from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";

export const load = (async ({ params }) => {
  const { id } = params;
  const response = await db.material.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  console.log(response);
  return { material: response };
}) satisfies PageServerLoad;
