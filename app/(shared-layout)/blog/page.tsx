import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

// export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog | Next.js 16 Tutorial",
  description: "Read our latest articles and insights",
  category: "Web Development",
  authors: [{ name: "Erfan Ahmadi" }],
};

const BlogPage = () => {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="text-xl pt-4 max-w-2xl mx-auto text-muted-foreground ">
          Insigts, thoughs and trends from our team!
        </p>
      </div>
      {/* <Suspense fallback={<SkeletonLoadingUi />}> */}
        <BlogList />
      {/* </Suspense> */}
    </div>
  );
};
export default BlogPage;

async function delay_2s() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

async function BlogList() {
  // await delay_2s();
  // await connection();
  'use cache'
  cacheTag("blog")
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {data?.map((post, i) => (
        <Card key={post._id} className="pt-0 overflow-hidden">
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              className="object-cover"
              src={
                post.imageUrl ?? `https://picsum.photos/500/500?random=${i + 2}`
              }
              alt={`image ${i}`}
              fill
            />
          </div>
          <CardContent className="px-4 mb-2.5">
            <Link href={`/blog/${post._id}`}>
              <h2 className="text-2xl font-bold hover:text-primary transition-colors duration-300 mb-4 line-clamp-1">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground line-clamp-3 h-20">
              {post.body}
            </p>
          </CardContent>
          <CardFooter className="px-4">
            <Link
              href={`/blog/${post._id}`}
              className={buttonVariants({
                className: "w-full",
              })}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
