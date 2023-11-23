import { page } from "$app/stores";
import { goto } from "$app/navigation";
export async function changeUrl(
  skip: number,
  take: number,
  codigobr: string, // filter
  unidade: string, // filter
  classe: string, // filter
  pdm: string, // filter
  descricao: string, //filter
  query: string, // query by descricao
  materialSelected: boolean,
) {
  console.log('changeUrl', c, u, cls, p, q)
  if (!mounted) return null
  if (completed) return null
  const url = new URL(page.url)
  if (d) {
    url.searchParams.set('descricao', d)
    url.searchParams.set('codigobr', '')
    url.searchParams.set('query', '')
    url.searchParams.set('unidade', '')
    url.searchParams.set('classe', '')
    url.searchParams.set('pdm', '')
  } else {
    url.searchParams.delete('descricao')
  }
  if (c) {
    url.searchParams.set('codigobr', c)
    url.searchParams.set('query', '')
    url.searchParams.set('unidade', '')
    url.searchParams.set('classe', '')
    url.searchParams.set('pdm', '')
  } else {
    url.searchParams.delete('codigobr')
  }
  u ? url.searchParams.set('unidade', u) : url.searchParams.delete('unidade')
  cls ? url.searchParams.set('classe', cls) : url.searchParams.delete('classe')
  p ? url.searchParams.set('pdm', p) : url.searchParams.delete('pdm')
  q && q.length > 2
    ? url.searchParams.set('query', q)
    : url.searchParams.delete('query') // Fix the typo here
  goto(url)
}
