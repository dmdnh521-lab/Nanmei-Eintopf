import React from 'react';

const Reservation: React.FC = () => {
  return (
    <section id="reservation" className="py-24 bg-nm-pink/20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border-4 border-white">
            
          {/* Left Side: Image/Info */}
          <div className="w-full md:w-2/5 bg-nm-orange p-10 flex flex-col justify-between text-white relative overflow-hidden">
             {/* Decorative Circles */}
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
             <div className="absolute bottom-10 -left-10 w-32 h-32 bg-nm-blue/50 rounded-full blur-2xl"></div>

             <div className="relative z-10">
                <h3 className="text-3xl font-serif font-black mb-4">Tisch Reservieren</h3>
                <p className="text-white/90 font-medium text-sm leading-relaxed mb-8">
                    Bereit für ein scharfes Festmahl? Reservieren Sie Ihren Platz bei Nanmei Eintopf.
                    <br/><br/>
                    <span className="font-serif text-2xl">Jetzt anfragen!</span>
                </p>
                <div className="space-y-3 text-sm font-bold bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="flex justify-between"><span>Mo - So</span> <span>12:00 - 23:00</span></p>
                </div>
             </div>
             <div className="relative z-10 mt-10 pt-8 border-t border-white/20">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Adresse</p>
                <p className="font-bold text-lg">Zeil 2, 60313 Frankfurt</p>
             </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-3/5 p-10 md:p-12">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Name</label>
                    <input type="text" className="w-full bg-nm-light border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-nm-orange focus:ring-1 focus:ring-nm-orange transition-all text-nm-dark font-bold" placeholder="Ihr Name" />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Telefon</label>
                    <input type="tel" className="w-full bg-nm-light border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-nm-orange focus:ring-1 focus:ring-nm-orange transition-all text-nm-dark font-bold" placeholder="Handynummer" />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Datum</label>
                    <input type="date" className="w-full bg-nm-light border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-nm-orange focus:ring-1 focus:ring-nm-orange transition-all text-nm-dark font-bold" />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Zeit</label>
                    <select className="w-full bg-nm-light border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-nm-orange focus:ring-1 focus:ring-nm-orange transition-all text-nm-dark font-bold">
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Personen</label>
                    <select className="w-full bg-nm-light border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-nm-orange focus:ring-1 focus:ring-nm-orange transition-all text-nm-dark font-bold">
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                    </select>
                </div>
                </div>

                <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Anmerkungen</label>
                <textarea className="w-full bg-nm-light border border-gray-200 rounded-lg px-4 py-3 h-24 focus:outline-none focus:border-nm-orange focus:ring-1 focus:ring-nm-orange transition-all text-nm-dark resize-none" placeholder="Allergien, Außenbereich..."></textarea>
                </div>

                <button type="button" className="w-full bg-nm-dark hover:bg-nm-orange text-white font-bold py-4 rounded-xl uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Reservierung Bestätigen
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;