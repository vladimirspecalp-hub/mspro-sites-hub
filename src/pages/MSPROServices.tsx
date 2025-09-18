import { Header } from "@/components/mspro/blocks/Header";
import { Footer } from "@/components/mspro/blocks/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Paintbrush, 
  Shield, 
  Hammer, 
  Zap, 
  Building, 
  Wrench,
  Flame,
  Droplets
} from "lucide-react";
import { motion } from "framer-motion";

export default function MSPROServices() {
  const serviceCategories = [
    {
      title: "Фасадные работы",
      icon: Paintbrush,
      services: [
        { name: "Очистка фасада от старой краски ручным инструментом", unit: "м²", price: "180 ₽" },
        { name: "Гидроструйная очистка фасада", unit: "м²", price: "115 ₽" },
        { name: "Огрунтовка фасада валиком", unit: "м²", price: "65 ₽" },
        { name: "Огрунтовка фасада безвоздушным способом", unit: "м²", price: "49 ₽" },
        { name: "Окраска фасада в один слой валиком", unit: "м²", price: "110 ₽" },
        { name: "Окраска фасада безвоздушным способом", unit: "м²", price: "85 ₽" },
        { name: "Гидрофобизация фасада валиком или кистью", unit: "м²", price: "140 ₽" },
        { name: "Гидрофобизация фасада безвоздушным способом", unit: "м²", price: "105 ₽" }
      ]
    },
    {
      title: "Антикоррозийная защита (АКЗ)",
      icon: Shield,
      services: [
        { name: "Пескоструйная очистка до степени Sa 2,5", unit: "м²", price: "от 350 ₽" },
        { name: "Грунтовка антикоррозийная", unit: "м²", price: "от 120 ₽" },
        { name: "Окраска финишная в 2 слоя", unit: "м²", price: "от 180 ₽" },
        { name: "Маркировочная покраска (башни, мачты, трубы)", unit: "м²", price: "от 200 ₽" }
      ]
    },
    {
      title: "Такелажные работы",
      icon: Hammer,
      services: [
        { name: "Монтаж металлоконструкций", unit: "т", price: "от 15000 ₽" },
        { name: "Подъем грузов краном", unit: "час", price: "от 2500 ₽" },
        { name: "Сварочные работы на высоте", unit: "м.п.", price: "от 800 ₽" },
        { name: "Демонтаж металлоконструкций", unit: "т", price: "от 8000 ₽" }
      ]
    },
    {
      title: "Обслуживание ЛЭП и АМС",
      icon: Zap,
      services: [
        { name: "Покраска опор ЛЭП", unit: "шт", price: "от 25000 ₽" },
        { name: "Замена изоляторов", unit: "шт", price: "от 1200 ₽" },
        { name: "Ремонт проводов", unit: "м.п.", price: "от 450 ₽" },
        { name: "Обслуживание антенно-мачтовых сооружений", unit: "м²", price: "от 300 ₽" }
      ]
    },
    {
      title: "Кровельные работы",
      icon: Building,
      services: [
        { name: "Ремонт мягкой кровли", unit: "м²", price: "от 450 ₽" },
        { name: "Герметизация швов", unit: "м.п.", price: "от 350 ₽" },
        { name: "Установка снегозадержателей", unit: "м.п.", price: "от 680 ₽" },
        { name: "Очистка кровли от снега и наледи", unit: "м²", price: "от 85 ₽" }
      ]
    },
    {
      title: "Огнезащита металлоконструкций",
      icon: Flame,
      services: [
        { name: "Нанесение огнезащитных составов", unit: "м²", price: "от 280 ₽" },
        { name: "Огнезащита конструкций R15", unit: "м²", price: "от 320 ₽" },
        { name: "Огнезащита конструкций R30", unit: "м²", price: "от 450 ₽" },
        { name: "Огнезащита конструкций R45", unit: "м²", price: "от 580 ₽" }
      ]
    }
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
                Услуги и цены
              </h1>
              <p className="font-intro text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                Полный прайс-лист на промышленный альпинизм и высотные работы
              </p>
              <Badge variant="outline" className="mt-4 text-white border-white">
                Актуально на 1 февраля 2023 • БЕЗ УЧЁТА СТОИМОСТИ МАТЕРИАЛОВ
              </Badge>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {serviceCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                        <CardTitle className="font-metro text-2xl flex items-center gap-3">
                          <IconComponent className="h-8 w-8 text-primary" />
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="text-left p-4 font-metro font-semibold">Наименование работ</th>
                                <th className="text-center p-4 font-metro font-semibold min-w-20">Ед.изм.</th>
                                <th className="text-right p-4 font-metro font-semibold min-w-24">Стоимость</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.services.map((service, serviceIndex) => (
                                <motion.tr
                                  key={serviceIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: serviceIndex * 0.05 }}
                                  viewport={{ once: true }}
                                  className="border-b hover:bg-muted/20 transition-colors"
                                >
                                  <td className="p-4 font-intro">{service.name}</td>
                                  <td className="p-4 text-center font-intro text-muted-foreground">{service.unit}</td>
                                  <td className="p-4 text-right font-intro font-semibold text-primary">{service.price}</td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 bg-accent/10 border border-accent/20 rounded-lg p-6 text-center"
            >
              <p className="font-intro text-lg text-muted-foreground mb-2">
                📈 1 февраля расценки автоматически индексируются относительно инфляции в РФ
              </p>
              <p className="font-intro text-sm text-muted-foreground">
                Все цены указаны без учета стоимости материалов и могут изменяться в зависимости от сложности объекта
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}