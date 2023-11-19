<script lang="ts">
  import {
    Activity,
    CreditCard,
    DollarSign,
    Download,
    Users,
  } from "lucide-svelte";
  // import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  // import * as Select from "$lib/components/ui/select";
  // import { Input } from "$lib/components/ui/input";
  // import { Label } from "$lib/components/ui/label";

  import type { PageData } from "../$types";
  import MaterialTable from "./MaterialTable.svelte";

  // export const data:
  export let data: PageData;
  // $: if (data) {console.log(data.feed)}
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
    {#if data.feed}
      <!-- <MaterialTable rows={data.feed} /> -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card.Root>
          <Card.Header
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </Card.Header>
          <Card.Content>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Header
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
            <Users class="h-4 w-4 text-muted-foreground" />
          </Card.Header>
          <Card.Content>
            <div class="text-2xl font-bold">+2350</div>
            <p class="text-xs text-muted-foreground">+180.1% from last month</p>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Header
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <Card.Title class="text-sm font-medium">Sales</Card.Title>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </Card.Header>
          <Card.Content>
            <div class="text-2xl font-bold">+12,234</div>
            <p class="text-xs text-muted-foreground">+19% from last month</p>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Header
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <Card.Title class="text-sm font-medium">Active Now</Card.Title>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </Card.Header>
          <Card.Content>
            <div class="text-2xl font-bold">+573</div>
            <p class="text-xs text-muted-foreground">+201 since last hour</p>
          </Card.Content>
        </Card.Root>
      </div>
    {/if}
  </Card.Content>
</Card.Root>
