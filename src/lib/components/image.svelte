<script>
	export let src;

	export let alt;

    const onLoad = () => {
        loaded = true
    }

	let loaded = false;
</script>

<img  src={src} {alt} class:loaded on:load={onLoad} loading="lazy"  />

<style>
	img {
        width: 100%;
        height: 100%;
		opacity: 0;
		transition: opacity 1200ms ease-out;
	}
	img.loaded {
		opacity: 1;
	}
</style>
