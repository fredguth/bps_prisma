/** @type {import('./$types').RequestHandler} */
import { json } from "@sveltejs/kit";
import type { Material } from "@prisma/client";
import db from "$lib/server/prisma";

export async function GET({ url }) {
  try {
    const limitParam = url.searchParams.get("limit");
    const skipParam = url.searchParams.get("skip");
    const limit = limitParam ? parseInt(limitParam) : undefined; // Default limit
    const skip = skipParam ? parseInt(skipParam) : undefined; // Default skip

    const unidades: Material[] = await db.material.findMany({
      select: {
        DS_UNIDADE: true,
      },
      distinct: ["DS_UNIDADE"],
      orderBy: {
        DS_UNIDADE: "asc",
      },
      take: limit,
      skip: skip,
    });

    // Map the result to an array of strings
    const unidadesStrings: string[] = unidades.map(
      (item: Material) => item.DS_UNIDADE
    );

    return json(unidadesStrings); // Wrap the array in a Response object
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
