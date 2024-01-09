// ./src/components/Posts.tsx

import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

export default function Posts({ posts }: { posts: SanityDocument[] }) {
  return (
    <main className="divide-blue-100 container mx-auto grid grid-cols-1 divide-y">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Link key={post._id} href={`/blogs/${post.slug.current}`}>
            <h2 className="hover:bg-blue-50 p-4">{post.title}</h2>
          </Link>
        ))
      ) : (
        <div className="text-red-500 p-4">No posts found</div>
      )}
    </main>
  )
}
