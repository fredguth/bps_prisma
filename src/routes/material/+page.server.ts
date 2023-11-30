import db from "$lib/server/prisma";
/** @type {import('./$types').PageServerLoad} */
import type { Material, PrismaPromise } from "@prisma/client";

export const load = async ({ url }) => {
	console.log('LOADING MATERIALS....')

	const limitParam = url.searchParams.get('limit')
	const skipParam = url.searchParams.get('skip')
	const query = url.searchParams.get('q')?.toUpperCase()
	const unidade = url.searchParams.get('unidade')?.toUpperCase()
	const pdm = url.searchParams.get('pdm')?.toUpperCase()
	const classe = url.searchParams.get('classe')?.toUpperCase()
	const codigobr = url.searchParams.get('codigobr')?.toUpperCase()
	const descricao = url.searchParams.get('descricao')?.toUpperCase()
	const limit = codigobr ? 1 : limitParam ? parseInt(limitParam) : 100 // Default limit
	const skip = skipParam ? parseInt(skipParam) : 0 // Default skip

	console.log({
		descricao,
		codigobr,
		query,
		unidade,
		classe,
		pdm,
		limit,
		skip,
	})
	// Construct the where clause dynamically based on provided query parameters

	const whereClause = {
		disponivel: 1,
		...(query && { descricao: { contains: query } }),
		...(unidade && { unidade: { equals: unidade } }),
		...(pdm && { pdm: { equals: pdm } }),
		...(classe && { classe: { equals: classe } }),
		...(codigobr && { codigobr: { equals: codigobr } }),
		...(descricao && { descricao: { equals: descricao } }),
	}

	// Perform the query with pagination
	const materials: PrismaPromise<Material[]> = db.material.findMany({
		where: whereClause,
		skip: skip,
		take: limit,
	})

	// Perform the count query to get the total number of rows without limit
	const totalRows: PrismaPromise<number> = db.material.count({
		where: whereClause,
	})

	const unidades: Promise<string[]> = db.material
		.findMany({
			select: { unidade: true },
			distinct: ['unidade'],
			where: whereClause,
			take: 1000,
		})
		.then((materials) => materials.map((material) => material.unidade))

	const classes: Promise<string[]> = db.material
		.findMany({
			select: { classe: true },
			distinct: ['classe'],
			where: whereClause,
			take: 1000,
		})
		.then((materials) => materials.map((material) => material.classe))
	const pdms: Promise<string[]> = db.material
		.findMany({
			select: { pdm: true },
			distinct: ['pdm'],
			where: whereClause,
			take: 1000,
		})
		.then((materials) => materials.map((material) => material.pdm))

	const returning = {
		materials,
		unidades,
		classes,
		pdms,
		totalRows,
		filters: {
			codigobr,
			descricao,
			classe,
			unidade,
			pdm,
			query,
			skip,
			take: limit,
		},
	}
	console.log('Loading:', returning)
	return returning
};
