<script lang="ts">
  import { onMount } from "svelte";
  import pdmsJSON from "$lib/assets/pdm.json";
  import unidadesJSON from "$lib/assets/unidade.json";
  import classesJSON from "$lib/assets/classe.json";
  import TypeAhead from "$lib/components/type-ahead.svelte";
  import FacetedFilter from "$lib/components/faceted-filter.svelte";
  import { Input } from "$lib/components/ui/input";
  import * as Table from "$lib/components/ui/table";
  import * as Card from "$lib/components/ui/card";
  import { page } from "$app/stores";
  import { throttle } from "$lib/utils";
  import type { PageData } from "../$types";
  import { goto } from "$app/navigation";
  let mounted = false;
  onMount(() => {
    mounted = true;
  });
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
  let codigobr: string = "";
  let id: string = "";
  let pdms: string[] = pdmsJSON || [];
  let classes: string[] = classesJSON || [];
  let unidades: string[] = unidadesJSON || [];

  const parse = (value: string) => {
    const numericPart = value.replace(/\D/g, "");
    const paddedNumber = numericPart.padStart(7, "0").slice(-7);
    return paddedNumber === "0000000" ? "" : "BR" + paddedNumber;
  }; // Remove all non-digit characters

  const onChange = () => {
    codigobr = parse(codigobr);
  };

  function changeUrl(
    c: string,
    u: string,
    cls: string,
    p: string,
    q: string,
    d: string, // in this case, it should take 1
    ds: string[],
    m: boolean
  ) {
    console.log("changeUrl", c, u, cls, p, q, ds, m);
    if (!m) return null;
    if (completed) return null;
    const url = new URL($page.url);
    if (d) {
      url.searchParams.set("descricao", d);
      url.searchParams.set("codigobr", "");
      url.searchParams.set("query", "");
      url.searchParams.set("unidade", "");
      url.searchParams.set("classe", "");
      url.searchParams.set("pdm", "");
    } else {url.searchParams.delete("descricao");}
    if (c && c !== "BR0000000") {
      url.searchParams.set("codigobr", c);
      url.searchParams.set("query", "");
      url.searchParams.set("unidade", "");
      url.searchParams.set("classe", "");
      url.searchParams.set("pdm", "");
    } else {
      url.searchParams.delete("codigobr");
    }
    u ? url.searchParams.set("unidade", u) : url.searchParams.delete("unidade");
    cls
      ? url.searchParams.set("classe", cls)
      : url.searchParams.delete("classe");
    p ? url.searchParams.set("pdm", p) : url.searchParams.delete("pdm");
    q && q.length > 2 && ds.length < 6
      ? url.searchParams.set("query", q)
      : url.searchParams.delete("query"); // Fix the typo here
    goto(url);
  }
  // Map the descriptions

  $: materials = data?.materials;
  $: descricoes = materials?.map((item) => {
    return item.descricao;
  });
  $: totalMatches = parseInt(data?.totalMatches);
  $: completed = (totalMatches < 2);
  $: if (completed){
    descricao = materials[0].descricao;
    unidade = materials[0].unidade;
    classe = materials[0].classe;
    pdm = materials[0].pdm;
  }
  $: if (materials?.length >= totalMatches) {
    console.log("HeyHo", materials);
    unidades = Array.from(
      new Set(
        materials?.map((item) => {
          return item.unidade;
        })
      )
    );
    descricoes = Array.from(
      new Set(
        materials?.map((item) => {
          return item.descricao;
        })
      )
    );
    classes = Array.from(
      new Set(
        materials?.map((item) => {
          return item.classe;
        })
      )
    );
    pdms = Array.from(
      new Set(
        materials?.map((item) => {
          return item.pdm;
        })
      )
    );
  }
  $: if (completed) {
    ({ id, codigobr, descricao, unidade, pdm, classe } = materials[0]);
    goto(`/material/${id}`, {replaceState:true, invalidateAll:false});
  }
  $: throttle(
    changeUrl(codigobr, unidade, classe, pdm, qD, descricao, filteredDescricoes, mounted),
    300
  );
  $: console.log(materials)
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
      <FacetedFilter
      items={classes}
      query={qC}
      bind:value={classe}
      placeholder="Classe do Material"
      title="Classe"
    />
    <FacetedFilter
        items={pdms}
        query={qP}
        bind:value={pdm}
        placeholder="PDM"
        title="Padrão Descritivo do Material"
      />
      <Input
        type="text"
        bind:value={codigobr}
        on:input={onChange}
        class="w-32 font-mono non-italic placeholder:non-italic"
        placeholder="Código Material"
      />
      <TypeAhead
      items={descricoes}
      bind:value={descricao}
      bind:query={qD}
      bind:filtered={filteredDescricoes}
      placeholder="Descrição Material"
      class="z-50 w-1/2"
    />


      <TypeAhead
        items={unidades}
        query={qU}
        bind:value={unidade}
        placeholder="Unidade de Fornecimento"
        class="z-50"
      />



    </div>
    {#if !completed}
      <h4 class="pt-4">
        Há {totalMatches.toLocaleString()} materiais que atendem este filtro.
      </h4>
    {/if}
  </Card.Content>
</Card.Root>
{#if completed}
  <Card.Root class="w-full mt-10">
    <Card.Header>
      <Card.Title tag="h4">Material selecionado:</Card.Title>
    </Card.Header>
    <Card.Content>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell>CodigoBR</Table.Cell>
            <Table.Cell>{codigobr}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Descrição</Table.Cell>
            <Table.Cell>{descricao}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Unidade</Table.Cell>
            <Table.Cell>{unidade}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>PDM</Table.Cell>
            <Table.Cell>{pdm}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Classe</Table.Cell>
            <Table.Cell>{classe}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Card.Content>
  </Card.Root>
{/if}
