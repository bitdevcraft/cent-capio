import { Metadata } from "next";
import { Blog } from "./blog";
import { getBlog } from "./queries";
import { redirect } from "next/navigation";
import { Value } from "platejs";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlog(slug);
  return {
    title: blog.data?.title ?? "Not found",
    description: blog.data?.title.slice(0, 150),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { data } = await getBlog(slug);

  if (!data) redirect("/not-found");

  const content = data.jsonContent as Value;
  return <Blog content={content} title={data.title} />;
}
