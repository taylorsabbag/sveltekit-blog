<script lang='ts'>
	import { formatDate } from '$lib/utils.js';

    export let data
</script>

<svelte:head>
    <title>{data.category}</title>
    <meta property="og:type" content="website" />
    <meta property="og:title" content={data.category} />
</svelte:head>

<section>
    <h1>#{data.category}</h1>
    <ul class='posts'>
        {#each data.filteredPosts as post}
            <li class="post">
                <a href={post.slug} class="title">{post.title}</a>
                <p class="date">{formatDate(post.date)}</p>
                <p class="description">{post.description}</p>
            </li>
        {/each}
    </ul>
</section>

<style>
    .posts {
        display: grid;
        gap: var(--size-7);
    }

    .post {
        max-inline-size: var(--size-content-3);
    }

    .post:not(:last-child) {
        border-bottom: 1px solid var(--border);
        padding-bottom: var(--size-7);
    }

    .title {
        font-size: var(--font-size-fluid-3);
        text-transform: capitalize;
    }

    .date {
        color: var(--text-2)
    }

    .description {
        margin-top: var(--size-3);
    }
</style>