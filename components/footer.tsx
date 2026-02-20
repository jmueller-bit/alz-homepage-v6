import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  navigation: [
    { name: 'Startseite', href: '/' },
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Schule', href: '/schule' },
    { name: 'News', href: '/news' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
}

const contactInfo = {
  address: 'Mariahilfer Straße 123',
  city: '1060 Wien',
  phone: '+43 1 234 5678',
  email: 'info@astrid-lindgren-zentrum.at',
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-bold text-secondary">
              Astrid Lindgren Zentrum
            </h3>
            <p className="font-serif text-sm text-cream/70 max-w-xs">
              Eine Privatschule in Wien, die Kindern einen 
              kreativen und ganzheitlichen Bildungsweg bietet.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-secondary">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-serif text-sm text-cream/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-secondary">
              Kontakt
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-cream/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <span>
                  {contactInfo.address}<br />
                  {contactInfo.city}
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/70">
                <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-secondary transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/70">
                <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-secondary transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-secondary">
              Rechtliches
            </h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-serif text-sm text-cream/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8">
          <p className="font-serif text-center text-sm text-cream/50">
            © {new Date().getFullYear()} Astrid Lindgren Zentrum. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
