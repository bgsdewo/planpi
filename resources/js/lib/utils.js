import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const STATUS = {
    TODO: 'To Do',
    INPROGRESS: 'In Progress',
    ONREVIEW: 'On Review',
    Done: 'Done',
    UNKNOWN: 'Unknown',
};

export const PRIORITY = {
    URGENT: 'Urgent',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    UNKNOWN: 'Unknown',
};
