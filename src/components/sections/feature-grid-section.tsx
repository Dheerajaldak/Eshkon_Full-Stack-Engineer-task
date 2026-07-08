import * as Icons from "lucide-react";
import { Sparkles, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FeatureGridProps } from "@/core/schema";

function resolveIcon(name?: string): LucideIcon {
  if (!name) return Sparkles;
  const lib = Icons as unknown as Record<string, LucideIcon>;
  return lib[name] ?? Sparkles;
}

export function FeatureGridSection({ props }: { props: FeatureGridProps }) {
  return (
    <section className="border-t bg-muted/30">
      <div className="container py-20 md:py-28">
        {(props.heading || props.subheading) && (
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {props.heading ? (
              <h2 className="text-3xl font-heading font-bold tracking-tight md:text-4xl">{props.heading}</h2>
            ) : null}
            {props.subheading ? (
              <p className="mt-4 text-lg text-muted-foreground">{props.subheading}</p>
            ) : null}
          </div>
        )}

        <ul role="list" className="feature-grid" data-cols={props.columns ?? 3}>
          {props.features.map((feature, i) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <li key={`${feature.title}-${i}`}>
                <Card className="group h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">
                  <CardHeader>
                    <span className="mb-3 inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <CardTitle className="text-lg font-heading font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  {feature.description ? (
                    <CardContent className="text-muted-foreground">
                      {feature.description}
                    </CardContent>
                  ) : null}
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
