<script>
    /**
     * Svelte
     */
    import { createEventDispatcher, getContext } from 'svelte';

    /**
     * Svelte-form
     */
    import {form, field} from "svelte-forms";
    import {required, pattern, min} from "svelte-forms/validators";

    /**
     * Components
     */
    import Button from "./button.svelte";
    import Switch from './switch.svelte';
    import { writable } from 'svelte/store';

    /**
     * Mock
     */
    import { defaultParams } from '$lib/utils';

    /**
     * Props
     */
    export let success = false

    /**
     * GetContext
     */
    const rooms = getContext("rooms")
    const formType = getContext("formType")
    const devicesAll = getContext("devicesAll")
    const unusedDevices = getContext("unusedDevices")
    const deviceInfo = getContext("deviceInfo")

    /**
     * Store
     */
    const deviseIsActive = writable(null)
    const deviceIsWarning = writable(null)

    /**
     * Form Fields
     */
    const name = field("name", "", [
        required(),
        min(1),
        pattern(
            /^(?![\d]+$)[а-яА-ЯёЁa-zA-Z0-9]*$/
        ),
    ]);

    const scriptName = field("scriptName", "", [
        required(),
        min(1),
        pattern(
            /^(?![\d]+$)[а-яА-ЯёЁa-zA-Z0-9]*$/
        ),
    ]);
    
    const roomId = field("roomId", "")
    const selectedDeviceId = field("selectedDeviceId", "")
    const selectedParam = field("selectedParam", "")
    const selectedParamAcive = field("selectedParamValue", "")
    const selectedParamWarning = field("selectedParamWarning", "")
    const selectedParamAction = field("selectedParamAction", "")
    const selectedParamTemp =  field("selectedParamTemp", "")
    const selectedParamCondition = field("selectedParamCondition", "")
    const temperature = field("temperature", $deviceInfo?.temperature || null)
    
    /**
     * Form
     */
    const myForm = form(
        name, 
        roomId,
        temperature, 
        selectedDeviceId, 
        selectedParam, 
        selectedParamAcive,
        selectedParamCondition,
        selectedParamTemp,
        selectedParamWarning,
        selectedParamAction
    );

    name.validate();

    const dispatch = createEventDispatcher();

    /**
     * Reactive
     */
    $: isValidForm = $myForm.valid;
    $: if($roomId.value) success = false

    $: if($deviceInfo?.active) {
        deviseIsActive.set(true)
    } else {
        deviseIsActive.set(false)
    }

    $: if($deviceInfo?.warning === 0) {
        deviceIsWarning.set(false)
    } else if ($deviceInfo?.warning === 1) {
        deviceIsWarning.set(true)
    }

    $: if($deviceInfo?.temperature) {
        $temperature.value = $deviceInfo?.temperature
    }

    $: allDevices = [...$unusedDevices, ...$devicesAll]
</script>

<!-- Добавление комнаты -->
{#if $formType === "add_room"}
    <form 
        class="form" 
        on:submit={() => {
            dispatch('submit', {
                payload: $name.value, 
                formType: $formType
            })
            name.clear()
        }}>
        <input 
            placeholder="Название комнаты"
            type="text"
            id="name"
            autocomplete="off"
            bind:value={$name.value}/>

        <Button
            type="submit"
            disabled={!isValidForm || success}
        >
            {#if !success}
                Добавить комнату
            {:else}
                Успешно!
            {/if}
        </Button>
    </form>
{/if}

<!-- Привязка девайса -->
{#if $formType === "attach_device"}
    <form 
        class="form" 
        on:submit={() => {
            dispatch('submit', {
                roomId: $roomId.value, 
                formType: $formType, 
                deviceId: $deviceInfo.id
            })
            name.clear()
        }}>
        <select
            id="roomId"
            bind:value={$roomId.value}
            class="select"
        >
            <option value="" disabled selected>
                Выбор комнаты
            </option>
            {#each $rooms as room}
                <option value={room.id}>
                    {room.name}
                </option>
            {/each}
        </select>

        <Button
            type="submit"
            disabled={!$roomId.value || success}
        >
            {#if !success}
                Привязать девайс
            {:else}
                Успешно!
            {/if}
        </Button>
    </form>
{/if}

<!-- Настройка девайса -->
{#if $formType === "control_device"}
    <section class="control_wrapper">
        <div class="switch">
            <span>
                Включить/выключить девайс:
            </span>
            <Switch bind:checked={$deviseIsActive}/>
        </div>

        {#if $deviceInfo?.warning !== null}
            <div class="switch">
                <span>
                    Сигнал тревоги: 
                </span>
                <Switch bind:checked={$deviceIsWarning}/>
            </div>
        {/if}
        
        <form 
            class="form" 
            on:submit={() => {
                dispatch('submit', {
                    deviseIsActive: $deviseIsActive, 
                    deviceIsWarning: $deviceIsWarning,
                    formType: $formType, 
                    deviceId: $deviceInfo.id, 
                    temperature: $temperature.value
                })
                name.clear()
            }}>
            {#if $deviceInfo?.temperature}
                <div class="temperature_wrapper">
                    <span>
                        Текущая температура: 
                        <span class="temperature">
                            {$deviceInfo?.temperature}℃
                        </span>
                    </span>
                    <span>
                        Установить температуру:
                    </span>
                </div>
                <input 
                    placeholder="Температура"
                    type="number"
                    id="temperature"
                    autocomplete="off"
                    bind:value={$temperature.value}/>
            {/if}

            <Button
                type="submit"
                disabled={success}
            >
                {#if !success}
                    Обновить параметры
                {:else}
                    Успешно!
                {/if}
            </Button>
        </form>
    </section>
{/if}

<!-- Добавление сценария -->
{#if $formType === "add_events"}
    <form 
        class="form" 
        on:submit={() => {
            dispatch('submit', {
                scriptName: $scriptName.value, 
                formType: $formType,
                selectedDeviceId: $selectedDeviceId.value,
                selectedParam: $selectedParam.value,
                selectedParamAcive: $selectedParamAcive.value,
                selectedParamCondition: $selectedParamCondition.value,
                selectedParamWarning: $selectedParamWarning.value,
                selectedParamAction: $selectedParamAction.value,
                selectedParamTemp: $selectedParamTemp.value
            })
            name.clear()
        }}>
        <input 
            placeholder="Название сценария"
            type="text"
            id="scriptName"
            autocomplete="off"
            bind:value={$scriptName.value}/>

        <select
            id="selectedDeviceId"
            bind:value={$selectedDeviceId.value}
            class="select"
            disabled={!$scriptName.value}
        >
            <option value="" disabled selected>
                Выбор девайса
            </option>
            {#each allDevices as device}
                <option value={device.id}>
                    {device.name}
                </option>
            {/each}
        </select>

        <select
            id="selectedParam"
            bind:value={$selectedParam.value}
            class="select"
            disabled={!$selectedDeviceId.value}
        >
            <option value="" disabled selected>
                Выбор параметра
            </option>
            {#each defaultParams as device}
                <option value={device.key}>
                    {device.name}
                </option>
            {/each}
        </select>

        {#if $selectedParam.value === "active"}        
            <select
                id="selectedParamAcive"
                bind:value={$selectedParamAcive.value}
                class="select"
            >
                <option value="" disabled selected>
                    Опции
                </option>
                <option value={true}>
                    Включился
                </option>
                <option value={false}>
                    Выключился
                </option>
            </select>
        {/if}

        {#if $selectedParam.value === "temperature"}        
            <select
                id="selectedParamCondition"
                bind:value={$selectedParamCondition.value}
                class="select"
            >
                <option value="" disabled selected>
                    Условие
                </option>
                <option value={"more"}>
                    Больше
                </option>
                <option value={"less"}>
                    Меньше
                </option>
            </select>

            {#if $selectedParamCondition.value}
                <input 
                    placeholder="Температура"
                    type="number"
                    id="scriptName"
                    autocomplete="off"
                    bind:value={$selectedParamTemp.value}/>
            {/if}
        {/if}

        {#if $selectedParam.value === "warning"}        
            <select
                id="selectedParamWarning"
                bind:value={$selectedParamWarning.value}
                class="select"
            >
                <option value="" disabled selected>
                    Опции
                </option>
                <option value={true}>
                    Включился
                </option>
                <option value={false}>
                    Выключился
                </option>
            </select>
        {/if}

        {#if $selectedParam.value}        
            <select
                id="selectedParamAction"
                bind:value={$selectedParamAction.value}
                class="select"
            >
                <option value="" disabled selected>
                    Действия
                </option>
                <option value={"notification"}>
                    Уведомление
                </option>
            </select>
        {/if}

        <Button
            type="submit"
            disabled={!$selectedParamAction.value || success}
        >
            {#if !success}
                Добавить сценарий
            {:else}
                Успешно!
            {/if}
        </Button>
    </form>
{/if}

<style lang="scss">

    .control_wrapper {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & .temperature_wrapper {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-top: 10px;
            border-top: 1px solid rgba(0,0,0, 0.2);

            & .temperature {
                font-size: 18px;
                font-weight: 700;
            }

        }

        & input {
            width: 100%;
            height: 50px;
            border-radius: 10px;
            padding: 10px;
        }

        & .select {
            height: 50px;
            border-radius: 10px;
            font-size: 16px;
        }
    }

    .switch {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>