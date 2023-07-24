<script>
    /**
	 * Svelte
	 */
    import { goto } from "$app/navigation";
	import { onMount, setContext } from "svelte";
	import { writable } from "svelte/store";

    /**
	 * Store
	 */
    const isAuth = writable(false);

    onMount(() => {
        if(localStorage.getItem("auth") && localStorage.getItem("token")) {
            isAuth.set(true)
        } else {
            isAuth.set(false)
        }

        if(!$isAuth) {
            goto('/login')
        }
    })

    setContext("isAuth", isAuth);
$: console.log('isAuth', $isAuth)
</script>

<slot />