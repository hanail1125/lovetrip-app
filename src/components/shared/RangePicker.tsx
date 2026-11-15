import styled from '@emotion/styled';
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from 'date-fns';
import {ko} from 'date-fns/locale';
import {DateRange, DayPicker} from 'react-day-picker';

interface RangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (dateRange: {from?: string; to?: string; nights: number;}) => void;
}

function RangePicker({startDate, endDate, onChange}: RangePickerProps) {
  const today = new Date();

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) {
      return;
    }

    const {from, to} = dateRange;

    if (from && to && isSameDay(from, to)) {
      return;
    }

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    });
  };

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  };

  return (
    <Container>
      <DayPicker
        mode="range"
        locale={ko}
        numberOfMonths={5}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
        disabled={{
          before: addDays(new Date(), 1),
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 8px 16px 96px;

  .rdp {
    width: 100%;
  }

  .rdp-months {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 28px 12px 18px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
  }

  .rdp-caption {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 18px;
    color: #1c1917;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.03em;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 4px;
  }

  .rdp-head .rdp-head_row {
    font-size: 12px;
    height: 32px;
    color: rgba(28, 25, 23, 0.4);
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .rdp-tbody .rdp-row {
    height: 48px;
  }

  .rdp-cell .rdp-button {
    position: relative;
    width: 100%;
    line-height: 44px;
    border-radius: 999px;
    font-weight: 600;
    color: #1c1917;
  }

  .rdp-cell .rdp-button[disabled] {
    color: rgba(28, 25, 23, 0.22);
    font-weight: 400;
  }

  .rdp-day_selected {
    background-color: #d8b192;
  }

  .rdp-day_range_middle {
    background-color: #f3e6dc;
    border-radius: 0;
  }

  .rdp-cell .rdp-day_range_start,
  .rdp-cell .rdp-day_range_end {
    color: #ffffff;
  }

  .rdp-cell .rdp-day_range_start::after,
  .rdp-cell .rdp-day_range_end::after {
    z-index: -1;
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #c45c26;
    border-radius: 999px;
    content: '';
  }
`;

export default RangePicker;
