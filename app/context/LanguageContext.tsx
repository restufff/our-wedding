"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language, DictionaryKey } from "../i18n/dictionaries";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: DictionaryKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("id"); // Default to Indonesian
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Detect system language on mount
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("en")) {
            setLanguage("en");
        } else {
            setLanguage("id"); // Default for Indonesian or any other language
        }
    }, []);

    const t = (key: DictionaryKey): string => {
        return dictionaries[language][key] || key;
    };

    // Prevent layout shift/hydration mismatch by rendering invisible or default language until client is ready
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            <div style={{ opacity: isClient ? 1 : 0, transition: 'opacity 0.2s' }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
