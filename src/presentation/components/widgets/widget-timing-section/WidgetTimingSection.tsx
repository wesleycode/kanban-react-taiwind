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
                <div className="flex gap-2 text-red-500">
                    <p className="text-zinc-500 font-normal">Status: atrasada</p>
                    <AlertCircle size={13} />
                </div>
            ) : isOneDayLeft ? (
                <div className="flex gap-2 text-yellow-500">
                    <p className="text-zinc-500 font-normal">Status: em breve</p>
                    <AlertTriangle size={13}/>
                </div>
            ) : (
                <div className="flex gap-2 text-green-500">
                    <p className="text-zinc-500 font-normal">Status: dentro do Prazo</p>
                    <CheckCircle size={13} />
                </div>
            )}
        </div>
    );
}