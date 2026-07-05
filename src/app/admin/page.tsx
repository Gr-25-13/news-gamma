import React from "react";
import LinkButton from "@/components/Buttons/LinkButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import AdminNav from "@/components/Admin/AdminNav";
import { requireAdminOrEditor } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import {
  DashboardCard,
  DashboardCardContent,
} from "@/components/dashboard/dashboard-card";
import UserDataCard, {
  UserDataProps,
} from "@/components/dashboard/user-data-card";
import {
  Calendar,
  Newspaper,
  Coins,
  UserRoundCheck,
  Users,
} from "lucide-react";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  formatDistanceToNow,
  startOfMonth,
  subMonths,
  subYears,
  startOfYear,
  endOfYear,
} from "date-fns";
import BarChart from "@/components/dashboard/barchart";
import LineGraph from "@/components/dashboard/line-graph";
import GoalDataCard from "@/components/dashboard/goal";

export default async function AdminPage() {
  const session = await requireAdminOrEditor();

  if (session.user.role !== "admin") {
    // Editor: enkel hubb utan admin-endast statistik
    return (
      <>
        <Navbar />
        <AdminNav />
        <main className="flex grow pt-8 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-8">Adminpanel</h1>
            <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
              <LinkButton
                href="/admin/artiklar"
                variant="primary"
                className="w-full md:w-auto text-center text-lg py-4 px-8"
              >
                Artiklar
              </LinkButton>
              <LinkButton
                href="/admin/kategorier"
                variant="primary"
                className="w-full md:w-auto text-center text-lg py-4 px-8"
              >
                Kategorier
              </LinkButton>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Admin: full dashboard som startsida
  const currentDate = new Date();

  const subscriptionCount = await prisma.subscription.count();

  const premiumSubscriptionPrice = 199;
  const premiumProfit = subscriptionCount * premiumSubscriptionPrice;

  const totalArticles = await prisma.article.count();

  const lastYearStart = startOfYear(subYears(new Date(), 1));
  const lastYearEnd = endOfYear(subYears(new Date(), 1));

  const subscriptionsLastYear = await prisma.subscription.count({
    where: {
      periodStart: {
        gte: lastYearStart,
        lte: lastYearEnd,
      },
    },
  });

  const recentUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
    select: {
      name: true,
      email: true,
      createdAt: true,
    },
  });
  const UserData: UserDataProps[] = recentUsers.map((account) => ({
    name: account.name || "Unknown",
    email: account.email || "Unknown",
    time: formatDistanceToNow(new Date(account.createdAt), {
      addSuffix: true,
    }),
  }));

  const usersThisMonth = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const monthlyUsersData = eachMonthOfInterval({
    start: startOfMonth(new Date(usersThisMonth[0]?.createdAt || new Date())),
    end: endOfMonth(currentDate),
  }).map((month) => {
    const monthString = format(month, "MMM");
    const userMonthly = usersThisMonth
      .filter((user) => format(new Date(user.createdAt), "MMM") === monthString)
      .reduce((total, user) => total + user._count.createdAt, 0);
    return { month: monthString, total: userMonthly };
  });

  const sixMonthsAgo = subMonths(currentDate, 6);
  const subscriptionsLast6Months = await prisma.subscription.findMany({
    where: {
      periodStart: {
        gte: sixMonthsAgo,
        lte: currentDate,
      },
    },
    select: {
      periodStart: true,
    },
  });

  const revenueByMonth: Record<string, number> = {};

  subscriptionsLast6Months.forEach((sub) => {
    if (!sub.periodStart) return;
    const monthKey = format(sub.periodStart, "yyyy-MM");
    revenueByMonth[monthKey] =
      (revenueByMonth[monthKey] || 0) + premiumSubscriptionPrice;
  });

  const monthlyRevenueData = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(currentDate, i);
    const monthKey = format(monthDate, "yyyy-MM");

    monthlyRevenueData.push({
      month: format(monthDate, "MMM"),
      total: revenueByMonth[monthKey] || 0,
    });
  }

  const goalAmount = 5000;
  const goalProgress = (premiumProfit / goalAmount) * 100;

  return (
    <>
      <Navbar />
      <AdminNav />
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-2xl font-bold text-bold text-center mx-6 mt-6">
          Dashboard
        </h1>
        <div className="container mx-auto py-8">
          <div className="flex flex-col gap-5 w-full">
            <section
              className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
                        gap-4 gap-x-8 transition-all"
            >
              <DashboardCard
                label={"Totalt prenumeranter"}
                Icon={Users}
                amount={subscriptionCount}
                description=""
              />
              <DashboardCard
                label={"Prenumeranter förra året"}
                Icon={Calendar}
                amount={subscriptionsLastYear}
                description="Totalt"
              />
              <DashboardCard
                label={"Vinst Premium"}
                Icon={Coins}
                amount={`${premiumProfit} Kr`}
                description="Totalt"
              />
              <DashboardCard
                label={"Antal publicerade artiklar"}
                Icon={Newspaper}
                amount={totalArticles}
                description="Totalt"
              />
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 transition-all">
              <DashboardCardContent>
                <section className="flex justify-between gap-2 pb-2">
                  <p>Senaste användare</p>
                  <UserRoundCheck className="h-4 w-4" />
                </section>
                {UserData.map((data, index) => (
                  <UserDataCard
                    key={index}
                    name={data.name}
                    email={data.email}
                    time={data.time}
                  ></UserDataCard>
                ))}
              </DashboardCardContent>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 transition-all">
              <BarChart data={monthlyUsersData}></BarChart>
              <LineGraph data={monthlyRevenueData} />
            </section>
            <GoalDataCard
              goal={goalAmount}
              value={premiumProfit}
              bar={goalProgress}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
