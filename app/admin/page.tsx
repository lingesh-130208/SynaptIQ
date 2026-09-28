import Link from "next/link";
import {
  Activity,
  Award,
  Bell,
  CalendarDays,
  ChevronRight,
  FileText,
  FolderKanban,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const user = await requireAdmin();

  const [
    memberCount,
    pendingApplications,
    eventCount,
    projectCount,
    certificateCount,
    announcementCount,
    recentActivity,
  ] = await Promise.all([
    prisma.member.count(),

    prisma.membershipApplication.count({
      where: { status: "PENDING" },
    }),

    prisma.event.count(),

    prisma.project.count(),

    prisma.certificate.count(),

    prisma.announcement.count(),

    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  const stats = [
    {
      name: "Members",
      value: memberCount,
      icon: Users,
      href: "/admin/members",
    },
    {
      name: "Pending Applications",
      value: pendingApplications,
      icon: FileText,
      href: "/admin/applications",
    },
    {
      name: "Events",
      value: eventCount,
      icon: CalendarDays,
      href: "/admin/events",
    },
    {
      name: "Projects",
      value: projectCount,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      name: "Certificates",
      value: certificateCount,
      icon: Award,
      href: "/admin/certificates",
    },
    {
      name: "Announcements",
      value: announcementCount,
      icon: Bell,
      href: "/admin/announcements",
    },
  ];

  const modules = [
    ["Members", "/admin/members", Users],
    ["Applications", "/admin/applications", FileText],
    ["Events", "/admin/events", CalendarDays],
    ["Registrations", "/admin/registrations", Users],
    ["Teams", "/admin/teams", Users],
    ["Projects", "/admin/projects", FolderKanban],
    ["Certificates", "/admin/certificates", Award],
    ["Announcements", "/admin/announcements", Bell],
    ["Gallery", "/admin/gallery", Activity],
    ["Achievements", "/admin/achievements", Award],
    ["ELIXA", "/admin/elixa", Activity],
    ["Admin Roles", "/admin/roles", ShieldCheck],
    ["Audit Logs", "/admin/audit-logs", Activity],
    ["Settings", "/admin/settings", Settings],
  ];

  return (
    <section className="section min-h-[75vh]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
              Administration
            </div>

            <h1 className="mt-2 text-4xl font-black">
              SynaptIQ Control Center
            </h1>

            <p className="mt-2 text-slate-400">
              Real-time club management powered by the SynaptIQ database.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[.03] px-5 py-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-cyan-300" size={20} />

              <div>
                <div className="text-sm font-semibold">
                  {user.name || user.email}
                </div>

                <div className="mt-1 text-xs uppercase tracking-wider text-cyan-300">
                  {user.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live statistics */}

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ name, value, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className="card group p-6 transition hover:-translate-y-1 hover:border-cyan-300/20"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-cyan-300" />

                <ChevronRight
                  size={18}
                  className="text-slate-600 transition group-hover:text-cyan-300"
                />
              </div>

              <div className="mt-5 text-3xl font-black">
                {value.toLocaleString()}
              </div>

              <div className="mt-1 text-sm text-slate-500">
                {name}
              </div>
            </Link>
          ))}
        </div>

        {/* Management modules */}

        <div className="mt-8 card overflow-hidden">
          <div className="border-b border-white/10 p-6">
            <h2 className="font-bold">Management Modules</h2>

            <p className="mt-1 text-sm text-slate-500">
              Access SynaptIQ administrative functions.
            </p>
          </div>

          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(([name, href, Icon]) => {
              const ModuleIcon = Icon as typeof Activity;

              return (
                <Link
                  key={name as string}
                  href={href as string}
                  className="group flex items-center justify-between bg-[#0b1022] p-5 transition hover:bg-cyan-300/[.04]"
                >
                  <div className="flex items-center gap-3">
                    <ModuleIcon
                      size={18}
                      className="text-cyan-300"
                    />

                    <span className="text-sm font-semibold">
                      {name as string}
                    </span>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-slate-600 transition group-hover:text-cyan-300"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}

        <div className="mt-8 card overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div>
              <h2 className="font-bold">Recent Activity</h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest recorded administrative actions.
              </p>
            </div>

            <Link
              href="/admin/audit-logs"
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              View all
            </Link>
          </div>

          {recentActivity.length === 0 ? (
            <div className="p-8 text-sm text-slate-500">
              No administrative activity has been recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-5"
                >
                  <div>
                    <div className="font-semibold">
                      {activity.action}
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      {activity.entity}
                      {activity.entityId
                        ? ` • ${activity.entityId}`
                        : ""}
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-500">
                    <div>
                      {activity.user?.name ||
                        activity.user?.email ||
                        "System"}
                    </div>

                    <div className="mt-1">
                      {activity.createdAt.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}