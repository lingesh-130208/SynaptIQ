import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { membershipSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = membershipSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid application data",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing =
      await prisma.membershipApplication.findFirst({
        where: {
          OR: [
            {
              email: data.email,
            },
            {
              registerNumber: data.registerNumber,
            },
          ],
        },
      });

    if (existing?.status === "PENDING") {
      return NextResponse.json(
        {
          error: "Application already pending",
        },
        { status: 409 }
      );
    }

    const application =
      await prisma.membershipApplication.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          registerNumber: data.registerNumber,
          year: data.year,
          section: data.section,
          department: data.department,
          skillsText: data.skillsText,
          interests: data.interests,
          experience: data.experience,
          status: "PENDING",
        },
      });

    return NextResponse.json(
      {
        id: application.id,
        status: application.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Membership application error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to submit membership application",
      },
      { status: 500 }
    );
  }
}