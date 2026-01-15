import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Filters } from './Filters';

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

interface PredictionsTabProps {
  predictions: Prediction[];
  selectedTournament: string;
  setSelectedTournament: (value: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  tournaments: string[];
  handleResetFilters: () => void;
  getProbabilityColor: (prob: number) => string;
}

export const PredictionsTab = ({
  predictions,
  selectedTournament,
  setSelectedTournament,
  selectedDateRange,
  setSelectedDateRange,
  tournaments,
  handleResetFilters,
  getProbabilityColor,
}: PredictionsTabProps) => {
  return (
    <>
      <Filters
        selectedTournament={selectedTournament}
        setSelectedTournament={setSelectedTournament}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        tournaments={tournaments}
        onResetFilters={handleResetFilters}
        resultsCount={predictions.length}
      />

      <div className="grid gap-4">
        {predictions.map((pred) => (
          <Card key={pred.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-lg font-medium">{pred.team1} vs {pred.team2}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  <Icon name="Calendar" size={12} className="mr-1" />
                  {pred.date}
                </Badge>
              </div>
              <Badge variant="secondary" className="text-xs w-fit">
                {pred.tournament}
              </Badge>
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
    </>
  );
};
