'use client';

import { useQueryState } from 'nuqs';
import { FC, useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import useDebounce from '@/hooks/use-debounce';
import { Book, Prices } from '@/types/book';
import { getMaxAndMinPrice } from '@/utils/books-utils';

interface BooksPriceSliderProps {
  books: Book[];
}

const BooksPriceSlider: FC<BooksPriceSliderProps> = ({ books }) => {
  const { min: defaultMin, max: defaultMax } = getMaxAndMinPrice(books);
  const [prices, setPrices] = useState<Prices>({
    min: defaultMin,
    max: defaultMax,
  });
  const [minPrice, setMinPrice] = useQueryState<number>('minPrice', {
    defaultValue: defaultMin,
    parse: (value) => parseInt(value, 10),
    shallow: false,
  });
  const [maxPrice, setMaxPrice] = useQueryState<number>('maxPrice', {
    defaultValue: defaultMax,
    parse: (value) => parseInt(value, 10),
    shallow: false,
  });

  const debouncedMinPrice = useDebounce(prices.min.toString(), 500);
  const debouncedMaxPrice = useDebounce(prices.max.toString(), 500);

  const onPriceChange = (values: number[]) => {
    setPrices({ max: values[1], min: values[0] });
  };

  useEffect(() => {
    setMinPrice(prices.min);
    setMaxPrice(prices.max);
  }, [debouncedMinPrice, debouncedMaxPrice, defaultMin, defaultMax]);

  return (
    <div className="space-y-1">
      <Label htmlFor="price">Ціна</Label>

      <Slider
        onValueChange={onPriceChange}
        defaultValue={[minPrice || defaultMin, maxPrice || defaultMax]}
        max={defaultMax}
        step={1}
      />
      <div className="mt-2 text-sm text-gray-500">
        ${prices.min} - ${prices.max}
      </div>
    </div>
  );
};

export default BooksPriceSlider;
