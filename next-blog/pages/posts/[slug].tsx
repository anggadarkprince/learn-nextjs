import PostContent from "@/components/posts/post-detail/PostContent";
import {GetStaticPaths, GetStaticProps} from "next";
import {getPostData, getPostsFiles} from "@/lib/posts-util";
import {ParsedUrlQuery} from "querystring";
import {Post} from "@/types/Post";
import {Fragment} from "react";
import Head from "next/head";

function PostPage(props: {post: Post}) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt}/>
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  )
}

interface IParams extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as IParams;
  const postData = await getPostData(slug);
  return {
    props: {
      post: postData
    },
    revalidate: 600
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postFileNames = await getPostsFiles();
  const slugs = postFileNames.map(fileName => fileName.replace(/\.md$/, ''));
  return {
    paths: slugs.map(slug => ({
      params: {slug: slug}
    })),
    fallback: true,
  }
}

export default PostPage;
