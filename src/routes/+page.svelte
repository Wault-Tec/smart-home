<script>
// @ts-nocheck

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
	import Modal from "$lib/components/modal.svelte";
	import ModalForm from "$lib/components/modalForm.svelte";
	import Rooms from "$lib/components/rooms.svelte";
	import Devices from "$lib/components/devices.svelte";

	/**
	 * GetContext
	 */
	const isAuth = getContext("isAuth")
	const favorites = getContext("favorites")
	const scripts = getContext("scripts")
	const formType = getContext("formType")
	const showModal = getContext("showModal")
	const devices = getContext("devices");
	const devicesAll =  getContext("devicesAll");
	const unusedDevices = getContext("unusedDevices");

	/**
	 * Store
	 */
	const rooms = writable([]);
	const activeRoomId = writable("all")
	const deviceInfo = writable({})

	/**
	 * SetContext
	 */
	setContext("rooms", rooms);
	setContext("activeRoomId", activeRoomId);
	setContext("deviceInfo", deviceInfo);

	/**
	 * Form Handler
	 */
	const handleSubmit = (e) => {
		const { formType } = e.detail

		switch(formType) {
			case "add_room": 
				addRoom(e.detail.payload)
				break;
			case "attach_device":
				const { roomId, deviceId } = e.detail
				attachDevice(roomId, deviceId)
				break;
			case "control_device":
				controlDevice(e.detail)
				break;
			case "add_events":
				handleAddEvent(e.detail)
				break;
		}
	}
	
	/**
	 * Body
	 */
	let success = false

	const handleAddEvent = (info) => {
		$scripts = [...$scripts, info]
		localStorage.setItem("scripts", JSON.stringify($scripts))
		success = true

		setTimeout(() => {
			$showModal = false
			success = false
		}, 1500)
	}

	const controlDevice = async (info) => {
		const { 
			deviseIsActive, 
			deviceIsWarning, 
			deviceId,
			temperature
		} = info
		try {
			const data = {
				"active": deviseIsActive,
				"temperature": temperature,
				"warning": deviceIsWarning,
				"enabled": true
			}

			const endPoint = `${paths.UPDATE_DEVICE_INFO}/${deviceId}`

			const { data: result } = await api.put(endPoint, data);

			if(result?.success) {
				success = true
				getDevices()
				setTimeout(() => {
					$showModal = false
					success = false
				}, 1500)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getRooms = async () => {
		try {
			const { data: result } = await api.get(paths.GET_ROOMS);
			if (result?.success) $rooms = result.data.filter((el) => el.house_id === houseId) 
		} catch (error) {
			console.log(error)
		}
	}

	const attachDevice = async (roomId, deviceId) => {
		try {
			const endPoint = `${paths.ATTACH_DEVICE}/${deviceId}`
			const data = {
				"house_id": houseId,
				"room_id": roomId
			}

			const { data: result } = await api.put(endPoint, data);

			if(result?.success) {
				success = true
				getDevices()
				setTimeout(() => {
					$showModal = false
					success = false
				}, 1500)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const addRoom = async (name) => {
		const data = {
			"name": name,
			"house_id": houseId
		}

		try {
			const { data: result } = await api.post(paths.ADD_ROOM, data);

			if(result?.success) {
				success = true
				getRooms()
				setTimeout(() => {
					$showModal = false
					success = false
				}, 1500)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getDevices = async () => {
		try {
			const { data: result } = await api.get(paths.GET_DEVICE);
			if (result?.success) {
				$devices = result.data.filter((el) => el.house_id === houseId && el.room_id === $activeRoomId)
				$devicesAll = result.data.filter((el) => el.house_id === houseId)
			}

			const { data: _result } = await api.get(paths.GET_DEVICE_UNUSED);
			if (result?.success) {
				$unusedDevices = _result.data.filter((el) => (el.house_id && el.house_id === houseId) || !el.house_id)
			}
		} catch (error) {
			console.log(error)
		}
	}

	onMount(() => {
		getRooms()
	})

	const handleAttach = (e) => {
		const { device } = e.detail
		$deviceInfo = device
		$formType = "attach_device"
		$showModal = true
	}

	const handleControl = (e) => {
		const { device } = e.detail
		$deviceInfo = device
		$formType = "control_device"
		$showModal = true
	}
	
	const checkFavorites = (device) => $favorites.some((el) => el.id === device.id)
	setContext("checkFavorites", checkFavorites)

	const handleFavorites = (e) => {
		const { device } = e.detail

		if(!checkFavorites(device)) {
			$favorites = [...$favorites, device]
		} else {
			const filtred = $favorites.filter((el) =>  el.id !== device.id)
			$favorites = filtred
		}
		
		localStorage.setItem("favorites", JSON.stringify($favorites))
	}

	/**
     * Reactive
     */
	 $: if($activeRoomId) getDevices()
	
</script>

<svelte:head>
	<title>Smart Home</title>
	<meta name="description" content="Smart Home" />
</svelte:head>

{#if $isAuth}
	<section class="body">
		<Rooms />
		<Devices 
			on:attach={handleAttach}
			on:control={handleControl}
			on:favorites={handleFavorites}/>
		<Modal>
			<ModalForm 
				bind:success
				on:submit={handleSubmit}/>
		</Modal>
	</section>
{/if}

<style>
	.body {
		width: 100%;
		height: 100svh;
		position: relative;
	}

</style>
