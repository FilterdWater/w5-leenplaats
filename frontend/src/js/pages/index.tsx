import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { Link } from "react-router";
import { AppLayout } from "@/js/layouts/app-layout";
import {
  Search,
  Smartphone,
  Camera,
  Bell,
  List,
  Users,
  Leaf,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/js/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/js/components/ui/card";
import { Badge } from "@/js/components/ui/badge";
// import { Separator } from "@/js/components/ui/separator";
import { Avatar, AvatarFallback } from "@/js/components/ui/avatar";
import { type BreadcrumbItem } from "@/js/types/app-layout";
// import { AppLogoIcon } from "../components/app-logo-icon";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Home",
    href: "/",
  },
];

export function Index() {
  useDocumentTitle("Home", "Home page");

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 divide-y">
        {/* Hero Section */}
        <section className=" flex flex-col items-center justify-center space-y-4 py-24 md:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent pr-1">
                Leenplaats
              </span>
            </h1>

            <p className="mx-auto text-lg text-muted-foreground md:text-xl">
              Verdien door te delen, bespaar door te lenen.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:py-32">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary">
              <List className="mr-1" />
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Alles wat je nodig hebt
            </h2>
            <p className="text-lg text-muted-foreground">
              Een complete oplossing voor het delen en lenen van spullen.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1 items-center justify-center">
                    <CardTitle>Adverteren</CardTitle>
                    <CardDescription>
                      Je spullen online beschikbaar maken is makkelijk en
                      overzichtelijk
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                    <Search className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1 items-center justify-center">
                    <CardTitle>Zoekfunctionaliteit</CardTitle>
                    <CardDescription>
                      Zoek, filter en sorteer om snel te vinden wat je nodig
                      hebt
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                    <NotebookPen className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1 items-center justify-center">
                    <CardTitle>Reserveren</CardTitle>
                    <CardDescription>
                      Een reserveringssysteem om items eenvoudig te lenen en
                      delen
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1 items-center justify-center">
                    <CardTitle>Notificaties</CardTitle>
                    <CardDescription>
                      Krijg meldingen wanneer er belangrijke dingen gebeuren
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PWA Section */}
        <section>
          <div className=" py-24 md:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="space-y-6">
                <Badge variant="secondary">
                  <Smartphone className="mr-1 h-4 w-4" />
                  Progressive Web App
                </Badge>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Werkt op elk platform
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Installeer Leenplaats als een PWA op elk platform met een
                    compatibele browser.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">
                      Installeerbaar op Mobile en Desktop
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Offline toegang</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Push notificaties</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Google account integratie</span>
                  </div>
                </div>
              </div>

              {/* Platform Logos Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* iOS/Safari */}
                <Card className="p-8 flex flex-col items-center justify-center space-y-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">iOS & Safari</h3>
                    <p className="text-sm text-muted-foreground">
                      iPhone, iPad & Mac
                    </p>
                  </div>
                </Card>

                {/* Android/Chrome */}
                <Card className="p-8 flex flex-col items-center justify-center space-y-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M1 18q.225-2.675 1.638-4.925T6.4 9.5L4.55 6.3q-.15-.225-.075-.475T4.8 5.45q.2-.125.45-.05t.4.3L7.5 8.9Q9.65 8 12 8t4.5.9l1.85-3.2q.15-.225.4-.3t.45.05q.25.125.325.375t-.075.475L17.6 9.5q2.35 1.325 3.762 3.575T23 18zm6-2.75q.525 0 .888-.363T8.25 14t-.363-.888T7 12.75t-.888.363T5.75 14t.363.888t.887.362m10 0q.525 0 .888-.363T18.25 14t-.363-.888T17 12.75t-.888.363t-.362.887t.363.888t.887.362"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">Android & Chrome</h3>
                    <p className="text-sm text-muted-foreground">
                      Smartphones & Tablets
                    </p>
                  </div>
                </Card>

                {/* Windows */}
                <Card className="p-8 flex flex-col items-center justify-center space-y-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M2.75 7.189V2.865c0-.102 0-.115.115-.115h8.622c.128 0 .14 0 .14.128V11.5c0 .128 0 .128-.14.128H2.865c-.102 0-.115 0-.115-.116zM7.189 21.25H2.865c-.102 0-.115 0-.115-.116V12.59c0-.128 0-.128.128-.128h8.635c.102 0 .115 0 .115.115v8.57c0 .09 0 .103-.116.103zM21.25 7.189v4.31c0 .116 0 .116-.116.116h-8.557c-.102 0-.128 0-.128-.115V2.865c0-.09 0-.102.115-.102h8.48c.206 0 .206 0 .206.205zm-8.763 9.661v-4.273c0-.09 0-.115.103-.09h8.621c.026 0 0 .09 0 .142v8.518a.06.06 0 0 1-.017.06a.06.06 0 0 1-.06.017H12.54s-.09 0-.077-.09V16.85z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">Windows</h3>
                    <p className="text-sm text-muted-foreground">
                      Desktop & Laptops
                    </p>
                  </div>
                </Card>

                {/* GNU/Linux */}
                <Card className="p-8 flex flex-col items-center justify-center space-y-4 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-600 rounded-2xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.7 17.6c-.1-.2-.2-.4-.2-.6c0-.4-.2-.7-.5-1c-.1-.1-.3-.2-.4-.2c.6-1.8-.3-3.6-1.3-4.9c-.8-1.2-2-2.1-1.9-3.7c0-1.9.2-5.4-3.3-5.1c-3.6.2-2.6 3.9-2.7 5.2c0 1.1-.5 2.2-1.3 3.1c-.2.2-.4.5-.5.7c-1 1.2-1.5 2.8-1.5 4.3c-.2.2-.4.4-.5.6c-.1.1-.2.2-.2.3c-.1.1-.3.2-.5.3c-.4.1-.7.3-.9.7c-.1.3-.2.7-.1 1.1c.1.2.1.4 0 .7c-.2.4-.2.9 0 1.4c.3.4.8.5 1.5.6c.5 0 1.1.2 1.6.4c.5.3 1.1.5 1.7.5c.3 0 .7-.1 1-.2c.3-.2.5-.4.6-.7c.4 0 1-.2 1.7-.2c.6 0 1.2.2 2 .1c0 .1 0 .2.1.3c.2.5.7.9 1.3 1h.2c.8-.1 1.6-.5 2.1-1.1c.4-.4.9-.7 1.4-.9c.6-.3 1-.5 1.1-1c.1-.7-.1-1.1-.5-1.7M12.8 4.8c.6.1 1.1.6 1 1.2q0 .45-.3.9h-.1c-.2-.1-.3-.1-.4-.2c.1-.1.1-.3.2-.5c0-.4-.2-.7-.4-.7c-.3 0-.5.3-.5.7v.1c-.1-.1-.3-.1-.4-.2V6c-.1-.5.3-1.1.9-1.2m-.3 2c.1.1.3.2.4.2s.3.1.4.2c.2.1.4.2.4.5s-.3.6-.9.8c-.2.1-.3.1-.4.2c-.3.2-.6.3-1 .3c-.3 0-.6-.2-.8-.4c-.1-.1-.2-.2-.4-.3c-.1-.1-.3-.3-.4-.6c0-.1.1-.2.2-.3c.3-.2.4-.3.5-.4l.1-.1c.2-.3.6-.5 1-.5c.3.1.6.2.9.4M10.4 5c.4 0 .7.4.8 1.1v.2c-.1 0-.3.1-.4.2v-.2c0-.3-.2-.6-.4-.5c-.2 0-.3.3-.3.6c0 .2.1.3.2.4c0 0-.1.1-.2.1c-.2-.2-.4-.5-.4-.8c0-.6.3-1.1.7-1.1m-1 16.1c-.7.3-1.6.2-2.2-.2c-.6-.3-1.1-.4-1.8-.4c-.5-.1-1-.1-1.1-.3s-.1-.5.1-1q.15-.45 0-.9c-.1-.3-.1-.5 0-.8s.3-.4.6-.5s.5-.2.7-.4c.1-.1.2-.2.3-.4c.3-.4.5-.6.8-.6c.6.1 1.1 1 1.5 1.9c.2.3.4.7.7 1c.4.5.9 1.2.9 1.6c0 .5-.2.8-.5 1m4.9-2.2c0 .1 0 .1-.1.2c-1.2.9-2.8 1-4.1.3l-.6-.9c.9-.1.7-1.3-1.2-2.5c-2-1.3-.6-3.7.1-4.8c.1-.1.1 0-.3.8c-.3.6-.9 2.1-.1 3.2c0-.8.2-1.6.5-2.4c.7-1.3 1.2-2.8 1.5-4.3c.1.1.1.1.2.1c.1.1.2.2.3.2c.2.3.6.4.9.4h.1c.4 0 .8-.1 1.1-.4c.1-.1.2-.2.4-.2q.45-.15.9-.6c.4 1.3.8 2.5 1.4 3.6c.4.8.7 1.6.9 2.5c.3 0 .7.1 1 .3c.8.4 1.1.7 1 1.2H18c0-.3-.2-.6-.9-.9s-1.3-.3-1.5.4c-.1 0-.2.1-.3.1c-.8.4-.8 1.5-.9 2.6c.1.4 0 .7-.1 1.1m4.6.6c-.6.2-1.1.6-1.5 1.1c-.4.6-1.1 1-1.9.9c-.4 0-.8-.3-.9-.7c-.1-.6-.1-1.2.2-1.8c.1-.4.2-.7.3-1.1c.1-1.2.1-1.9.6-2.2c0 .5.3.8.7 1c.5 0 1-.1 1.4-.5h.2c.3 0 .5 0 .7.2s.3.5.3.7c0 .3.2.6.3.9c.5.5.5.8.5.9c-.1.2-.5.4-.9.6m-9-12c-.1 0-.1 0-.1.1c0 0 0 .1.1.1s.1.1.1.1c.3.4.8.6 1.4.7c.5-.1 1-.2 1.5-.6l.6-.3c.1 0 .1-.1.1-.1c0-.1 0-.1-.1-.1c-.2.1-.5.2-.7.3c-.4.3-.9.5-1.4.5s-.9-.3-1.2-.6c-.1 0-.2-.1-.3-.1"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">GNU/Linux</h3>
                    <p className="text-sm text-muted-foreground">
                      Ubuntu, Fedora, etc.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className=" py-24 md:py-32">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary">
              <Users className="mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Wat gebruikers zeggen
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Maria Janssen</CardTitle>
                    <CardDescription>Amsterdam Noord</CardDescription>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  “Geweldig platform! Ik heb mijn boormachine al 5 keer verhuurd
                  deze maand.”
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>PD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Pieter de Vries</CardTitle>
                    <CardDescription>Utrecht Centrum</CardDescription>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  “Perfect voor klussen! In plaats van alles te kopen, kan ik nu
                  gereedschap lenen. Veel goedkoper en duurzamer.”
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Sophie Klaassen</CardTitle>
                    <CardDescription>Rotterdam West</CardDescription>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  “De app werkt super intuïtief. Offline functionaliteit is
                  handig, en de notificaties zorgen dat ik niks mis.”
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className=" py-24 md:py-32">
            <div className="flex flex-col items-center space-y-6 text-center">
              <Badge variant="secondary">
                <Leaf className="mr-1" />
                Klaar om te beginnen?
              </Badge>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Maak een account
                </h2>
                <p className="text-lg text-muted-foreground">
                  Start vandaag nog met het delen en lenen in jou buurt en draag
                  bij aan een duurzamere wereld.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="auth/sign-up">Aanmelden</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="more-info">Meer informatie</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className=" py-12">
            {/* <div className="grid gap-8 md:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AppLogoIcon className="h-6 w-6" />
                  <span className="font-bold text-xl">Leenplaats</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Het platform voor duurzaam spullen delen en lenen in jouw
                  buurt.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Platform</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Hoe het werkt
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Veiligheid
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Voorwaarden
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Help centrum
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Ontwikkelaars</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      API documentatie
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Changelog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="my-8" /> */}

            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-muted-foreground">
                &copy; 2025 Leenplaats
              </p>
              <div className="text-sm text-muted-foreground flex flex-col lg:flex-row gap-1">
                <span>Een school project gemaakt door</span>
                <div className="flex gap-1">
                  <span>|</span>
                  <a
                    href="https://github.com/FilterdWater"
                    target="_blank"
                    className="hover:underline"
                  >
                    FilterdWater
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/Nacuy"
                    target="_blank"
                    className="hover:underline"
                  >
                    Nacuy
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/Deruach"
                    target="_blank"
                    className="hover:underline"
                  >
                    Deruach
                  </a>
                  <span>|</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}
