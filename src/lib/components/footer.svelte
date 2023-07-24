<script>
    import Icon from "./icon.svelte";

    /**
	 * Icons
	 */
	import bundleIcons from '$lib/bundleIcons';

</script>

<div class="footer">
    <div class="buttons">
        <Icon name="home"/>
        <Icon name="add_circle"/>
        <Icon name="favorites"/>
    </div>
</div>

<style lang="scss">
    .footer {
        display: flex;
        width: 100%;
        height: 83px;
        position: absolute;
        bottom: 0;
        background: #F7F7F7;
        border-radius: 30px 30px 0 0;
        box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);

        & .buttons {
            display: flex;
            width: fit-content;
            margin: auto;
            gap: 80px;

            & svg {
                width: 36px;
                height: 36px;
            }

        }
    }

</style>