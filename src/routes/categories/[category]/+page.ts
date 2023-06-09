import { error } from "@sveltejs/kit"

import type { Post } from "$lib/types"

export async function load({ params, fetch }) {
    try {
        const response = await fetch('../api/posts')
        const posts: Post[] = await response.json()
        const category = params.category
        const filteredPosts = posts.filter(post => post.categories.some(postCategory => postCategory === category))
        return { filteredPosts, category }
    } catch (e) {
        throw error(404, `Could not find posts related to ${params.category}`)
    }
}