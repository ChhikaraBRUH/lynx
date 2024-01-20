import prisma from "@/db";
import { kv } from "@vercel/kv";
import { notFound, redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const kvSlug = "SLUG_" + slug;

  let cache = await kv.get<string>(kvSlug);

  if (!cache) {
    const data = await prisma.link.findFirst({
      where: {
        slug,
      },
    });

    const { url } = data || {};

    if (!!url) {
      cache = url;
      await kv.set(kvSlug, url);
    } else {
      notFound();
    }
  }

  redirect(cache);
}
