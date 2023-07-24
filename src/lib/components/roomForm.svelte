<script>
    /**
     * Svelte
     */
    import { createEventDispatcher } from 'svelte';

    /**
     * Svelte-form
     */
    import {form, field, combined} from "svelte-forms";
    import {required, pattern, min} from "svelte-forms/validators";

    import Button from "./button.svelte";

    /**
     * Form
     */
    const name = field("name", "", [
        required(),
        min(1),
        pattern(
            /^(?![\d]+$)[а-яА-ЯёЁa-zA-Z0-9]*$/
        ),
    ]);

    const myForm = form(name);

    name.validate();

    /**
     * Reactive
     */
     $: isValidForm = $myForm.valid;

     $: console.log('isValidForm', isValidForm)

     const dispatch = createEventDispatcher();

</script>

<form 
    class="form" 
    on:submit={() => 
        dispatch('submit', {payload: $name.value})
    }>
    <input 
        placeholder="Название комнаты"
        type="text"
        id="name"
        autocomplete="off"
        bind:value={$name.value}/>

    <Button
        type="submit"
        on:click={() => {}}
        disabled={!isValidForm}
    >
        Добавить комнату
    </Button>
</form>

<style lang="scss">

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & input {
            width: 100%;
            height: 50px;
            border-radius: 10px;
            padding: 10px;
        }
    }

</style>