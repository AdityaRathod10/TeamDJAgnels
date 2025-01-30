'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, SUPPORTED_LANGUAGES } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang in SUPPORTED_LANGUAGES) {
      setLanguage(savedLang as Language);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  const t = (key: keyof typeof translations.en): string => {
    const translation = (translations[language] as typeof translations.en)[key];
    if (typeof translation === 'string') {
      return translation;
    }
    return typeof translations.en[key] === 'string' ? translations.en[key] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  
type TranslationKeys = 

| 'reviews'

| 'dashboard'

| 'inventory'

| 'ratings'

| 'sustainability'

| 'settings'

| 'logout'

| 'welcomeMessage'

| 'addNewItem'

| 'totalOrders'

| 'totalRevenue'

| 'averageOrder'

| 'priceReports'

| 'inventory.title'

| 'inventory.addVegetable'

| 'inventory.name'

| 'inventory.price'

| 'inventory.stock'

| 'inventory.actions';

  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
