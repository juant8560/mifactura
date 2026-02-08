import {
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    producto: [
      { href: "/plantillas", label: "Plantillas" },
      { href: "/precios", label: "Precios" },
      { href: "/caracteristicas", label: "Características" },
    ],
    empresa: [
      { href: "/nosotros", label: "Nosotros" },
      { href: "/contacto", label: "Contacto" },
    ],
    legal: [
      { href: "/privacidad", label: "Privacidad" },
      { href: "/terminos", label: "Términos" },
    ],
  };

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="border-border border-t bg-card">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link className="mb-5 flex items-center gap-3" href="/">
              <div className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-foreground text-xl">
                FacturaPro
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-muted-foreground leading-relaxed">
              La plataforma de facturación más moderna de Honduras. Un producto
              de Inversiones San Juan Diego S. de R.L.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contacto@facturapro.hn</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+504 3296-0762</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Tegucigalpa, Honduras</span>
              </div>
            </div>
          </div>

          {/* Producto */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-border border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {currentYear} FacturaPro. Un producto de Inversiones San Juan
            Diego S. de R.L.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-white"
                href={social.href}
                key={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
