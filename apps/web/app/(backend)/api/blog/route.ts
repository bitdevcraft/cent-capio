import { BlogFormWithContentSchema } from "@/validations/blog-schema";
import { blogsTable, NewBlog } from "@repo/cent-database/schema";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z from "zod";
import { nanoid } from "platejs";
import { auth } from "@repo/cent-auth";

import { db } from "@repo/cent-database";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.session.activeOrganizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const input = BlogFormWithContentSchema.parse(body);

    const randomId = nanoid();
    const slug = slugify(input.title || "", {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    const blog: NewBlog = {
      title: input.title,
      content: "",
      jsonContent: input.content,
      slug: `${slug}-${randomId}`,
      ownerId: session.user.id,
    };

    await db.insert(blogsTable).values(blog).returning();

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    // 5. Log & return generic 500
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
