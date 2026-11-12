import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import Script from 'next/script';

import { headers } from 'next/headers';
import { LanguagePicker } from '@/components/language/LanguagePicker';
import { Header as EnglishHeader } from '@/locales/en/components/Header';
import { Header as KyrgyzHeader } from '@/locales/ky/components/Header';
import { Footer as EnglishFooter } from '@/locales/en/components/Footer';
import { Footer as KyrgyzFooter } from '@/locales/ky/components/Footer';
import { RouteGuard as EnglishGuard } from '@/locales/en/components/RouteGuard';
import { RouteGuard as KyrgyzGuard } from '@/locales/ky/components/RouteGuard';
import { home as englishHome } from '@/locales/en/app/resources/content';
import { home as kyrgyzHome } from '@/locales/ky/app/resources/content';
import classNames from "classnames";

import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style, display } from "@/app/resources";

import { Inter } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";

import { person, home } from "@/app/resources/content";
import { Background, Column, Flex, ToastProvider } from "@/once-ui/components";

export async function generateMetadata() {
  const locale = headers().get('x-site-language') ?? 'ru';
  const localizedHome = locale === 'en' ? englishHome : locale === 'ky' ? kyrgyzHome : home;
  return {
    metadataBase: new URL(`https://${baseURL}`),
    title: localizedHome.title,
    description: localizedHome.description,
    openGraph: {
      title: localizedHome.title,
      description: localizedHome.description,
      url: baseURL,
      siteName: localizedHome.title,
      locale: locale === "en" ? "en_US" : locale === "ky" ? "ky_KG" : "ru_RU",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const language = headers().get('x-site-language');
  const locale = language === 'en' || language === 'ky' ? language : 'ru';
  const SiteHeader = locale === 'en' ? EnglishHeader : locale === 'ky' ? KyrgyzHeader : Header;
  const SiteFooter = locale === 'en' ? EnglishFooter : locale === 'ky' ? KyrgyzFooter : Footer;
  const SiteGuard = locale === 'en' ? EnglishGuard : locale === 'ky' ? KyrgyzGuard : RouteGuard;
  return (
    <Flex
      as="html"
      lang={locale}
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        code.variable,
      )}
    >
      <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-KRB9EEC6RS`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KRB9EEC6RS');
            `,
          }}
        />
      
    
      <ToastProvider>
        <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
          <Background
            mask={{
              cursor: effects.mask.cursor,
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
            }}
            gradient={{
              display: effects.gradient.display,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
              opacity: effects.gradient.opacity as
                | 0
                | 10
                | 20
                | 30
                | 40
                | 50
                | 60
                | 70
                | 80
                | 90
                | 100,
            }}
            dots={{
              display: effects.dots.display,
              color: effects.dots.color,
              size: effects.dots.size as any,
              opacity: effects.dots.opacity as any,
            }}
            grid={{
              display: effects.grid.display,
              color: effects.grid.color,
              width: effects.grid.width as any,
              height: effects.grid.height as any,
              opacity: effects.grid.opacity as any,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as any,
            }}
          />
          <Flex fillWidth minHeight="16"></Flex>
          <LanguagePicker locale={locale} timeZone={person.location} showTime={display.time} />
          <SiteHeader />
          <Flex
            position="relative"
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <SiteGuard>{children}</SiteGuard>
            </Flex>
          </Flex>
          <SiteFooter />
        </Column>
      </ToastProvider>
    </Flex>
  );
}
