<script lang="ts">
  import { PlusCircled, Check } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input} from "$lib/components/ui/input";
  import { select} from "$lib/components/ui/input";
  import { cn } from "$lib/utils";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";

  export let loading: boolean;
  export let title: string;
  export let options: string[] = [];
  export let filterValues: string[] = [];

  let open = true;
  // export let filterValues: string[] = [];

  const handleSelect = (currentValue: string) => {
    // if (
    // 	Array.isArray(filterValues) &&
    // 	filterValues.includes(currentValue)
    // ) {
    // 	filterValues = filterValues.filter((v) => v !== currentValue);
    // } else {
    // 	filterValues = [
    // 		...(Array.isArray(filterValues) ? filterValues : []),
    // 		currentValue
    // 	];
    // }
    filterValues = [currentValue];
  };
</script>

<div class="w-[300px]">
  <div
    data-cmdk-item=""
    data-value="LÂMINA"
    role="option"
    id="VQj3fd2DsE"
    class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    aria-selected="true"
    data-selected="true"
  >
    <span>LÂMINA</span>
  </div>
  <div class="w-[300px]">
    <div
      data-cmdk-item=""
      data-value="LÂMINA"
      role="option"
      id="VQj3fd2DsE"
      class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      aria-selected="true"
      data-selected="false"
    >
      <span>BLOB</span>
    </div>
  <!-- <Command.Root>
			<Command.Input placeholder={title} />

			<Command.List>
                {#if loading}
                <Command.Loading>Buscando {title}...</Command.Loading>
                {/if}
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						<Command.Item
							value={option}
							onSelect={(currentValue) => {
								handleSelect(currentValue);
							}}
						>
							<span>
								{option}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>

			</Command.List>
		</Command.Root> -->
</div>
