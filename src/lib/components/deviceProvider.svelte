<script>
    /**
	 * Svelte
	 */
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

    /**
	 * Store
	 */
    const devices = writable([]);
    const devicesAll =  writable([]);
    const unusedDevices = writable([]);

    /**
	 * SetContext
	 */
	setContext("devices", devices);
	setContext("devicesAll", devicesAll);
	setContext("unusedDevices", unusedDevices)

</script>

<slot />