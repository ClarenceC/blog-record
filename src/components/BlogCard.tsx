const BlogCard = ({
  frontmatter: { title, description, pubDate },
}: {
  frontmatter: {
    title: string;
    description: string;
    pubDate: string;
  };
}) => {
  console.log("card:", title);
  return (
    <section className="shadow-md inset-shadow-2xs p-4 mb-4 rounded group-hover:stroke-white">
      <h3 className="text-[28px] font-black">{title}</h3>
      <p className="text-[13px] color-[#374151]">
        {new Date(pubDate).toLocaleDateString()}
      </p>
      <p>{description}</p>
    </section>
  );
};

export default BlogCard;
