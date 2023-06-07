<script lang="ts">
	import * as config from '$lib/config';
</script>

<footer>
    <p>{config.title} &copy; {new Date().getFullYear()}</p>
</footer>

<style>
    footer {
        padding-block: var(--size-7);
        text-align: center;
    }

    p {
        color: var(--text-2);
    }
</style>