import Link from "next/link";
import {
  UserCircle,
  Mail,
  Phone,
  GraduationCap,
  Code2,
  ArrowLeft,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireUser();

  const member = await prisma.member.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      teamMemberships: {
        where: {
          status: "ACTIVE",
        },
        include: {
          team: {
            include: {
              event: true,
            },
          },
        },
      },
      projectMemberships: {
        include: {
          project: true,
        },
      },
    },
  });

  if (!member) {
    return (
      <section className="section min-h-[75vh]">
        <div className="container max-w-3xl">
          <div className="card p-8 text-center">
            <UserCircle
              size={50}
              className="mx-auto text-cyan-300"
            />

            <h1 className="mt-5 text-2xl font-black">
              Member Profile Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
              Your login account exists, but a SynaptIQ member
              profile has not been created yet.
            </p>

            <Link
              href="/join"
              className="btn-primary mt-6 inline-flex"
            >
              Join SynaptIQ
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const skills = member.skills.map(
    (memberSkill) => memberSkill.skill.name
  );

  return (
    <section className="section min-h-[75vh]">
      <div className="container">

        {/* HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
              Member Profile
            </div>

            <h1 className="mt-2 text-4xl font-black">
              {member.fullName}
            </h1>

            <p className="mt-2 text-slate-400">
              SynaptIQ Member
            </p>
          </div>

          <Link
            href="/dashboard"
            className="btn-secondary"
          >
            <ArrowLeft
              size={16}
              className="mr-2 inline"
            />
            Dashboard
          </Link>

        </div>

        {/* PROFILE CARD */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* LEFT */}

          <div className="card p-7 text-center">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">

              <UserCircle
                size={65}
                className="text-cyan-300"
              />

            </div>

            <h2 className="mt-5 text-xl font-bold">
              {member.fullName}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {member.registerNumber}
            </p>

            <div className="mt-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300">
              {user.role}
            </div>

          </div>

          {/* RIGHT */}

          <div className="card p-7">

            <h2 className="text-lg font-bold">
              Personal & Academic Information
            </h2>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">

              <InfoItem
                icon={<Mail size={18} />}
                label="Email"
                value={user.email}
              />

              <InfoItem
                icon={<Phone size={18} />}
                label="Phone"
                value={member.phone || "Not provided"}
              />

              <InfoItem
                icon={<GraduationCap size={18} />}
                label="Year"
                value={member.year || "Not provided"}
              />

              <InfoItem
                icon={<GraduationCap size={18} />}
                label="Section"
                value={member.section || "Not provided"}
              />

              <InfoItem
                icon={<GraduationCap size={18} />}
                label="Department"
                value={member.department || "Not provided"}
              />

              <InfoItem
                icon={<GraduationCap size={18} />}
                label="College"
                value={member.college || "Not provided"}
              />

            </div>

          </div>

        </div>

        {/* BIO */}

        <div className="mt-6 card p-7">

          <h2 className="text-lg font-bold">
            About Me
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            {member.bio ||
              "No profile description has been added yet."}
          </p>

        </div>

        {/* SKILLS */}

        <div className="mt-6 card p-7">

          <div className="flex items-center gap-3">
            <Code2
              size={21}
              className="text-cyan-300"
            />

            <div>
              <h2 className="font-bold">
                Technical Skills
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Skills available for project and team discovery
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">

            {skills.length === 0 ? (
              <p className="text-sm text-slate-500">
                No skills added yet.
              </p>
            ) : (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300"
                >
                  {skill}
                </span>
              ))
            )}

          </div>

        </div>

        {/* TEAMS */}

        <div className="mt-6 card p-7">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Users
                size={21}
                className="text-cyan-300"
              />

              <div>
                <h2 className="font-bold">
                  My Teams
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Teams you are currently part of
                </p>
              </div>

            </div>

            <Link
              href="/teams"
              className="text-sm font-semibold text-cyan-300"
            >
              Manage
            </Link>

          </div>

          <div className="mt-6">

            {member.teamMemberships.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-5 text-sm text-slate-500">
                You are not part of any team yet.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">

                {member.teamMemberships.map(
                  (membership) => (
                    <div
                      key={membership.id}
                      className="rounded-xl border border-white/10 bg-white/[.03] p-5"
                    >

                      <div className="font-semibold">
                        {membership.team.name}
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {membership.team.event?.title ||
                          "SynaptIQ Team"}
                      </p>

                      <p className="mt-2 text-xs uppercase tracking-wider text-cyan-300">
                        {membership.role}
                      </p>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

        {/* PROJECTS */}

        <div className="mt-6 card p-7">

          <div className="flex items-center gap-3">

            <Code2
              size={21}
              className="text-cyan-300"
            />

            <div>
              <h2 className="font-bold">
                My Projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Projects connected to your SynaptIQ profile
              </p>
            </div>

          </div>

          <div className="mt-6">

            {member.projectMemberships.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-5 text-sm text-slate-500">
                You are not part of any project yet.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">

                {member.projectMemberships.map(
                  (membership) => (
                    <div
                      key={membership.id}
                      className="rounded-xl border border-white/10 bg-white/[.03] p-5"
                    >

                      <div className="font-semibold">
                        {membership.project.title}
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {membership.project.description}
                      </p>

                      {membership.role && (
                        <p className="mt-3 text-xs text-cyan-300">
                          Role: {membership.role}
                        </p>
                      )}

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}


/* -----------------------------
   INFORMATION ITEM
----------------------------- */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="mt-1 text-cyan-300">
        {icon}
      </div>

      <div className="min-w-0">

        <div className="text-xs uppercase tracking-wider text-slate-500">
          {label}
        </div>

        <div className="mt-1 break-words font-medium text-slate-200">
          {value}
        </div>

      </div>

    </div>
  );
}