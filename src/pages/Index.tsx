import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Match {
  id: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
  status: 'finished' | 'upcoming';
}

interface Prediction {
  id: number;
  team1: string;
  team2: string;
  winProb1: number;
  drawProb: number;
  winProb2: number;
  coefficient1: number;
  coefficientDraw: number;
  coefficient2: number;
  date: string;
}

interface TeamStats {
  team: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  form: string[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('predictions');

  const matches: Match[] = [
    { id: 1, team1: 'Манчестер Юнайтед', team2: 'Ливерпуль', score1: 2, score2: 1, date: '14.01.2026', status: 'finished' },
    { id: 2, team1: 'Челси', team2: 'Арсенал', score1: 1, score2: 1, date: '13.01.2026', status: 'finished' },
    { id: 3, team1: 'Манчестер Сити', team2: 'Тоттенхэм', score1: 3, score2: 0, date: '12.01.2026', status: 'finished' },
    { id: 4, team1: 'Ньюкасл', team2: 'Астон Вилла', score1: 0, score2: 0, date: '18.01.2026', status: 'upcoming' },
  ];

  const predictions: Prediction[] = [
    {
      id: 1,
      team1: 'Бавария',
      team2: 'РБ Лейпциг',
      winProb1: 62,
      drawProb: 23,
      winProb2: 15,
      coefficient1: 1.61,
      coefficientDraw: 4.35,
      coefficient2: 6.67,
      date: '20.01.2026',
    },
    {
      id: 2,
      team1: 'ПСЖ',
      team2: 'Марсель',
      winProb1: 58,
      drawProb: 25,
      winProb2: 17,
      coefficient1: 1.72,
      coefficientDraw: 4.00,
      coefficient2: 5.88,
      date: '21.01.2026',
    },
    {
      id: 3,
      team1: 'Реал Мадрид',
      team2: 'Барселона',
      winProb1: 48,
      drawProb: 28,
      winProb2: 24,
      coefficient1: 2.08,
      coefficientDraw: 3.57,
      coefficient2: 4.17,
      date: '22.01.2026',
    },
  ];

  const teamStats: TeamStats[] = [
    { team: 'Манчестер Сити', wins: 15, draws: 3, losses: 2, goalsFor: 48, goalsAgainst: 18, form: ['W', 'W', 'W', 'D', 'W'] },
    { team: 'Ливерпуль', wins: 14, draws: 4, losses: 2, goalsFor: 45, goalsAgainst: 20, form: ['W', 'W', 'L', 'W', 'D'] },
    { team: 'Арсенал', wins: 13, draws: 5, losses: 2, goalsFor: 42, goalsAgainst: 19, form: ['D', 'W', 'W', 'D', 'W'] },
    { team: 'Челси', wins: 12, draws: 5, losses: 3, goalsFor: 38, goalsAgainst: 22, form: ['W', 'D', 'W', 'L', 'D'] },
  ];

  const getFormColor = (result: string) => {
    if (result === 'W') return 'bg-green-500';
    if (result === 'D') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 50) return 'text-green-600 font-semibold';
    if (prob >= 30) return 'text-yellow-600 font-medium';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Тотализатор</h1>
          <p className="text-muted-foreground">Анализ матчей и прогнозы на основе статистики</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <Icon name="Target" size={16} />
              Прогнозы
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Icon name="History" size={16} />
              История
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="flex items-center gap-2">
              <Icon name="Trophy" size={16} />
              Турниры
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-4">
            <div className="grid gap-4">
              {predictions.map((pred) => (
                <Card key={pred.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">{pred.team1} vs {pred.team2}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        <Icon name="Calendar" size={12} className="mr-1" />
                        {pred.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Победа 1</div>
                        <div className={`text-2xl mb-1 ${getProbabilityColor(pred.winProb1)}`}>
                          {pred.winProb1}%
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Коэф: {pred.coefficient1}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Ничья</div>
                        <div className={`text-2xl mb-1 ${getProbabilityColor(pred.drawProb)}`}>
                          {pred.drawProb}%
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Коэф: {pred.coefficientDraw}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Победа 2</div>
                        <div className={`text-2xl mb-1 ${getProbabilityColor(pred.winProb2)}`}>
                          {pred.winProb2}%
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Коэф: {pred.coefficient2}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="flex-1">
                        <Icon name="TrendingUp" size={14} className="mr-1" />
                        Детальный анализ
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Share2" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4">
              {matches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{match.team1}</span>
                          {match.status === 'finished' ? (
                            <span className="text-2xl font-bold mx-4">{match.score1}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground mx-4">vs</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{match.team2}</span>
                          {match.status === 'finished' && (
                            <span className="text-2xl font-bold mx-4">{match.score2}</span>
                          )}
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <Badge
                          variant={match.status === 'finished' ? 'secondary' : 'default'}
                          className="mb-2"
                        >
                          {match.status === 'finished' ? 'Завершен' : 'Предстоит'}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{match.date}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
