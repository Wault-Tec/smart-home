<script>
    /**
	 * Svelte
	 */
     import { getContext } from "svelte";

    /**
     * GetContext
     */
    const scripts = getContext("scripts")

</script>

<section class="scripts">
    <ul class="scripts_list">
        {#each $scripts as script}
            <li class="script">
                <span>
                    {script.scriptName}
                </span>
            </li>
        {/each}
    </ul>
</section>

<style lang="scss">
    .scripts {
		position: absolute;
		top: 25px;
		left: 50%;
		transform: translateX(-50%);
        width: 100%;
        min-height: 100vh;

        @media (min-width: 1280px) {
		    display: flex;
            justify-content: center;
            align-items: flex-start;
	    }

        @media (min-width: 768px) and (max-width: 1279px) {
            display: flex;
            justify-content: center;
            align-items: flex-start;
	    }
        
		& .scripts_list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            gap: 35px;
            overflow-y: auto;
            padding-bottom: 120px;
            padding-top: 15px;
            
            @media (min-width: 1280px) {
		        max-width: 600px;
	        }

            @media (min-width: 768px) and (max-width: 1279px) {
		        max-width: 600px;
	        }

			& .script {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 90%;
                height: 100px;
                border-radius: 20px;
                background: linear-gradient(90deg, #BDC3C7 0%, #2C3E50 100%);
                box-shadow: 0px 6px 25px 0px #4E5D6C;
                font-size: 20px;
                font-weight: 500;
                color: #fff;
			}
		}
	}

</style>