<script>
    /**
     * Svelte
     */
    import { createEventDispatcher, getContext } from 'svelte';
    import { page } from '$app/stores';

    /**
	 * Transition
	 */
    import { fly } from "svelte/transition";

    /**
	 * GetContext
	 */
    const showAdd = getContext("showAdd")

    /**
	 * Components
	 */
    import FooterButton from "./footerButton.svelte";

    /**
	 * Url
	 */
	$: url = $page.url;

    /**
	 * Dispatch
	 */
    const dispatch = createEventDispatcher();

</script>
<div 
    class="footer"
    class:top={url.pathname === "/"}
>
    <div class="buttons">
        {#if !$showAdd}
            <FooterButton 
                name="add_circle" 
                on:click={() => dispatch('clickAdd')}/>
            <FooterButton 
                active={url.pathname === "/"}
                name="home" 
                on:click={() => dispatch('clickHome')}/>
            <FooterButton
                active={url.pathname === "/favorites"}
                name="favorites" 
                on:click={() => dispatch('clickFavorites')}/>
            <FooterButton
                active={url.pathname === "/alerts"}
                name="alert" 
                on:click={() => dispatch('clickAlert')}/>
        {:else}
            <div 
                class="add_menu" 
                in:fly={{ x: -300, duration: 400 }}
            >
                <div class="add_menu--back">
                    <FooterButton 
                        back 
                        name="arrow_right" 
                        on:click={() => $showAdd = false}/>
                </div>
                <div class="add_menu--buttons">
                    <FooterButton 
                        menu 
                        name="add_room" 
                        on:click={() => dispatch('clickRoom')}>
                        Комната
                    </FooterButton>
                    <!-- <FooterButton menu name="add_device">
                        Девайс
                    </FooterButton> -->
                    <FooterButton 
                        menu 
                        name="add_event"
                        on:click={() => dispatch('clickEvents')}>
                        Сценарий
                    </FooterButton>
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .footer {
        display: flex;
        width: 100%;
        height: 83px;
        position: relative;
        position: fixed;
        bottom: 0;
        background: #F7F7F7;
        border-radius: 30px 30px 0 0;
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);

        &.top {
            @media (min-width: 1280px) {
                top: 65px;
                border-radius: 0 0 30px 30px;
            }
        }

        @media (min-width: 1280px) {
            right: 0;
            top: 0;
            bottom: unset;
            height: fit-content;
            width: 100px;
            border-radius: 30px 30px 30px 30px;
            padding-top: 20px;
            padding-bottom: 20px;
            background: #fff;
            box-shadow: none;
            z-index: 1;
        }

        @media (min-width: 768px) and (max-width: 1279px) {
            height: 90px;
        }

        & .buttons {
            display: flex;
            width: fit-content;
            margin: auto;
            gap: 50px;

            @media (min-width: 768px) and (max-width: 1279px) {
                gap: 100px;
            }

            @media (min-width: 1280px) {
                flex-direction: column;
                height: fit-content;
            }

            & svg {
                width: 36px;
                height: 36px;

                @media (min-width: 768px) and (max-width: 1279px) {
                    width: 46px;
                    height: 46px;
                }
            }
        }

        & .add_menu {
            position: relative;
            width: 100vw;
            display: flex;
            justify-content: center;
            padding: 0 10px;

            @media (min-width: 1280px) {
                flex-direction: column;
                height: fit-content;
                width: 100%;
            }
            & svg {
                width: 25px;
                height: 25px;
            }

            & .add_menu--buttons {
                display: flex;
                gap: 20px;

                @media (min-width: 1280px) {
                    flex-direction: column;
                }
            }

            & .add_menu--back {
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);

                @media (min-width: 1280px) {
                    top: -40px;
                    left: 45%;
                    transform: translateX(-50%);
                }
            }
        }
    }

</style>