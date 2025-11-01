export type TimeEntryType = 'in' | 'out';

export interface TimeEntry {
  type: TimeEntryType;
  timestamp: string; // ISO string format for easy storage
}