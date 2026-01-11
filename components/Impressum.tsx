import React from 'react';

const Impressum: React.FC = () => {
  return (
    <div className="bg-nm-light min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-serif font-black text-nm-dark mb-8">Impressum</h1>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Eintopf Gastro Managment GmbH</strong> <br />
              Zeil 2<br />
              60313 Frankfurt am Main<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Vertreten durch</h2>
            <p>
              Geschäftsführer: Norbert Janz
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Kontakt</h2>
            <p>
              Telefon: 069 75796768<br />
              E-Mail: nanmeieintopf@gmail.com<br />
              Webseite: www.nanmei-eintopf.de 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Frankfurt am Main<br />
              Registernummer: HRB 136616
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE452372283
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Redaktionell verantwortlich</h2>
            <p>
              Herr Zheng<br />
              E-Mail: nanmeieintopf@gmail.com<br />
              Adresse:Zeil 2, 60313 Frankfurt am Main
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-nm-blue hover:underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-nm-orange mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-8">
             <h3 className="font-bold mb-2">Haftung für Inhalte</h3>
             <p className="text-sm text-gray-500 mb-4">
               Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
             </p>
             <h3 className="font-bold mb-2">Haftung für Links</h3>
             <p className="text-sm text-gray-500 mb-4">
               Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
             </p>
             <h3 className="font-bold mb-2">Urheberrecht</h3>
             <p className="text-sm text-gray-500">
               Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Impressum;
