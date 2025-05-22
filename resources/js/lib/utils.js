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

export function flashMessage(params) {
    return params.props.flash_message;
}

export const messages = {
    503: {
        title: 'Service Unavailable',
        description: 'Sorry, we are doing some maintenance. Please check back soon',
        status: '503',
    },
    500: {
        title: 'Server Error',
        description: 'Oops.. something went wrong on our servers',
        status: '500',
    },
    404: {
        title: 'Not Found',
        description: 'Sorry, the page you are looking for could not be found',
        status: '404',
    },
    403: {
        title: 'Forbidden',
        description: 'Sorry, we are doing some maintenance. Please check back soon',
        status: '403',
    },
    401: {
        title: 'Unauthorized',
        description: 'Sorry, you are unauthorized to access this page',
        status: '401',
    },
    429: {
        title: 'Too Many Requests',
        description: 'Please try again in just a second',
        status: '429',
    },
};
