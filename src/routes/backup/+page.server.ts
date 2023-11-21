import db from "$lib/server/prisma";
/** @type {import('./$types').PageServerLoad} */

export const load = async ({ url }) => {
  console.log("LOADING MATERIALS....");
  const takes = 50;
  const limitParam = url.searchParams.get("limit");
  const skipParam = url.searchParams.get("skip");
  const query = url.searchParams.get("q");
  const unidade = url.searchParams.get("unidade");
  const pdm = url.searchParams.get("pdm");
  const classe = url.searchParams.get("classe");
  const codigobr = url.searchParams.get("codigobr");
  const descricao = url.searchParams.get("descricao");
  const limit = codigobr ? 1 : limitParam ? parseInt(limitParam) : takes; // Default limit
  const skip = skipParam ? parseInt(skipParam) : 0; // Default skip

  console.log({
    descricao,
    codigobr,
    query,
    unidade,
    classe,
    pdm,
    limit,
    skip,
  });
  // Construct the where clause dynamically based on provided query parameters
  const whereClause = {
    disponivel: 1,
    ...(query && { descricao: { contains: query, mode: "insensitive" } }),
    ...(unidade && { unidade: { equals: unidade } }),
    ...(pdm && { pdm: { equals: pdm } }),
    ...(classe && { classe: { equals: classe } }),
    ...(codigobr && { codigobr: { equals: codigobr } }),
    ...(descricao && { descricao: { equals: descricao } }),
  };

  // Perform the query with pagination
  const materials = db.material.findMany({
    select: {
      id: true,
      codigobr: true,
      descricao: true,
      unidade: true,
      pdm: true,
      classe: true,
    },
    where: whereClause,
    skip: skip,
    take: limit,
  });

  // Perform the count query to get the total number of rows without limit
  const totalMatches = await db.material.count({
    where: whereClause,
  });

  return { materials, totalMatches };
  // if (!limitParam && !skipParam) {
  //   const lazy = db.material.findMany({
  //     select: {
  //       id: true,
  //       codigobr: true,
  //       descricao: true,
  //       unidade: true,
  //       pdm: true,
  //       classe: true,
  //     },
  //     where: whereClause,
  //     skip: takes,

  //   });
  //   return {
  //     materials,
  //     lazy,
  //   };
  // } else
  //   return {
  //     materials,
  //   };
};
