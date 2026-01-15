import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TeamStats {
  team: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  form: string[];
}

interface StatisticsTabProps {
  teamStats: TeamStats[];
}

export const StatisticsTab = ({ teamStats }: StatisticsTabProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon name="TrendingUp" size={18} />
            Лучшие атакующие команды
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamStats
              .sort((a, b) => b.goalsFor - a.goalsFor)
              .map((team, index) => (
                <div key={team.team} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-6">
                      {index + 1}
                    </span>
                    <span className="font-medium">{team.team}</span>
                  </div>
                  <Badge variant="secondary">{team.goalsFor} мячей</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon name="Shield" size={18} />
            Лучшие оборонительные команды
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamStats
              .sort((a, b) => a.goalsAgainst - b.goalsAgainst)
              .map((team, index) => (
                <div key={team.team} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-6">
                      {index + 1}
                    </span>
                    <span className="font-medium">{team.team}</span>
                  </div>
                  <Badge variant="secondary">{team.goalsAgainst} пропущено</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon name="Percent" size={18} />
            Процент побед
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamStats
              .map((team) => ({
                ...team,
                winRate: Math.round(
                  (team.wins / (team.wins + team.draws + team.losses)) * 100
                ),
              }))
              .sort((a, b) => b.winRate - a.winRate)
              .map((team, index) => (
                <div key={team.team} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-6">
                      {index + 1}
                    </span>
                    <span className="font-medium">{team.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${team.winRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-10 text-right">
                      {team.winRate}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon name="Activity" size={18} />
            Общая статистика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Всего матчей</span>
              <span className="text-xl font-bold">
                {teamStats.reduce((acc, t) => acc + t.wins + t.draws + t.losses, 0) / 2}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Забито голов</span>
              <span className="text-xl font-bold">
                {teamStats.reduce((acc, t) => acc + t.goalsFor, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Средняя результативность</span>
              <span className="text-xl font-bold">
                {(
                  teamStats.reduce((acc, t) => acc + t.goalsFor, 0) /
                  (teamStats.reduce((acc, t) => acc + t.wins + t.draws + t.losses, 0) / 2)
                ).toFixed(1)}{' '}
                гола
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
