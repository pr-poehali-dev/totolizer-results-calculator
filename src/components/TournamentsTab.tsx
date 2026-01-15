import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface TournamentsTabProps {
  teamStats: TeamStats[];
  getFormColor: (result: string) => string;
}

export const TournamentsTab = ({ teamStats, getFormColor }: TournamentsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Trophy" size={20} />
          Турнирная таблица
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teamStats.map((team, index) => {
            const points = team.wins * 3 + team.draws;
            const played = team.wins + team.draws + team.losses;
            const goalDiff = team.goalsFor - team.goalsAgainst;

            return (
              <div
                key={team.team}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl font-bold text-muted-foreground w-8">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">{team.team}</div>
                    <div className="flex gap-1">
                      {team.form.map((result, i) => (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded-sm ${getFormColor(result)} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">И</div>
                    <div className="font-semibold">{played}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Р</div>
                    <div className="font-semibold">{goalDiff > 0 ? '+' : ''}{goalDiff}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Мячи</div>
                    <div className="font-semibold text-xs">{team.goalsFor}:{team.goalsAgainst}</div>
                  </div>
                  <div className="bg-primary/10 rounded px-3 py-1">
                    <div className="text-xs text-muted-foreground mb-1">О</div>
                    <div className="font-bold text-primary">{points}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
