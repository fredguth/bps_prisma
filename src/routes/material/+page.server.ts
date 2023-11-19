import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";

export const load = (async ({ params, url }) => {
  const response = await prisma.material.findMany({
    where: { DISPONIVEL: 1 },
    skip: 0,
    take: 3,
  });
  return { feed: response };
}) satisfies PageServerLoad;
