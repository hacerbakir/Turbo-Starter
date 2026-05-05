import React from 'react';
import { notFound } from 'next/navigation';


interface DefaultLayoutProps {
  locale: string;
  slug: string;
}

export default async function DefaultLayout({ children, locale, slug }: React.PropsWithChildren<DefaultLayoutProps>) {
  if (!locale) return notFound();

  return (
    <>
      {/* <Header locale={locale} slug={slug} /> */}
      {children}
      {/* <Footer locale={locale} slug={slug} /> */}
    </>
  );
}
