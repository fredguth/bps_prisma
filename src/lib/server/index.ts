import { prisma } from "./prisma";

// async function main() {

// }

export const getMaterials = async () => {
  return await prisma.material.findMany({
    where: {
      DISPONIVEL: 1,
    },
  });
};

export const getPDMs = async (query: string) => {
  return await prisma.material.findMany({
    select: {
      PDM: true,
    },
    where: {
      PDM: {
        contains: query.toUpperCase(), // if you need case-insensitive search
      },
    },
    distinct: ["PDM"],
  });
};
