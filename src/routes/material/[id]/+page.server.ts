import db from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";

let id: string = "";
export const load = (async ({ params, url }) => {
   console.log('LOADING ITEMS....')
		// @ts-ignore
		const { id } = params
		const material = await db.material.findFirst({
			where: {
				id: parseInt(id),
			},
		})
  console.log(material)
	return { material }
}) satisfies PageServerLoad;
