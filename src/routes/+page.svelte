
<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;

    $: user = data.user;

    $:console.log({data, user} )

</script>

<h1> {user?.name}</h1>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>