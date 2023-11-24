import db from '$lib/server/prisma'
import type { PageServerLoad } from '../$types'

let id: string = ''
export const load = (async ({ params, url }) => {
	console.log('LOADING ITEMS....')
	// @ts-ignore
	const { id } = params
	const skip = parseInt(url.searchParams.get('skip') || '0')
	const material = await db.material.findFirst({
		where: {
			id: parseInt(id),
		},
	})
	const totalRows: PrismaPromise<number> = db.itensCompra.count({})

	const itens = await db.itensCompra.findMany({
		select: {
			data: true,
			anvisa: true,
			fabricante: true,
			fornecedor: true,
			qtde: true,
			valor_unitario: true,
		},
		orderBy: {
			data: 'desc',
		},
		skip,
		take: 20,
	})
	// console.log({ itens, totalRows, material })
	return { itens, material, totalRows, take: 20 }
}) satisfies PageServerLoad
