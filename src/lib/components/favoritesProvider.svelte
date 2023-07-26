<script>
    /**
	 * Svelte
	 */
	import { onMount, setContext } from "svelte";
	import { writable } from "svelte/store";

    /**
	 * Store
	 */
    const favorites = writable([]);
    
    onMount(() => {
       const localFavorites = JSON.parse(localStorage.getItem("favorites"));
       if(localFavorites.length) {
        $favorites = localFavorites
       }
    })
    setContext("favorites", favorites);

</script>

<slot />