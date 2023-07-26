<script>
    /**
     * Svelte
     */
    import { getContext } from "svelte";
    import { writable } from "svelte/store";
    import {goto} from "$app/navigation";
    
    /**
     * Svelte-form
     */
    import {form, field, combined} from "svelte-forms";
    import {required, pattern, min} from "svelte-forms/validators";

    /**
     * Components
     */
    import Button from "./button.svelte";

    /**
     * Endpoints
     */
    import paths from "$lib/api/endpoints";
    import api from "$lib/api/api";

    /**
     * Store
     */
    const isRegister = writable(false)
    const success = writable(false)
    const error = writable("")

    /**
     * GetContext
     */
     const isAuth = getContext("isAuth")

    /**
     * Fields
     */
    const name = field("name", "", [
        required(),
        min(1)
    ]);

    const email = field("email", "", [
        required(),
        min(1),
        pattern(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ),
    ]);

    const password = field("password", "", [
        required(),
        pattern(
            /^.{4,20}$/
        ),
    ]);

    /**
     * Form
     */
    const values = combined(
        "values",
        [name, email, password],
        ([name, email, password]) =>
            [name.value, email.value, password.value].join(" ")
    );

    const myForm  = form(values);

    /**
     * Form validate
     */
    $: if($isRegister) name.validate();
    email.validate();
    password.validate();

	/**
	 * Function
	 */
    const sendForm = async () => {
        if(isValidForm) {
            let data = {}
            const endPoint = $isRegister ? paths.CREATE_USER : paths.AUTH

            if($isRegister) {
                data = {
                    "username": $name.value,
                    "email": $email.value,
                    "password": $password.value
                }
            } else {
                data = {
                    "email": $email.value,
                    "password": $password.value
                }
            }

            const { data: result } = await api.post(endPoint, data)

            if(result?.success) {
                if($isRegister) {
                        $isRegister = false
                        $success = true
                } else {
                    localStorage.setItem('token', result.data.access_token);
                    localStorage.setItem('auth', 'true');
                    $isAuth = true;
                    goto('/', {replaceState: true})
                }
            }
            
            resetForm()  
        }
    }

    const resetForm = () => {
        name.clear()
        email.clear()
        password.clear()
        myForm.reset
    }

    /**
     * Reactive
     */
     $: isValidForm = $myForm.valid;
</script>

<div class="form">
    <form 
        on:submit|preventDefault={sendForm} 
        action="">
        <div class="form-fields">
            {#if $success && !$isRegister}
                <span class="notification">
                    Аккаунт успешно создан!
                </span>
            {/if}

            {#if $error}
                <span class="notification">
                    {$error}
                </span>
            {/if}

            {#if $isRegister}
                <input
                    required
                    placeholder="Имя пользователя"
                    type="text"
                    id="name"
                    autocomplete="off"
                    bind:value={$name.value}
                />
            {/if}

            <input
                required
                placeholder="E-mail"
                id="email"
                type="email"
                autocomplete="off"
                bind:value={$email.value}
            />

            <input
                required
                placeholder="Пароль"
                type="password"
                id="password"
                autocomplete="off"
                bind:value={$password.value}
            />
        </div>

        {#if $isRegister}
            <Button type="submit">
                Создать аккаунт
            </Button>
            <Button 
                arrow="left" 
                on:click={() => {
                    $isRegister = false
                    resetForm()
                }}
            >
                Назад
            </Button>
        {:else}
            <Button type="submit" arrow="right">
                Войти
            </Button>
        {/if}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-missing-attribute -->
        {#if !$isRegister}
            <a on:click={() => {
                $isRegister = true
                resetForm()
            }}>
                Создать аккаунт
            </a>
        {/if}
    </form>
</div>

<style lang="scss">
    .form {
        --form-width: 300px;

        & form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: auto;
            gap: 20px;
            width: 100%;
            max-width: 300px;

            & .form-fields {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;

                & .notification {
                    color: var(--color-theme-1);
                }

                & input {
                    width: 100%;
                    height: 50px;
                    border: none;
                    border-radius: 10px;
                    padding: 10px;
                }
            }
        }
    }

</style>