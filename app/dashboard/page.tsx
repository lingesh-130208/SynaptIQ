import Link from "next/link";
import {
  Bell,
  CalendarDays,
  FolderKanban,
  Users,
  Award,
  ArrowRight,
  UserCircle,
  Megaphone,
  ExternalLink,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const user = await requireUser();

  const member = await prisma.member.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      eventRegistrations: {
        where: {
          status: "REGISTERED",
        },
        include: {
          event: true,
        },
        orderBy: {
          registeredAt: "desc",
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
              _count: {
                select: {
                  members: true,
                },
              },
            },
          },
        },
        orderBy: {
          joinedAt: "desc",
        },
      },

      projectMemberships: {
        include: {
          project: true,
        },
        orderBy: {
          project: {
            createdAt: "desc",
          },
        },
      },

      certificates: {
        where: {
          status: "ACTIVE",
        },
        orderBy: {
          issueDate: "desc",
        },
      },
    },
  });

  const now = new Date();

  const [
    upcomingEvents,
    announcements,
    unreadNotifications,
  ] = await Promise.all([
    prisma.event.findMany({
      where: {
        status: {
          in: ["PUBLISHED", "ONGOING"],
        },
        date: {
          gte: now,
        },
      },
      orderBy: {
        date: "asc",
      },
      take: 5,
    }),

    prisma.announcement.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          priority: "desc",
        },
        {
          publishedAt: "desc",
        },
      ],
      take: 5,
    }),

    prisma.notification.findMany({
      where: {
        userId: user.id,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const registeredEvents = member?.eventRegistrations.length ?? 0;
  const teams = member?.teamMemberships.length ?? 0;
  const projects = member?.projectMemberships.length ?? 0;
  const certificates = member?.certificates.length ?? 0;

  const displayName =
    member?.fullName ||
    user.name ||
    user.email?.split("@")[0] ||
    "Member";

  return (
    <section className="section min-h-[75vh]">
      <div className="container">

        {/* HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
              Member Portal
            </div>

            <h1 className="mt-2 text-4xl font-black">
              Welcome back, {displayName}.
            </h1>

            <p className="mt-2 text-slate-400">
              {member?.department || "CSE(AI&ML)"}
              {member?.year ? ` • ${member.year}` : ""}
              {member?.section ? ` • Section ${member.section}` : ""}
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/profile" className="btn-secondary">
              <UserCircle size={17} className="mr-2 inline" />
              My Profile
            </Link>

            <Link href="/" className="btn-secondary">
              Public Website
            </Link>
          </div>
        </div>

        {/* MEMBER INFO */}
        {member && (
          <div className="mt-8 card p-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Register Number
                </div>
                <div className="mt-1 font-semibold">
                  {member.registerNumber}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Email
                </div>
                <div className="mt-1 break-all font-semibold">
                  {user.email}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Experience
                </div>
                <div className="mt-1 font-semibold">
                  {member.experienceLevel || "Not specified"}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  Role
                </div>
                <div className="mt-1 font-semibold">
                  {user.role}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STATS */}
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardStat
            icon={<CalendarDays size={21} />}
            number={registeredEvents}
            label="Registered Events"
            href="/events"
          />

          <DashboardStat
            icon={<Users size={21} />}
            number={teams}
            label="My Teams"
            href="/teams"
          />

          <DashboardStat
            icon={<FolderKanban size={21} />}
            number={projects}
            label="My Projects"
            href="/projects"
          />

          <DashboardStat
            icon={<Award size={21} />}
            number={certificates}
            label="Certificates"
            href="/certificates"
          />

        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">

          {/* UPCOMING EVENTS */}
          <div className="card p-7">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Upcoming Events
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Events currently available in SynaptIQ
                </p>
              </div>

              <CalendarDays
                size={20}
                className="text-cyan-300"
              />
            </div>

            <div className="mt-6">

              {upcomingEvents.length === 0 ? (
                <EmptyState message="No upcoming events right now." />
              ) : (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-t border-white/10 py-5 first:border-t-0"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <div className="font-semibold">
                          {event.title}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          {formatDate(event.date)}
                          {event.venue
                            ? ` • ${event.venue}`
                            : ""}
                        </p>

                        {event.startTime && (
                          <p className="mt-1 text-xs text-slate-600">
                            {event.startTime}
                            {event.endTime
                              ? ` - ${event.endTime}`
                              : ""}
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/events/${event.slug}`}
                        className="shrink-0 text-cyan-300 hover:text-cyan-200"
                      >
                        <ArrowRight size={18} />
                      </Link>

                    </div>

                  </div>
                ))
              )}

            </div>

            <Link
              href="/events"
              className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-300"
            >
              View all events
              <ArrowRight size={15} className="ml-2" />
            </Link>

          </div>

          {/* MY TEAMS */}
          <div className="card p-7">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  My Teams
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Teams you currently belong to
                </p>
              </div>

              <Users
                size={20}
                className="text-cyan-300"
              />
            </div>

            <div className="mt-6">

              {!member || member.teamMemberships.length === 0 ? (
                <EmptyState message="You haven't joined any teams yet." />
              ) : (
                member.teamMemberships.slice(0, 5).map((membership) => (
                  <div
                    key={membership.id}
                    className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] p-4"
                  >

                    <div>
                      <div className="font-semibold">
                        {membership.team.name}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        {membership.team.event?.title ||
                          "SynaptIQ Team"}
                        {" • "}
                        {membership.team._count.members} members
                      </div>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-cyan-300"
                    />

                  </div>
                ))
              )}

            </div>

            <Link
              href="/teams"
              className="mt-3 inline-flex items-center text-sm font-semibold text-cyan-300"
            >
              Manage Teams
              <ArrowRight size={15} className="ml-2" />
            </Link>

          </div>

          {/* MY PROJECTS */}
          <div className="card p-7">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  My Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Projects you are working on
                </p>
              </div>

              <FolderKanban
                size={20}
                className="text-cyan-300"
              />
            </div>

            <div className="mt-6">

              {!member || member.projectMemberships.length === 0 ? (
                <EmptyState message="You aren't part of any projects yet." />
              ) : (
                member.projectMemberships.slice(0, 5).map((membership) => (
                  <div
                    key={membership.id}
                    className="mb-3 rounded-xl border border-white/10 bg-white/[.03] p-4"
                  >

                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        {membership.project.title}
                      </div>

                      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400">
                        {membership.project.status.replace("_", " ")}
                      </span>
                    </div>

                    {membership.role && (
                      <p className="mt-2 text-sm text-slate-500">
                        Role: {membership.role}
                      </p>
                    )}

                  </div>
                ))
              )}

            </div>

          </div>

          {/* CERTIFICATES */}
          <div className="card p-7">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Certificates
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your verified SynaptIQ certificates
                </p>
              </div>

              <Award
                size={20}
                className="text-cyan-300"
              />
            </div>

            <div className="mt-6">

              {!member || member.certificates.length === 0 ? (
                <EmptyState message="No certificates issued yet." />
              ) : (
                member.certificates.slice(0, 5).map((certificate) => (
                  <div
                    key={certificate.id}
                    className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] p-4"
                  >

                    <div>
                      <div className="font-semibold">
                        {certificate.title}
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        {certificate.certificateNumber}
                        {" • "}
                        {formatDate(certificate.issueDate)}
                      </div>
                    </div>

                    <Award
                      size={18}
                      className="text-cyan-300"
                    />

                  </div>
                ))
              )}

            </div>

            <Link
              href="/certificates"
              className="mt-3 inline-flex items-center text-sm font-semibold text-cyan-300"
            >
              View certificates
              <ArrowRight size={15} className="ml-2" />
            </Link>

          </div>

        </div>

        {/* ANNOUNCEMENTS + NOTIFICATIONS */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">

          {/* ANNOUNCEMENTS */}
          <div className="card p-7">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-bold">
                  Latest Announcements
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest updates from SynaptIQ
                </p>
              </div>

              <Megaphone
                size={20}
                className="text-cyan-300"
              />

            </div>

            <div className="mt-6">

              {announcements.length === 0 ? (
                <EmptyState message="No announcements yet." />
              ) : (
                announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border-t border-white/10 py-4 first:border-t-0"
                  >

                    <Link
                      href={`/announcements/${announcement.slug}`}
                      className="font-semibold hover:text-cyan-300"
                    >
                      {announcement.title}
                    </Link>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {announcement.content}
                    </p>

                  </div>
                ))
              )}

            </div>

          </div>

          {/* NOTIFICATIONS */}
          <div className="card p-7">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-bold">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your unread notifications
                </p>
              </div>

              <Bell
                size={20}
                className="text-cyan-300"
              />

            </div>

            <div className="mt-6">

              {unreadNotifications.length === 0 ? (
                <EmptyState message="You're all caught up." />
              ) : (
                unreadNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-t border-white/10 py-4 first:border-t-0"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <div className="font-semibold">
                          {notification.title}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          {notification.message}
                        </p>
                      </div>

                      {notification.link && (
                        <Link
                          href={notification.link}
                          className="text-cyan-300"
                        >
                          <ExternalLink size={16} />
                        </Link>
                      )}

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


/* -----------------------------
   STAT CARD
----------------------------- */

function DashboardStat({
  icon,
  number,
  label,
  href,
}: {
  icon: React.ReactNode;
  number: number;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="card p-6 transition hover:-translate-y-1 hover:border-cyan-400/20"
    >
      <div className="text-cyan-300">
        {icon}
      </div>

      <div className="mt-6 text-3xl font-black">
        {number}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {label}
      </div>
    </Link>
  );
}


/* -----------------------------
   EMPTY STATE
----------------------------- */

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/[.02] p-5 text-sm text-slate-500">
      {message}
    </div>
  );
}


/* -----------------------------
   DATE FORMATTER
----------------------------- */

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}