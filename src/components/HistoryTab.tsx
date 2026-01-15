import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filters } from './Filters';

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

interface HistoryTabProps {
  matches: Match[];
  selectedTournament: string;
  setSelectedTournament: (value: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  tournaments: string[];
  handleResetFilters: () => void;
}

export const HistoryTab = ({
  matches,
  selectedTournament,
  setSelectedTournament,
  selectedDateRange,
  setSelectedDateRange,
  tournaments,
  handleResetFilters,
}: HistoryTabProps) => {
  return (
    <>
      <Filters
        selectedTournament={selectedTournament}
        setSelectedTournament={setSelectedTournament}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        tournaments={tournaments}
        onResetFilters={handleResetFilters}
        resultsCount={matches.length}
      />

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
                  <div className="text-sm text-muted-foreground mb-1">{match.date}</div>
                  <div className="text-xs text-muted-foreground">{match.tournament}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
