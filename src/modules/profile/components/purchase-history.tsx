import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PurchaseHistory = () => {
  const purchaseHistory = [
    {
      id: 1,
      title: '1984',
      author: 'Джордж Орвелл',
      date: '2023-05-15',
      price: '250 грн',
    },
    {
      id: 2,
      title: 'Майстер і Маргарита',
      author: 'Михайло Булгаков',
      date: '2023-06-02',
      price: '300 грн',
    },
    {
      id: 3,
      title: 'Гаррі Поттер і філософський камінь',
      author: 'Дж. К. Ролінг',
      date: '2023-06-20',
      price: '350 грн',
    },
  ];

  return (
    <AccordionItem value="purchase-history">
      <AccordionTrigger>Історія покупок</AccordionTrigger>
      <AccordionContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва книги</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Дата покупки</TableHead>
                <TableHead>Ціна</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.date}</TableCell>
                  <TableCell>{book.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PurchaseHistory;
