import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CtaProps } from "@/core/schema";

export function CtaSection({ props }: { props: CtaProps }) {
  return (
    <section className="border-t">
      <div className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-lg md:px-16">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-heading font-bold text-primary-foreground md:text-4xl">
              {props.heading}
            </h2>
            {props.description ? (
              <p className="mt-4 text-pretty text-lg text-primary-foreground/80">{props.description}</p>
            ) : null}
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" variant="outline" className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
                <Link href={props.href}>
                  {props.label}
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
