import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('perspectives')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Perspectives({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Perspectives - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Perspectives
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            What we think - distilled.
          </p>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {posts.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.summary}
                imgSrc={d.imgSrc}
                href={`/blog/${d.slug}`}
              />
            ))}
          </div>
        </div>
      </div>      
      {/* <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      /> */}
    </>
  )
}
