import { LayoutConfig } from "@/lib/layout-generator";
import { Badge } from "@/components/ui/badge";

export function LayoutPreview({ layout }: { layout: LayoutConfig }) {
  const navLabel =
    layout.navigation === "topbar" || layout.navigation === "expansive"
      ? "Topbar"
      : layout.navigation === "sidebar-large"
        ? "Sidebar ampla"
        : "Sidebar compacta";

  const cardRadius = layout.cardStyle === "round" ? "rounded-2xl" : "rounded-md";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-600">
        <Badge>{navLabel}</Badge>
        <Badge>Cards {layout.cards}</Badge>
        <Badge>Modo {layout.density}</Badge>
        <Badge>Tema {layout.theme}</Badge>
      </div>
      <div className="grid gap-4">
        <div className={`border border-mist-300 bg-mist-50 p-4 ${cardRadius}`}>
          <div className="flex items-center justify-between text-sm text-ink-700">
            <span>Navegacao</span>
            <span>{navLabel}</span>
          </div>
        </div>
        <div
          className={`grid gap-4 ${
            layout.cards === "list" ? "grid-cols-1" : layout.cards === "dual" ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {layout.widgets.map((widget) => (
            <div key={widget.key} className={`border border-mist-300 bg-white p-4 ${cardRadius}`}>
              <p className="text-xs uppercase text-ink-600">{widget.title}</p>
              <p className="mt-2 text-sm text-ink-700">{widget.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
