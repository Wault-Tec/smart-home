<script>
    /**
	 * Svelte
	 */
    import { getContext } from "svelte";

    /**
	 * GetContext
	 */
    const favorites = getContext("favorites")
    const rooms = getContext("rooms")

    const checkRoom = (device) => {
        const filterRooms = $rooms?.filter((el) => device.room_id === el.id)
        if(filterRooms?.length) {
            const names = []
            filterRooms.map((el) => names.push(el?.name))
            return names
        } else return false
    } 

</script>

<section class="devices">
    <ul class="devices_list">
        {#each $favorites as device}
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
                            </div>
                        {/if}

                    </button>
                </span>
            </li>
        {/each}
    </ul>
</section>

<style lang="scss">
    .devices {
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

                & .favorites {
                    position: absolute;
                    left: 10px;
                    top: 15px;

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

                    & .info_room {
                        font-weight: 200;
                        font-size:15px;
                        color: #F9F9F9;
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
                        }
                    }
                }

                & .image {
                    width: 30%;
                    height: 100%;
                }
			}
		}
	}
</style>