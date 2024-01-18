import prisma from "@/db";
import { notFound, redirect } from "next/navigation";

export default async function RedirectPage({ params }: {params: { slug: string }}) {
    const { slug } = params;
    const data = await prisma.link.findUnique({
        where: {
            slug,
        },
    });

    const {url} = data || {};

    if (!!url) {
        redirect(url);
    } else {
        notFound();
    }
}
