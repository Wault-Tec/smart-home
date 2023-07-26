<script>
	/**
     * Svelte
     */
	import { getContext } from "svelte";
	import { fade } from "svelte/transition";

	/**
     * getContext
     */
	const showModal = getContext("showModal")

	/**
     * HTMLDialogElement
     */
	let dialog;

	/**
     * Reactive
     */
	$: if (dialog && $showModal) {
		dialog.showModal()
	} else if(dialog && !$showModal) {
		dialog.close()
	}

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => ($showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation transition:fade={{duration: 500}}>
		<slot />
	</div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 90vw;
        width: 90vw;
		border-radius: 0.2em;
		border: none;
		padding: 0;
        border-radius: 10px;

		@media (min-width: 1280px) {
			width: 540px;
		}
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
