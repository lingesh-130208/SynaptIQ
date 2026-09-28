import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/permissions";

export const dynamic = "force-dynamic";

/*
GET /api/teams

Returns teams belonging to the logged-in member.
*/

export async function GET() {
  try {
    const user = await requireUser();

    const member = await prisma.member.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          error: "Member profile not found.",
        },
        { status: 404 }
      );
    }

    const teams = await prisma.team.findMany({
      where: {
        members: {
          some: {
            memberId: member.id,
            status: "ACTIVE",
          },
        },
      },
      include: {
        event: true,

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        members: {
          where: {
            status: "ACTIVE",
          },

          include: {
            member: {
              include: {
                skills: {
                  include: {
                    skill: true,
                  },
                },
              },
            },
          },
        },

        invitations: {
          where: {
            status: "PENDING",
          },
        },

        _count: {
          select: {
            members: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      teams,
    });
  } catch (error) {
    console.error("GET /api/teams error:", error);

    return NextResponse.json(
      {
        error: "Failed to load teams.",
      },
      { status: 500 }
    );
  }
}


/*
POST /api/teams

Creates a new team for the logged-in member.
*/

export async function POST(request: Request) {
  try {
    const user = await requireUser();

    const member = await prisma.member.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          error: "Member profile not found.",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const description = String(
      body.description ?? ""
    ).trim();

    const eventId =
      body.eventId
        ? String(body.eventId)
        : null;

    if (!name) {
      return NextResponse.json(
        {
          error: "Team name is required.",
        },
        { status: 400 }
      );
    }

    if (name.length < 3) {
      return NextResponse.json(
        {
          error: "Team name must contain at least 3 characters.",
        },
        { status: 400 }
      );
    }

    /*
    If an event was supplied, make sure it exists.
    */

    if (eventId) {
      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        return NextResponse.json(
          {
            error: "Selected event does not exist.",
          },
          { status: 400 }
        );
      }
    }

    /*
    Create team and creator membership
    in one transaction.
    */

    const team = await prisma.$transaction(
      async (tx) => {
        const newTeam = await tx.team.create({
          data: {
            name,
            description:
              description || null,
            eventId,
            createdById: user.id,
          },
        });

        await tx.teamMember.create({
          data: {
            teamId: newTeam.id,
            memberId: member.id,
            role: "LEADER",
            status: "ACTIVE",
          },
        });

        return newTeam;
      }
    );

    return NextResponse.json(
      {
        message: "Team created successfully.",
        team,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/teams error:", error);

    return NextResponse.json(
      {
        error: "Failed to create team.",
      },
      { status: 500 }
    );
  }
}