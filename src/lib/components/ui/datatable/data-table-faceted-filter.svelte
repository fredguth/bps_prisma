<script lang="ts">
	import { PlusCircled, Check } from "radix-icons-svelte";
	import * as Command from "../command";
	import * as Popover from "../popover";
	import { Button } from "../button";
	import { cn } from "$lib/utils";
	import Separator from "../separator/separator.svelte";
	import Badge from "../badge/badge.svelte";
	// import { string } from "zod";


	export let filterValues: string[] = [];
	export let title: string;
	type KeyValue = { label: string, value: any };
	export let options: KeyValue[] = [];

	let open = false;

	const handleSelect = (currentValue: string) => {
		if (
			Array.isArray(filterValues) &&
			filterValues.includes(currentValue)
		) {
			filterValues = filterValues.filter((v) => v !== currentValue);
		} else {
			filterValues = [
				...(Array.isArray(filterValues) ? filterValues : []),
				currentValue
			];
		}
	};
</script>

<Popover.Root bind:open positioning={{ placement: "bottom-start" }}>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			size="sm"
			class="h-8 border-dashed"
		>
			<PlusCircled class="mr-2 h-4 w-4" />
			{title}

			{#if filterValues.length > 0}
				<Separator orientation="vertical" class="mx-2 h-4" />
				<Badge
					variant="secondary"
					class="rounded-sm px-1 font-normal lg:hidden"
				>
					{filterValues.length}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if filterValues.length > 2}
						<Badge
							variant="secondary"
							class="rounded-sm px-1 font-normal"
						>
							{filterValues.length} Selected
						</Badge>
					{:else}
						{#each filterValues as option}
							<Badge
								variant="secondary"
								class="rounded-sm px-1 font-normal"
							>
								{option}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>Nenhum resultado.</Command.Empty>
				<Command.Group>
					{#each options as option}
						<Command.Item
							value={option.value}
							onSelect={(currentValue) => {
								handleSelect(currentValue);
							}}
						>
							<div
								class={cn(
									"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
									filterValues.includes(option.value)
										? "bg-primary text-primary-foreground"
										: "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check className={cn("h-4 w-4")} />
							</div>
							<span>
								{option.label}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>
				{#if filterValues.length > 0}
					<Command.Separator />
					<Command.Item
						class="justify-center text-center"
						onSelect={() => {
							filterValues = [];
						}}
					>
						Limpar Filtros
					</Command.Item>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
