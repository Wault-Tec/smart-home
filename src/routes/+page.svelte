<script>
	/**
	 * Svelte
	 */
	import { setContext, getContext, onMount } from "svelte";
	import { writable } from "svelte/store";

	/**
     * Endpoints
     */
	import paths from "$lib/api/endpoints";

	import api from "$lib/api/api";
	import { houseId } from "$lib/api/endpoints";

	/**
	 * Components
	 */
	import Footer from "$lib/components/footer.svelte";
	import Modal from "$lib/components/modal.svelte";
	import RoomForm from "$lib/components/roomForm.svelte";

	/**
	 * GetContext
	 */
	const isAuth = getContext("isAuth")

	const error = writable("")
	const rooms = writable([]);
	setContext("rooms", rooms);

	let showModal = false;

	const handleSubmit = (e) => {
		const room = e.detail.payload
		addRoom(room)
	}

	const getRooms = async () => {
		const { data: result } = await api.get(paths.GET_ROOMS);

		if (result?.success) $rooms = result.data 
	}

	const addRoom = async (name) => {
		const data = {
			"name": name,
			"house_id": houseId
		}

		const { data: result } = await api.post(paths.ADD_ROOM, data);

		console.log('result', result)


		// const token = localStorage.getItem('token');
		// const data = {
		// 	"name": name,
		// 	"house_id": 4
		// }
		// const params = {
		// 	method: "POST",
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${token}`
		// 	}
		// }

		// try {
		// 	const response = await fetch(paths.ADD_ROOM, params);
		// 	const json = await response.json();
			
		// 	if (json.success) {
		// 		console.log('ss', json)
		// 	} else {
		// 		$error =  json.message
		// 		console.log($error)
		// 	}

        // } catch (e) {
        //     console.log(e)
        // } 
	}

	onMount(() => {

		
		getRooms()
	})
$: console.log('rooms', $rooms)
</script>

<svelte:head>
	<title>Smart Home</title>
	<meta name="description" content="Smart Home" />
</svelte:head>

{#if $isAuth}
	<section class="body">
		<div class="rooms">
			<ul class="list">
				{#each $rooms as room}
				<li class="room">
					{room?.name}
				</li>
				{/each}
			</ul>
		</div>

		<button on:click={() => showModal = true}>
			ss
		</button>
		<Modal bind:showModal>
			<RoomForm on:submit={handleSubmit}/>
		</Modal>
		<Footer />
	</section>
{/if}

<style>
	.body {
		width: 100%;
		height: 100vh;
		position: relative;
		
		& .rooms {
			& .list {
				display: flex;
				gap: 25px;
				& .room {

				}
			}
		}
	}

</style>
