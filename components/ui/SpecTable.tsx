import type { Vehicle } from '@/lib/vehicles';

export function SpecTable({ specs }: { specs: Vehicle['specs'] }) {
  return (
    <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3 md:gap-x-[var(--gutter)]">
      {specs.map((g) => (
        <table key={g.group} className="h-fit self-start w-full border-collapse text-spec tabular" data-reveal="fade">
          <caption className="label mb-4 text-left text-ink-muted">{g.group}</caption>
          <tbody>
            {g.rows.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="py-4 pr-4 text-left font-normal text-ink-muted">{r.label}</th>
                <td className="py-4 text-right text-ink">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
