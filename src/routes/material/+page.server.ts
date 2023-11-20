import db from "$lib/server/prisma";
/** @type {import('./$types').PageServerLoad} */

export const load = async ({ url }) => {
  console.log("LOADING MATERIALS....");
  const limitParam = url.searchParams.get("limit");
  const skipParam = url.searchParams.get("skip");
  const query = url.searchParams.get("q");
  const unidade = url.searchParams.get("unidade");
  const pdm = url.searchParams.get("pdm");
  const classe = url.searchParams.get("classe");
  const limit = limitParam ? parseInt(limitParam) : 8; // Default limit
  const skip = skipParam ? parseInt(skipParam) : 0; // Default skip

  console.log({ query, unidade, classe, pdm, limit, skip });
  // Construct the where clause dynamically based on provided query parameters
  const whereClause = {
    disponivel: 1,
    ...(query && { descricao: { contains: query, mode: "insensitive" } }),
    ...(unidade && { unidade: { equals: unidade } }),
    ...(pdm && { pdm: { equals: pdm } }),
    ...(classe && { classe: { equals: classe } }),
  };

  const response = await db.material.findMany({
    select: {
      descricao: true,
    },
    where: whereClause,
    skip: skip,
    take: limit,
  });

  const descricoes = response.map((item) => {
    return item.descricao;
  });

  console.log(descricoes);
  return {
    descricoes,
  };
};
