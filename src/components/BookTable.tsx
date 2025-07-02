// import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";

// export function BookList({ books, onEdit, onDelete, onBorrow }) {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Title</TableCell>
//           <TableCell>Author</TableCell>
//           <TableCell>Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {books.map((book) => (
//           <TableRow key={book.id}>
//             <TableCell>{book.title}</TableCell>
//             <TableCell>{book.author}</TableCell>
//             <TableCell>
//               <button onClick={() => onEdit(book)}>Edit</button>
//               <button onClick={() => onDelete(book.id)}>Delete</button>
//               <button onClick={() => onBorrow(book.id)}>Borrow</button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
