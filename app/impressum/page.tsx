import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum des Astrid Lindgren Zentrums - Rechtliche Informationen.',
}

export default function ImpressumPage() {
  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Impressum
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none font-serif text-charcoal/80">
            <h2 className="font-sans text-2xl font-bold text-charcoal">Angaben gemäß § 5 ECG</h2>
            
            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Medieninhaber</h3>
            <p>
              Astrid Lindgren Zentrum<br />
              Mariahilfer Straße 123<br />
              1060 Wien<br />
              Österreich
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Kontakt</h3>
            <p>
              Telefon: +43 1 234 5678<br />
              E-Mail: info@astrid-lindgren-zentrum.at
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Vertretungsbefugte Organe</h3>
            <p>
              Dr. Maria Schmidt (Schuldirektorin)<br />
              Thomas Weber (Stellvertreter)
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Unternehmensgegenstand</h3>
            <p>Privatschule für allgemeinbildende Pflichtschulen und weiterführende Schulen</p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">UID-Nummer</h3>
            <p>ATU12345678</p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Firmensitz</h3>
            <p>Wien</p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Gewerberechtliche Vorschriften</h3>
            <p>Gewerbeordnung: www.ris.bka.gv.at</p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Mitgliedschaft</h3>
            <p>
              Wirtschaftskammer Wien<br />
              Fachgruppe: Private Bildungsanbieter
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Haftungsausschluss</h3>
            <p>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. 
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter 
              sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen 
              Gesetzen verantwortlich (§ 7 Abs. 1 ECG). Wir sind jedoch nicht 
              verpflichtet, übermittelte oder gespeicherte fremde Informationen 
              zu überwachen oder nach Umständen zu forschen, die auf eine 
              rechtswidrige Tätigkeit hinweisen (§ 8 bis 10 ECG).
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf 
              diesen Seiten unterliegen dem österreichischen Urheberrecht. 
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen 
              der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Bildnachweise</h3>
            <p>
              Die verwendeten Bilder stammen von Unsplash und sind lizenzfrei 
              nutzbar.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">Verbraucherstreitbeilegung</h3>
            <p>
              Die Europäische Kommission stellt eine Plattform zur 
              Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline">
                https://ec.europa.eu/consumers/odr
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
