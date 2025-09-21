import dayjs from "dayjs";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

export function WidgetTimingSection({
    expires_at
}: { expires_at: string }) {

    const timeParsed = dayjs(expires_at, 'DD/MM/YYYY HH:mm:ss');
    const now = dayjs();
    const diffInDays = timeParsed.diff(now, 'day');
    const isExpired = timeParsed.isBefore(now);
    const isOneDayLeft = diffInDays === 1 || diffInDays === 0;

    return (
        <div className="flex gap-2">
            {isExpired ? (
                <AlertCircle size={13} className="text-red-500" />
            ) : isOneDayLeft ? (
                <AlertTriangle size={13} className="text-yellow-500" />
            ) : (
                <CheckCircle size={13} className="text-green-500" />
            )}
        </div>
    );
}