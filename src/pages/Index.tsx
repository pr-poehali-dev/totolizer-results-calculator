import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { PredictionsTab } from '@/components/PredictionsTab';
import { HistoryTab } from '@/components/HistoryTab';
import { TournamentsTab } from '@/components/TournamentsTab';
import { StatisticsTab } from '@/components/StatisticsTab';

interface Match {
  id: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
  status: 'finished' | 'upcoming';
  tournament: string;
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
  tournament: string;
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
  const [selectedTournament, setSelectedTournament] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');

  const matches: Match[] = [
    { id: 1, team1: 'Манчестер Юнайтед', team2: 'Ливерпуль', score1: 2, score2: 1, date: '14.01.2026', status: 'finished', tournament: 'АПЛ' },
    { id: 2, team1: 'Челси', team2: 'Арсенал', score1: 1, score2: 1, date: '13.01.2026', status: 'finished', tournament: 'АПЛ' },
    { id: 3, team1: 'Манчестер Сити', team2: 'Тоттенхэм', score1: 3, score2: 0, date: '12.01.2026', status: 'finished', tournament: 'АПЛ' },
    { id: 4, team1: 'Ньюкасл', team2: 'Астон Вилла', score1: 0, score2: 0, date: '18.01.2026', status: 'upcoming', tournament: 'АПЛ' },
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
      tournament: 'Бундеслига',
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
      tournament: 'Лига 1',
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
      tournament: 'Ла Лига',
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

  const tournaments = ['all', 'АПЛ', 'Бундеслига', 'Лига 1', 'Ла Лига'];

  const filterByDate = (dateStr: string) => {
    if (selectedDateRange === 'all') return true;
    const date = new Date(dateStr.split('.').reverse().join('-'));
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekAhead = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    if (selectedDateRange === 'week') {
      return date >= weekAgo && date <= today;
    }
    if (selectedDateRange === 'upcoming') {
      return date >= today && date <= weekAhead;
    }
    return true;
  };

  const filteredPredictions = predictions.filter(
    (p) => (selectedTournament === 'all' || p.tournament === selectedTournament) && filterByDate(p.date)
  );

  const filteredMatches = matches.filter(
    (m) => (selectedTournament === 'all' || m.tournament === selectedTournament) && filterByDate(m.date)
  );

  const handleResetFilters = () => {
    setSelectedTournament('all');
    setSelectedDateRange('all');
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
            <PredictionsTab
              predictions={filteredPredictions}
              selectedTournament={selectedTournament}
              setSelectedTournament={setSelectedTournament}
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              tournaments={tournaments}
              handleResetFilters={handleResetFilters}
              getProbabilityColor={getProbabilityColor}
            />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <HistoryTab
              matches={filteredMatches}
              selectedTournament={selectedTournament}
              setSelectedTournament={setSelectedTournament}
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              tournaments={tournaments}
              handleResetFilters={handleResetFilters}
            />
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-4">
            <TournamentsTab teamStats={teamStats} getFormColor={getFormColor} />
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <StatisticsTab teamStats={teamStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
