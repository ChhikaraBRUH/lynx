import prisma from "@/db";
import z from "zod";

const createShortLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(3).max(100),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const parsedBody = createShortLinkSchema.parse(body);

    const exisitingLink = await prisma.link.findUnique({
      where: {
        slug: parsedBody.slug,
      },
    });

    if (exisitingLink) {
      throw new Error("This short link already exists!");
    }

    const newLink = await prisma.link.create({
      data: {
        url: parsedBody.url,
        slug: parsedBody.slug,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Short link created!",
        url: newLink.url,
        slug: newLink.slug,
      }),
      { status: 201 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
    });
  }
};
