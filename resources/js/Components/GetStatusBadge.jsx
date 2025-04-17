import { STATUS } from '@/lib/utils';

export default function GetStatusBadge({ status }) {
    const { TODO, INPROGRESS, ONREVIEW, DONE, UNKNOWN } = STATUS;
    let badge, text;
    switch (priority) {
        case TODO:
            badge = 'bg-red-500 hover:bg-red-600';
            text = TODO;
            break;
        case INPROGRESS:
            badge = 'bg-yellow-500 hover:bg-red-600';
            text = INPROGRESS;
            break;
        case ONREVIEW:
            badge = 'bg-blue-500 hover:bg-red-600';
            text = ONREVIEW;
            break;
        case DONE:
            badge = 'bg-green-500 hover:bg-red-600';
            text = DONE;
            break;

        default:
            badge = '';
            text = UNKNOWN;
    }
    return <Badge className={badge}>{text}</Badge>;
}
