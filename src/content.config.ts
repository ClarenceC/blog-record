// 导入 glob 加载器（loader）
import { glob } from 'astro/loaders';
// 从 `astro:content` 导入工具函数
import { z, defineCollection } from 'astro:content';
// 为每个集合定义一个 `loader` 和 `schema`
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    // Controlled tag vocabulary — add a new tag here ONLY when 3+ posts will share it
    tags: z.array(
      z.enum([
        'JavaScript',
        'TypeScript',
        'CSS',
        'Git',
        'Node',
        '工具',
        'Claude Code',
        'Skills',
        'AI',
        '随笔',
        '居中',
      ])
    ),
  }),
});
// 导出一个单独的 `collections` 对象用以注册你的集合（们）
export const collections = { blog };
