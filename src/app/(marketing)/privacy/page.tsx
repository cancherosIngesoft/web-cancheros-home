import { Metadata } from "next";
import privacyContent from "../../../utils/data/privacy_policy.json";

export const metadata: Metadata = {
  title: privacyContent.title,
  description: privacyContent.description,
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-slate max-w-4xl mx-auto">
        {/* Título Principal */}
        <h1 className="text-3xl font-bold mb-8">{privacyContent.title}</h1>

        {/* Secciones */}
        {privacyContent.sections.map((section) => (
          <section key={section.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {section.id}. {section.title}
            </h2>

            {/* Contenido General */}
            {section.content && (
              <p className="text-gray-700 leading-relaxed mb-4">
                {section.content}
              </p>
            )}

            {/* Definiciones */}
            {section.definitions && (
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {section.definitions.map((def, index) => (
                  <div key={index} className="mb-4">
                    <dt className="font-semibold text-gray-900">{def.term}:</dt>
                    <dd className="text-gray-700 ml-4">{def.description}</dd>
                  </div>
                ))}
              </div>
            )}

            {/* Requisitos */}
            {section.requirements && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Requisitos:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Derechos */}
            {section.rights && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Derechos:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.rights.map((right, index) => (
                    <li key={index} className="text-gray-700">
                      {right}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Personas Autorizadas */}
            {section.authorized_persons && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  Personas Autorizadas:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.authorized_persons.map((person, index) => (
                    <li key={index} className="text-gray-700">
                      {person}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Subsecciones */}
            {section.subsections &&
              section.subsections.map((subsection, index) => (
                <div key={index} className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {subsection.subtitle}
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {subsection.obligations.map((obligation, idx) => (
                      <li key={idx} className="text-gray-700">
                        {obligation}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            {/* Propósitos */}
            {section.purposes && (
              <div className="space-y-6">
                {Object.entries(section.purposes).map(([key, purposes]) => (
                  <div key={key} className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {key === "clients" ? "Clientes" : "Empleados"}:
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {purposes.map((purpose: string, idx: number) => (
                        <li key={idx} className="text-gray-700">
                          {purpose}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Condiciones de Transferencia */}
            {section.transfer_conditions && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">
                  Condiciones de Transferencia:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.transfer_conditions.map((condition, index) => (
                    <li key={index} className="text-gray-700">
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Emails de Contacto */}
            {section.contact_emails && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-semibold mb-2">Contacto:</p>
                <ul className="space-y-1">
                  {section.contact_emails.map((email, index) => (
                    <li key={index}>
                      <a
                        href={`mailto:${email}`}
                        className="text-gray-700 hover:text-[#1A6B51] transition-colors duration-200"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Procedimientos */}
            {section.procedures && (
              <div className="space-y-6">
                {Object.entries(section.procedures).map(([key, proc]) => (
                  <div key={key} className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {key === "consulta" ? "Consulta" : "Reclamo"}:
                    </h3>
                    <p className="text-gray-700">
                      Término: {proc.term}
                      {proc.extension && ` (Extensión: ${proc.extension})`}
                    </p>
                    {"requirements" in proc && (
                      <div className="mt-2">
                        <h4 className="font-semibold">Requisitos:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {(proc.requirements as string[]).map((req, idx) => (
                            <li key={idx} className="text-gray-700">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Condiciones y Excepciones */}
            {section.conditions && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Condiciones:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.conditions.map((condition, index) => (
                    <li key={index} className="text-gray-700">
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.exceptions && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Excepciones:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {section.exceptions.map((exception, index) => (
                    <li key={index} className="text-gray-700">
                      {exception}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Pie de página */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Última actualización: Noviembre 2024
          </p>
        </footer>
      </article>
    </div>
  );
}
