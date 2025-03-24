import BlogCard from "./BlogCard";

const BlogList = ({ posts }: { posts: any[] }) => {
  return (
    <div
      style={{
        width: "43rem",
      }}
    >
      {posts.map(({ data }) => (
        <BlogCard frontmatter={data} />
      ))}
    </div>
  );
};

export default BlogList;
