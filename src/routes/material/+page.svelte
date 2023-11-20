<script lang="ts">
	import { onMount } from 'svelte';
  import pdms from "$lib/assets/pdm.json";
  import unidades from "$lib/assets/unidade.json";
  import classes from "$lib/assets/classe.json";
  import TypeAhead from "$lib/components/type-ahead.svelte";
  import FacetedFilter from "$lib/components/faceted-filter.svelte";
  import { Input } from "$lib/components/ui/input";
  import * as Card from "$lib/components/ui/card";
  import { page } from "$app/stores";
  import {  throttle } from "$lib/utils";
  import type { PageData } from "../$types";
  import { goto } from "$app/navigation";
  let mounted = false;
  onMount(()=>{
    mounted = true;
  })
  export let data: PageData;
  let qU: string = "";
  let unidade: string = "";
  let qC: string = "";
  let classe: string = "";
  let qP: string = "";
  let pdm: string = "";
  let qD: string = "";
  let descricao: string = "";
  let filteredDescricoes: string[];

  let codigobr = "";
  const parse = (value:string) => {
    const numericPart = value.replace(/\D/g, "");
    const paddedNumber = numericPart.padStart(6, "0").slice(-6);
    return paddedNumber === "000000" ? "" : "BR" + paddedNumber;
  }; // Remove all non-digit characters

  const onChange = () => {
    codigobr = parse(codigobr);
  };
  const teste = () => {
    console.log(qD)
  }
  function changeUrl(u: string, cls: string, p: string, q:string, ds:string[], m: boolean) {
    if (!m) return null;
    const url = new URL($page.url);
    u
      ? url.searchParams.set("unidade", u)
      : url.searchParams.delete("unidade");
    cls
      ? url.searchParams.set("classe", cls)
      : url.searchParams.delete("classe");
    p
      ? url.searchParams.set("pdm", p)
      : url.searchParams.delete("pdm");
    (q && q.length > 2 && ds.length < 6)
      ? url.searchParams.set("query", q)
      : url.searchParams.delete("query"); // Fix the typo here
    goto(url);
  }

  $: descricoes = data?.descricoes;
  $: console.log(descricoes)
  $: throttle(changeUrl(unidade, classe, pdm, qD, filteredDescricoes, mounted), 300)

</script>

<Card.Root class="w-full">
  <Card.Header>
    <Card.Title tag="h4">Selecionar Material e Unidade</Card.Title>
    <Card.Description
      >Escolha o material que quer comprar e a unidade de fornecimento desejada
      para fazer pesquisa de preços.</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <div class="flex flex-1 items-center space-x-2 align-middle">
      <Input
        type="text"
        bind:value={codigobr}
        on:input={onChange}
        class="w-32 font-mono non-italic placeholder:non-italic"
        placeholder="BR"
      />
      <TypeAhead
        items={descricoes}
        on:input={teste}
        bind:value={descricao}
        bind:query = {qD}
        bind:filtered = {filteredDescricoes}
        placeholder="Descrição"
        class="z-50 w-1/2"
      />
      <TypeAhead
        items={unidades}
        query={qU}
        bind:value={unidade}
        placeholder="Unidade de Fornecimento"
        class="z-50"
      />

      <FacetedFilter
        items={pdms}
        query={qP}
        bind:value={pdm}
        placeholder="PDM"
        title="PDM"
      />
      <FacetedFilter
        items={classes}
        query={qC}
        bind:value={classe}
        placeholder="Classe"
        title="Classe"
      />
    </div>
  </Card.Content>
</Card.Root>

<ul>
  <li>{unidade}</li>
  <li>{codigobr}</li>
  <li>{classe}</li>
  <li>{pdm}</li>
</ul>
