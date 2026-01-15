import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import siteData from '@/data/site.json';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
  );

  return rss({
    title: siteData.name,
    description: siteData.description,
    site: context.site ?? 'https://zt1prep.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/${post.data.category === 'guides' ? 'guides' : post.data.category === 'comparisons' ? 'comparisons' : 'gear'}/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
