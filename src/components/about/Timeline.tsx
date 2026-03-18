interface TimelineEvent {
  period: string;
  role: string;
  organization: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  label: string;
}

export function Timeline({ events, label }: TimelineProps) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{label}</h2>
      <div className="relative pl-6 border-l border-[var(--border)]">
        {events.map((event, i) => (
          <div key={i} className="relative mb-8 last:mb-0">
            {/* Dot */}
            <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-accent" />
            <div className="text-sm text-[var(--text-secondary)] mb-1">
              {event.period}
            </div>
            <div className="font-medium">{event.role}</div>
            <div className="text-sm text-accent">{event.organization}</div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
