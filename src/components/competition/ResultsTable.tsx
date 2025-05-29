import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Athlete {
  id: string;
  name: string;
  position: number;
  bestAttempt: number;
  totalPoints: number;
  attemptsRemaining: number;
}

interface ResultsTableProps {
  athletes: Athlete[];
}

export function ResultsTable({ athletes }: ResultsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pos</TableHead>
            <TableHead>Atleta</TableHead>
            <TableHead>Mejor Intento</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Intentos Restantes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow key={athlete.id}>
              <TableCell className="font-medium">{athlete.position}</TableCell>
              <TableCell>{athlete.name}</TableCell>
              <TableCell>{athlete.bestAttempt} kg</TableCell>
              <TableCell>{athlete.totalPoints}</TableCell>
              <TableCell>{athlete.attemptsRemaining}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 