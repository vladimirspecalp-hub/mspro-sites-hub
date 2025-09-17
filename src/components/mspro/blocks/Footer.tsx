import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Logo } from '../ui/Logo';

const navigation = {
  services: [
    { name: 'Промышленный альпинизм', href: '/services/alpinizm' },
    { name: 'Антикоррозийная защита', href: '/services/antikorroziya' },
    { name: 'Герметизация швов', href: '/services/germetizaciya' },
    { name: 'Очистка фасадов', href: '/services/fasad-cleaning' },
    { name: 'Ремонт кровли', href: '/services/remont-krovli' },
  ],
  company: [
    { name: 'О компании', href: '/about' },
    { name: 'Наши кейсы', href: '/cases' },
    { name: 'Контакты', href: '/contacts' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo variant="dark" size="md" />
            <p className="text-sm text-primary-foreground/80 font-intro">
              Профессиональные услуги промышленного альпинизма и антикоррозийной защиты
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-intro font-semibold">
                ...Extend the Life of Metal...
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div>+7 (123) 456-78-90</div>
                  <div className="text-primary-foreground/80">Звонки принимаются</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div>info@mspro.ru</div>
                  <div className="text-primary-foreground/80">Ответим в течение часа</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div>г. Москва</div>
                  <div className="text-primary-foreground/80">ул. Промышленная, 15</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div>Пн-Пт: 9:00-18:00</div>
                  <div className="text-primary-foreground/80">Сб-Вс: по договоренности</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/80">
            © 2024 MSPRO. Все права защищены.
          </p>
          <p className="text-sm text-primary-foreground/80 mt-2 md:mt-0">
            Лицензия на высотные работы № 12345
          </p>
        </div>
      </div>
    </footer>
  );
}