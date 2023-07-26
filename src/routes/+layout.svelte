<script>
	/**
	 * Svelte
	 */
	import { setContext } from "svelte";
	import { page } from '$app/stores';
	import { writable } from "svelte/store";
	import { goto } from "$app/navigation";

	/**
	 * Styles
	 */
	import './styles.css';

	/**
	 * Component
	 */
	import Auth from '$lib/components/auth.svelte';
	import FavoritesProvider from '$lib/components/favoritesProvider.svelte';
	import ScriptsProvider from "$lib/components/scriptsProvider.svelte";
	import Footer from '$lib/components/footer.svelte';
	import DeviceProvider from "$lib/components/deviceProvider.svelte";

	/**
	 * Store
	 */
	const showAdd = writable(false)
	const formType = writable("")
	const showModal = writable(false)

	/**
	 * SetContext
	 */
	setContext("showAdd", showAdd)
	setContext("formType", formType)
	setContext("showModal", showModal)

	/**
	 * Url
	 */
	$: url = $page.url;

</script>

<div class="app">
	<Auth>
		<DeviceProvider>
			<FavoritesProvider>
				<ScriptsProvider>
					<main>
						<slot />
						{#if url.pathname !== "/login"}
							<Footer
								on:clickHome={() => goto('/')}
								on:clickFavorites={() => goto('/favorites')}
								on:clickAlert={() => goto('/alerts')}
								on:clickAdd={() => showAdd.set(true)}
								on:clickRoom={() => {
									$formType = "add_room"
									showModal.set(true)
								}}
								on:clickEvents={() => {
									$formType = "add_events"
									showModal.set(true)
							}}/>
						{/if}
					</main>
				</ScriptsProvider>
			</FavoritesProvider>
		</DeviceProvider>
	</Auth>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100svh;
		max-height: 100vh;
		max-height: 100svh;
	}
</style>
