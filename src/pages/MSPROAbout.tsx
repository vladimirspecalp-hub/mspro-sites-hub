import { Header } from "@/components/mspro/blocks/Header";
import { Footer } from "@/components/mspro/blocks/Footer";
import { Shield, Users, MapPin, Phone, Mail, Building } from "lucide-react";
import { motion } from "framer-motion";

export default function MSPROAbout() {
  const companyInfo = {
    fullName: "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «МЕТАЛИУМ СИСТЕМ ПРОТЕКТ»",
    shortName: "ООО «МСПРО»",
    ogrn: "1196313040330",
    inn: "6312197667",
    kpp: "631201001",
    registrationDate: "26 апреля 2019 г.",
    capital: "100 000 руб.",
    director: "Бровяков Владимир Андреевич",
    address: "443091, Самарская область, г. Самара, проспект Кирова, дом 275, комната 3, офис 29",
    phones: ["+7(903)335-45-35", "+7(937)205-23-11"],
    email: "specalp@ya.ru"
  };

  const services = [
    "Пескоструйная очистка металла",
    "Малярные работы на высоте", 
    "Фасадные кровельные работы",
    "Кровельные работы",
    "Такелажные работы",
    "Обслуживание ЛЭП и АМС", 
    "Услуги по антикоррозийной защите",
    "Огнезащита металлоконструкций"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-accent py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="font-metro text-4xl md:text-6xl font-bold mb-6">
                О компании МСПРО
              </h1>
              <p className="font-intro text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                Узкоспециализированная компания по высотным работам и промышленному альпинизму
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="font-metro text-3xl font-bold text-center mb-12 text-foreground">
                Наша деятельность
              </h2>
              
              <div className="bg-card rounded-lg p-8 shadow-lg mb-12">
                <p className="font-intro text-lg text-muted-foreground leading-relaxed mb-6">
                  Компания {companyInfo.shortName} занимается высотными работами (промышленный альпинизм), 
                  только в узкоспециализированном направлении, в основном это работы по ремонту и покраске 
                  дымовых труб, покраске линий электропередач.
                </p>
                <p className="font-intro text-lg text-muted-foreground leading-relaxed mb-6">
                  Другие виды работ берем в основном по загруженности это как монтаж металлоконструкций, 
                  герметизация швов и т.д.
                </p>
                <p className="font-intro text-lg text-muted-foreground leading-relaxed">
                  В 2021 году в связи с ухудшением экономической обстановки компания начала развивать 
                  направление по перевозке и доставке материала и оборудования на объект.
                </p>
              </div>

              {/* Services List */}
              <div className="bg-card rounded-lg p-8 shadow-lg mb-12">
                <h3 className="font-metro text-2xl font-bold mb-6 text-foreground">
                  Наши услуги
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-intro text-muted-foreground">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Company Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h3 className="font-metro text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Реквизиты компании
                  </h3>
                  <div className="space-y-3 font-intro text-muted-foreground">
                    <p><span className="font-semibold">Полное наименование:</span><br />{companyInfo.fullName}</p>
                    <p><span className="font-semibold">ОГРН:</span> {companyInfo.ogrn}</p>
                    <p><span className="font-semibold">ИНН/КПП:</span> {companyInfo.inn}/{companyInfo.kpp}</p>
                    <p><span className="font-semibold">Дата регистрации:</span> {companyInfo.registrationDate}</p>
                    <p><span className="font-semibold">Уставный капитал:</span> {companyInfo.capital}</p>
                    <p><span className="font-semibold">Руководитель:</span> {companyInfo.director}</p>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h3 className="font-metro text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Контактная информация
                  </h3>
                  <div className="space-y-4 font-intro text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{companyInfo.address}</span>
                    </div>
                    <div className="space-y-2">
                      {companyInfo.phones.map((phone, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${phone.replace(/\D/g, '')}`} 
                             className="hover:text-primary transition-colors">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${companyInfo.email}`} 
                         className="hover:text-primary transition-colors">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}