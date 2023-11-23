import type { Material } from '@prisma/client'

export type MaterialState {
	materials: Material[]
	unidades: string[]
	classes: string[]
	pdms: string[]
	totalRows: number
	filters: {
		codigobr: string
		descricao: string
		classe: string
		unidade: string
		pdm: string
		query: string
		skip: number
		take: number
	}
}
