import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface FiltersProps {
  selectedTournament: string;
  setSelectedTournament: (value: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  tournaments: string[];
  onResetFilters: () => void;
  resultsCount: number;
}

export const Filters = ({
  selectedTournament,
  setSelectedTournament,
  selectedDateRange,
  setSelectedDateRange,
  tournaments,
  onResetFilters,
  resultsCount,
}: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <Select value={selectedTournament} onValueChange={setSelectedTournament}>
        <SelectTrigger className="w-[200px]">
          <Icon name="Trophy" size={16} className="mr-2" />
          <SelectValue placeholder="Турнир" />
        </SelectTrigger>
        <SelectContent>
          {tournaments.map((t) => (
            <SelectItem key={t} value={t}>
              {t === 'all' ? 'Все турниры' : t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
        <SelectTrigger className="w-[200px]">
          <Icon name="Calendar" size={16} className="mr-2" />
          <SelectValue placeholder="Период" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все даты</SelectItem>
          <SelectItem value="week">Последние 7 дней</SelectItem>
          <SelectItem value="upcoming">Следующие 7 дней</SelectItem>
        </SelectContent>
      </Select>

      {(selectedTournament !== 'all' || selectedDateRange !== 'all') && (
        <Button variant="outline" size="sm" onClick={onResetFilters}>
          <Icon name="X" size={16} className="mr-1" />
          Сбросить
        </Button>
      )}

      <div className="ml-auto text-sm text-muted-foreground">
        Найдено: {resultsCount}
      </div>
    </div>
  );
};
