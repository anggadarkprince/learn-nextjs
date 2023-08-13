import Hero from "@/components/home-page/Hero";
import FeaturedPosts from "@/components/home-page/FeaturedPosts";
import {getFeaturedPosts} from "@/lib/posts-util";
import {Post} from "@/types/Post";
import Head from "next/head";
import {Fragment} from "react";

function HomePage(props: {posts: Post[]}) {
  return (
    <Fragment>
      <Head>
        <title>Angga&apos;s Blog</title>
        <meta name="description" content="I post about programming and web development"/>
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const featuredPosts = await getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
