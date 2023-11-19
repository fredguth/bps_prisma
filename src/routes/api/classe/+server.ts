import { json } from "@sveltejs/kit";
import db from "$lib/server/prisma";

export async function GET({ url }) {
  try {
    const limitParam = url.searchParams.get("limit");
    const skipParam = url.searchParams.get("skip");
    const limit = limitParam ? parseInt(limitParam) : undefined; // Default limit
    const skip = skipParam ? parseInt(skipParam) : undefined; // Default skip

    const classes = await db.material.findMany({
      select: {
        classe: true,
      },
      distinct: ["classe"],
      orderBy: {
        classe: "asc",
      },
      take: limit,
      skip: skip,
    });

    // Map the result to an array of strings
    const classesStrings: string[] = classes.map((item) => item.classe);

    return json(classesStrings); // Wrap the array in a Response object
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
