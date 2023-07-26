<script>
    /**
	 * Svelte
	 */
	import { onMount, setContext , getContext} from "svelte";
	import { writable } from "svelte/store";

    /**
	 * Store
	 */
    const scripts = writable([]);

    /**
	 * GetContext
	 */
    const devicesAll =  getContext("devicesAll");
	const unusedDevices = getContext("unusedDevices");
    
    onMount(() => {
       const localSripts = JSON.parse(localStorage.getItem("scripts"));
       if(localSripts?.length) {
            $scripts = localSripts
       }
    })

    /**
	 * SetContext
	 */
    setContext("scripts", scripts);

    /**
	 * Reactive
	 */
    $: allDevices = [...$unusedDevices, ...$devicesAll]

    let alerts = []
    $: $scripts.forEach((script) => {
        allDevices.find((device) => {
            if(
                device.id === script.selectedDeviceId &&
                !!device.active === !!script.selectedParamAcive &&
                script.selectedParam === "active"
            ) {
                
                if(!alerts.some((el) => el.id === device.id)) {
                    alerts = [...alerts, {
                        id: device.id,
                        text: `Событие: ${device.name} ${script.scriptName}`
                    }]
                }
                return true
            } else if (
                device.id === script.selectedDeviceId &&
                script.selectedParam === "temperature" &&
                (
                    script.selectedParamCondition === "more" && 
                    script.selectedParamTemp < device?.temperature
                ) ||
                (
                    script.selectedParamCondition === "less" && 
                    script.selectedParamTemp > device?.temperature
                )
            ) {
                let description
                if(script.selectedParamCondition === "more") {
                    description = "Превышение температуры"
                } else if(script.selectedParamCondition === "less") {
                    description = "Недостаточная температура"
                }
                
                if(!alerts.some((el) => el.id === device.id)) {
                    alerts = [...alerts, {
                        id: device.id,
                        text: `Событие: ${device.name} ${description}`
                    }]
                }
                return true
            } else if(
                device.id === script.selectedDeviceId &&
                script.selectedParam === "warning" &&
                !!device.warning === !!script.selectedParamWarning
            ) {
                if(!alerts.some((el) => el.id === device.id)) {
                    alerts = [...alerts, {
                        id: device.id,
                        text: `Событие: ${device.name} ${script.scriptName}`
                    }]
                }
                return true
            }
        })
    })

    $: if(alerts.length) {
        alerts.map((el) => {
            alert(el.text)
        })
    }

</script>

<slot />