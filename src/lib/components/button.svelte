<script>
    /**
     * Svelte
     */
    import { createEventDispatcher } from 'svelte';

    /**
     * Components
     */
    import Icon from "./icon.svelte";

    /**
     * Props
     */
    export let arrow = ""
    export let type = "button"
    export let disabled = false

    const dispatch = createEventDispatcher();

</script>

<button 
    type={type} 
    class="button" 
    class:disabled
    on:click={() => dispatch('click')}
>
    <slot/>
    {#if arrow}
        <div 
            class:icon-right={arrow === "right"}
            class:icon-left={arrow === "left"}
        >
            <Icon name="arrow_right" />
        </div>
    {/if}
</button>


<style lang="scss">
    .button {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        background: linear-gradient(90deg, rgba(23,241,213,1) 0%, rgba(80,173,196,1) 35%);
        font-size: 20px;
        color: #fff;
        position: relative;
        transition: all .5s;

        &.disabled {
           pointer-events: none;
           opacity: 0.5;
           background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(59,71,74,0.8463760504201681) 64%);
        }

        & .icon-right {
            position: absolute;
            top: 28px;
            transform: translateY(-50%);
            right: 30px;
        }

        & .icon-left {
            position: absolute;
            top: 28px;
            transform: translateY(-50%);
            left: 30px;

            & svg {
                transform: rotate(180deg);
            }
        }
    }

</style>