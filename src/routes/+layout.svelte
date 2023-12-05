<script lang="ts">
	import '../app.postcss'
	import { page } from '$app/stores'
	import img from '$lib/assets/img-logo-MS.png'
	import Header from '$lib/components/header.svelte'
	import Footer from '$lib/components/footer.svelte'
	import UserNav from '$lib/components/user-nav.svelte'
  import { fade } from 'svelte/transition';
	export let data

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? '!bg-primary-500' : ''
	// $: console.log('layout', {data})
	$: pathname = data?.pathname
</script>

<div class="flex flex-col min-h-screen">
	<Header>
		<UserNav slot="user-nav" {pathname}></UserNav>
	</Header>
	<main class="flex-grow mx-auto p-8 container">
		{#key data.pathname}
			<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
				<slot />
			</div>
		{/key}
	</main>
	<Footer />
</div>
