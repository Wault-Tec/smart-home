<script>
	import './styles.css';
	import Auth from '$lib/components/auth.svelte';
</script>

<div class="app">
	<Auth>
		<main>
			<slot />
		</main>
	</Auth>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
