import { unstable_cache } from "@/lib/unstable_cache";
import { Blog, blogsTable, db } from "@repo/cent-database";
import { eq } from "drizzle-orm";
import { Value } from "platejs";

export function getBlog(slug: string) {
  const defaultData: { data: Blog | null } = { data: null };
  return unstable_cache(
    async () => {
      try {
        const data = await db.query.blogsTable.findFirst({
          where: eq(blogsTable.slug, slug),
        });

        if (!data) return defaultData;

        return { data };
      } catch (error) {
        return defaultData;
      }
    },
    [],
    { revalidate: 1, tags: [slug] }
  )();
}
