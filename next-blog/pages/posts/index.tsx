import AllPosts from "@/components/posts/AllPosts";
import {getAllPosts} from "@/lib/posts-util";
import {Post} from "@/types/Post";
import Head from "next/head";
import {Fragment} from "react";

function AllPostsPage(props: {posts: Post[]}) {
  return (
    <Fragment>
      <Head>
        <title>All Post</title>
        <meta name="description" content="A list of all programming-related tutorials and post"/>
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts: posts,
    },
  };
}

export default AllPostsPage;
