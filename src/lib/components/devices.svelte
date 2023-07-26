<script>
    /**
	 * Svelte
	 */
    import { getContext } from "svelte";
    import { createEventDispatcher } from 'svelte';

    /**
	 * Component
	 */
    import Image from "./image.svelte";
    import Icon from "./icon.svelte";

	/**
	 * GetContext
	 */
    const devices = getContext("devices")
    const devicesAll = getContext("devicesAll")
    const unusedDevices = getContext("unusedDevices")
    const activeRoomId = getContext("activeRoomId")
    const rooms = getContext("rooms")
    const checkFavorites = getContext("checkFavorites")
    const favorites = getContext("favorites")

    $: renderArr = $activeRoomId === "all"
    ? [...$unusedDevices, ...$devicesAll]
    : $devices

    const checkRoom = (device) => {
        const filterRooms = $rooms?.filter((el) => device.room_id === el.id)
        if(filterRooms?.length) {
            const names = []
            filterRooms.map((el) => names.push(el?.name))
            return names
        } else return false
    } 

    const dispatch = createEventDispatcher();

</script>

<section class="devices">
    <ul class="devices_list">
        {#each renderArr as device}
            <li class="device">
                <div class="image">
                    <!-- <Image src={"./images/switch.png"}/> -->
                </div>
                <span class="info">
                    <span>
                        {device.name}
                    </span>
                    <button class="info_room">
                        {#if checkRoom(device)}
                            {#each checkRoom(device) as name}
                                {name}
                            {/each}
                        {:else}
                            <div class="info_attach">
                                Неиспользуемый девайс
                                <button 
                                    class="info_attach--button" 
                                    on:click={() => dispatch('attach', {device})}>
                                    Привязать
                                </button>
                            </div>
                        {/if}

                    </button>
                </span>
                <button 
                    class="favorites"
                    class:active={checkFavorites(device) && $favorites}
                    on:click={() => dispatch('favorites', {device})}
                    >
                    <Icon name="heart"/>
                </button>
                <button 
                    class="button_management"
                    on:click={() => dispatch('control', {device})}>
                    Управлять
                </button>
            </li>
        {/each}
    </ul>
</section>

<style lang="scss">
    .devices {
		position: absolute;
		top: 85px;
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
            align-items: center;
	    }

		& .devices_list {
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

			& .device {
                display: flex;
                position: relative;
                width: 90%;
                height: 140px;
                border-radius: 20px;
                background: linear-gradient(90deg, #BDC3C7 0%, #2C3E50 100%);
                box-shadow: 0px 6px 25px 0px #4E5D6C;

                @media (min-width: 1280px) {
                    height: 180px;
	            }

                @media (min-width: 768px) and (max-width: 1279px) {
                    height: 160px;
	            }

                & .button_management {
                    position: absolute;
                    bottom: 15px;
                    left: 15px;

                    width: min-content;
                    margin-left: auto;
                    padding: 5px;
                    border-radius: 7px;
                    border: 1px solid #fff;
                    color: #fff;

                    @media(hover: hover) {
                        &:hover {
                            color: #eee;
                            border: 1px solid #eee;
                        }
                    }

                    @media (min-width: 1280px) {
                       font-size: 18px;
                    }

                    @media (min-width: 768px) and (max-width: 1279px) {
                        font-size: 19px;
                    }
                }

                & .favorites {
                    position: absolute;
                    left: 10px;
                    top: 15px;

                    @media(hover: hover) {
                        &:hover {
                            & svg {
                                & path {
                                    fill: #FE6767;
                                }
                            }
                        }
                    }

                    & svg {
                        width: 40px;
                        height: 40px;
                        
                        & path {
                            transition: all .3s;
                            fill: #fff;
                        }
                    }

                    &.active {
                        & svg {
                        
                            & path {
                                fill: #FE6767;
                            }
                        }
                    }
                }

                & .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    color: #F9F9F9;
                    font-size:17px;
                    font-weight: 500;
                    width: 70%;

                    @media (min-width: 1280px) {
                        width: 50%;
                        font-size:20px;
	                }

                    @media (min-width: 768px) and (max-width: 1279px) {
                        width: 50%;
                        font-size: 19px;
	                }

                    & .info_room {
                        font-weight: 200;
                        font-size:15px;
                        color: #F9F9F9;

                        @media (min-width: 1280px) {
                            font-size:18px;
	                    }

                        @media (min-width: 768px) and (max-width: 1279px) {
                            font-size: 19px;
                        }
                    }

                    & .info_attach {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;

                        & .info_attach--button {
                            width: min-content;
                            margin-left: auto;
                            padding: 5px;
                            border-radius: 7px;
                            border: 1px solid #fff;
                            color: #fff;
                            transition: all .3s;

                            @media(hover: hover) {
                                &:hover {
                                    color: #c4c2c2;
                                    border: 1px solid #c4c2c2;
                                }
                            }
                        }
                    }
                }

                & .image {
                    width: 30%;
                    height: 100%;

                    @media (min-width: 1280px) {
                        width: 50%;
	                }

                    @media (min-width: 768px) and (max-width: 1279px) {
                        width: 50%;
	                }
                }
			}
		}
	}
</style>