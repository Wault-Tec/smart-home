<script>
    /**
     * Svelte
     */
     import { createEventDispatcher } from 'svelte';

    /**
	 * Components
	 */
    import Icon from "./icon.svelte";

    const dispatch = createEventDispatcher();

    export let name
    export let menu = false
    export let back = false
    export let active = false
</script>

<button 
    on:click={() => dispatch('click')} 
    class:active
    class:home={name === "home"}
    class:favorites={name === "favorites"}
    class:alert={name === "alert"}
    class="button"
    class:menu
    class:back
>
    <Icon name={name}/>
    <slot />
</button>

<style lang="scss">

    .button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
        font-size: 14px;

        & svg {
            & path {
                transition: all .3s;
            }
        }

        &.active {

            &.favorites {
                & svg {
                    & path {
                        fill: red;
                        stroke: red;
                    }
                }
            }

            &.home {
                & svg {
                    & path {
                        fill: #000;
                        stroke: #000;
                    }
                }
            }

            &.alert {
                & svg {
                    & path {
                        stroke: red;
                    }
                }
            }
        }

        &.menu {
            font-size: 16px;
            border-radius: 15px;
            padding: 10px 15px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);

            @media (min-width: 1280px) {
                padding: 10px 5px;
            }
        }

        &.back {
            & svg {
                transform: rotate(180deg);

                @media (min-width: 1280px) {
                    transform: rotate(270deg);
                }
                & path {
                    stroke: #000;
                }
            }
        }
    }
    
</style>