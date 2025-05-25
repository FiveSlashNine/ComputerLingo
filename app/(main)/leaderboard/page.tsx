import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getLeaderboardData() {
  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/leaderboard`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return null;
  }
};

const getRankBadge = (position: number) => {
  switch (position) {
    case 1:
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">1st</Badge>;
    case 2:
      return <Badge className="bg-gray-400 hover:bg-gray-500">2nd</Badge>;
    case 3:
      return <Badge className="bg-amber-600 hover:bg-amber-700">3rd</Badge>;
    default:
      return <Badge variant="outline">{position}th</Badge>;
  }
};

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();
  console.log(leaderboardData);

  return (
    <div className="min-h-screen container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Leaderboard
          </h1>
          <p className="text-slate-600">Top players and their scores</p>
        </div>

        <Card className="shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center">Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {leaderboardData.map((player: any, index: number) => {
                const position = index + 1;
                const isTopThree = position <= 3;

                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-4 border-b last:border-b-0 transition-colors hover:bg-slate-50 ${
                      isTopThree
                        ? "bg-gradient-to-r from-slate-50 to-transparent"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(position) || (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <span className="text-sm font-semibold text-slate-600">
                              {position}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {player.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getRankBadge(position)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">
                        {player.score.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">points</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
