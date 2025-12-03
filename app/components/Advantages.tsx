import { Package, ShieldCheck, UserCheck } from "lucide-react";

type Feature = {
  id: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FEATURES: Feature[] = [
  { id: "comfort", title: "Conforto e Segurança", Icon: ShieldCheck },
  { id: "driver", title: "Motorista Experiente", Icon: UserCheck },
  { id: "luggage", title: "Bagageiro disponível", Icon: Package },
];
function FeatureCard({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ComponentType<any>;
}) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#EAF6FB] text-[#005F8C] mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
    </div>
  );
}

export default function Advantages() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#005F8C]">
            Por que escolher nosso serviço?
          </h2>
          <p className="mt-2 text-slate-600">
            Viagens confortáveis e com preço justo para o Rio de Janeiro
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <FeatureCard key={f.id} title={f.title} Icon={f.Icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
