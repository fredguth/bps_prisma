import db from '$lib/server/prisma'
import type { PrismaPromise } from '@prisma/client'
import type { PageServerLoad } from '../$types'
import type { ItensCompra } from '@prisma/client'

let id: string = ''
export const load = (async ({ params, url }) => {
	// @ts-ignore
	const { id } = params
	console.log('LOADING ITEMS....', id)
	const skip = parseInt(url.searchParams.get('skip') || '0')
	const material = await db.material.findFirst({
		where: {
			id: parseInt(id),
		},
	})

	const totalRows: PrismaPromise<number> = db.itensCompra.count({
		where: {
			material_id: parseInt(id),
		},
	})

	const precos = db.itensCompra
		.findMany({
			select: {
				unitario: true,
			},
			where: {
				material_id: parseInt(id),
			},
			orderBy: {
				unitario: 'desc',
			},
		})
		.then((items) => items.map((item) => item.unitario))

	const itens = await db.itensCompra.findMany({
		select: {
			data: true,
			instituicao: true,
			municipio: true,
			uf: true,
			modalidade: true,
			tipo: true,
			fornecedor: true,
			fabricante: true,
			anvisa: true,
			qtde: true,
			unitario: true,
		},
		where: {
			material_id: parseInt(id),
		},
		orderBy: {
			data: 'desc',
		},
		skip,
		take: 100,
	})
	// console.log({ itens, totalRows, material })
	return { itens, material, totalRows, precos, take: 100 }
}) satisfies PageServerLoad
