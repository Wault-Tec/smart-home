<script>
    /**
	 * Svelte
	 */
    import { getContext } from "svelte";

    /**
	 * Utils
	 */
	import { ucFirst } from "$lib/utils";

    /**
	 * GetContext
	 */
    const rooms = getContext("rooms")
    const activeRoomId = getContext("activeRoomId")

</script>
<section class="wrapper">
    <div class="rooms">
        <ul class="list">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span 
                class="room" 
                class:active={$activeRoomId === "all"}
                on:click={() => $activeRoomId = "all"}
            >
                Дом
            </span>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#each $rooms as room}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li 
                    class="room" 
                    class:active={room.id === $activeRoomId}
                    on:click={() => $activeRoomId = room.id}
                >
                    {ucFirst(room?.name)}
                </li>
            {/each}
        </ul>
    </div>
</section>

<style lang="scss">
    .wrapper {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 20px;
        background-attachment: fixed;
        background-color: var(--color-bg-1);
        background-size: 100vw 100vh;
        background-image: radial-gradient(
                50% 50% at 50% 50%,
                rgba(255, 255, 255, 0.75) 0%,
                rgba(255, 255, 255, 0) 100%
            ),
            linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
        z-index: 1;

        @media (min-width: 1280px) {
            padding-top: 0;
	    }

        @media (min-width: 768px) and (max-width: 1279px) {
            padding-top: 0;
	    }

        & .rooms {
            width: 100%;
            display: flex;
            justify-content: center;
            box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);
            background-color: #fff;
            border-radius: 10px;

            @media (min-width: 1280px) {
                border-radius: 0;
	        }

            @media (min-width: 768px) and (max-width: 1279px) {
                border-radius: 0;
	        }

            & .list {
                display: flex;
                width: 100%;
                gap: 28px;
                padding: 20px;
                padding-bottom: 23px;
                overflow-x: auto;

                &::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }

                @media (min-width: 1280px) {
                    justify-content: center;
		            align-items: center;
	            }

                & .room {
                    position: relative;
                    font-size: 18px;
                    transition: all .3s;
                    cursor: pointer;

                    @media(hover: hover) {
                        &:hover {
                            color: #4075a6;
                        }
                    }

                    &::after {
                        content: "";
                        position: absolute;
                        bottom: -7px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 50%;
                        height: 5px;
                        border-radius: 2.5px;
                        background: linear-gradient(90deg, #161A1D 0%, #454849 100%);
                        opacity: 0;
                        transition: opacity .3s ease-in;
                    }

                    &.active {
                        font-weight: 700;

                        &::after {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

</style>