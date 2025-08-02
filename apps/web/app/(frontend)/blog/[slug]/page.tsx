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

  const { data } = await getBlog(slug);

  return {
    title: `Blog: ${data?.title ?? "Not found"}`,
    description: data?.title.slice(0, 150),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const promises = Promise.all([getBlog(slug)]);

  return <Blog promises={promises} />;
}
