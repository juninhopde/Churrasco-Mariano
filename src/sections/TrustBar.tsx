import { trustItems } from '../data/trust';

export const TrustBar = () => (
  <section className="border-y border-carvao/10 bg-creme py-10">
    <div className="mx-auto grid w-full max-w-content gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
      {trustItems.map((item) => (
        <div key={item.label}>
          <p className="font-display text-2xl text-fogo sm:text-3xl">{item.value}</p>
          <p className="mt-1 text-sm text-carvao/70">{item.label}</p>
        </div>
      ))}
    </div>
  </section>
);
