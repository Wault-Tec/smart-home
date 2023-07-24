<script>
    /**
	 * Icons
	 */
	import bundleIcons from '$lib/bundleIcons';

    /**
	 * Props
	 */
    export let svg = "";
    export let name = "";

    /**
     * Body
     */
    const loadIcon = async (name) => {
        if(!name) return;
        const url = bundleIcons?.[name]

        if(url) {
            const res = await fetch(url);
            const text = await res.text();

            if(res.ok) {
                return text;
            } else {
                throw new Error(text);
            }
        }
    }

</script>

{#if svg}
    {@html svg}
{:else if name}
    {#await loadIcon(name) then _svg}
        {#if _svg}
            {@html _svg}
        {:else}
            <div class="redSquare" />
        {/if}
    {/await}
{:else}
    <div class="redSquare" />
{/if}

<style lang="scss">
    .redSquare {
        background: red;
        height: 40px;
        width: 40px;
    }
</style>