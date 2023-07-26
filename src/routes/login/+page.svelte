<script>
    /**
     * Components
     */
    import Form from "$lib/components/form.svelte";

</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<div class="wrapper">
    <div class="content">
        <div class="text">
            <p>
                Управляй своим домом
            </p>
            <p>
                Контролируй все свои умные устройства <br/>и наслаждайся жизнью
            </p>
        </div>
        <Form />
    </div>
</div>

<style lang="scss">
    .wrapper {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;

        & .content {
            display: flex;
            flex-direction: column;
            gap: 50px;
            margin: auto;
            transform: translateY(-25%);
            & .text {
                display: flex;
                flex-direction: column;
                gap: 16px;
                text-align: center;

                & p:first-child {
                    font-size: 32px;
                }
            }
        }
    }

</style>
