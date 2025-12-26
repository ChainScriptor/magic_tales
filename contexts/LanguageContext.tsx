import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'el';

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      login: 'Login',
      bookCall: 'Book a Call',
      previewBook: 'Preview Book',
    },
    hero: {
      title: {
        line1: 'Create Magical',
        line2: 'Fairy Tales',
        line3: 'for',
        everyone: 'Everyone',
      },
      subtitle: 'Transform your child\'s photo into an enchanting personalized storybook',
      badge: 'Premium Member',
      card: {
        title: 'Join the<br/>Magic',
        subtitle: 'Get unlimited access to personalized fairy tales and magical stories',
        call: 'Book a Call',
        schedule: 'Schedule Now',
      },
    },
    imageUpload: {
      uploadFile: 'Upload a photo',
      dragDrop: 'Drag and drop your image here, or click to browse',
      dropIt: 'Drop it here',
    },
    bookCreation: {
      firstMessage: 'Hi! I\'m here to help you create a magical fairy tale. First, let\'s start by uploading a photo of your child.',
      thanks: 'Perfect! I can see the photo. Now, what\'s your child\'s name?',
      enterName: 'Enter your child\'s name',
      continue: 'Continue',
      describe: 'Great! Now, can you tell me a bit about your child?',
      skip: 'Skip',
      girl: 'Girl',
      boy: 'Boy',
      howOld: 'How old is {name}?',
      they: 'they',
      enterAge: 'Enter age',
      hereTheyAre: 'Here\'s {name}! What do you think?',
      them: 'them',
      almostThere: 'Almost there! Enter your email to receive your personalized fairy tale book.',
      terms: 'By continuing, you agree to our <a href="#" class="underline">Terms of Service</a> and <a href="#" class="underline">Privacy Policy</a>',
      emailPlaceholder: 'Enter your email',
      dontLike: "I don't like it",
      looksGreat: 'Looks great!',
      yearsOld: 'years old',
    },
    work: {
      label: 'Our Work',
      title: 'See the<br/>Magic',
      subtitle: 'Explore our collection of personalized fairy tales and magical stories',
      seeWork: 'See Our Work',
      magic: {
        label: 'The Magic',
        title: 'Create Your<br/>Story',
        subtitle: 'Upload a photo and watch as we transform it into a magical fairy tale',
        generating: 'Generating your story...',
        generate: 'Generate Story',
      },
    },
    pricing: {
      label: 'Pricing',
      title: 'Simple,<br/>Transparent',
      standard: {
        mostPopular: 'Most Popular',
        title: 'Standard',
        desc: 'Perfect for individuals and small families',
        unlimited: 'Unlimited fairy tale requests',
        delivery: 'Fast 24-48 hour delivery',
        revisions: 'Unlimited revisions',
        slack: 'Direct Slack communication',
        pause: 'Pause or cancel anytime',
        getStarted: 'Get Started',
      },
      pro: {
        title: 'Pro',
        desc: 'For businesses and larger families',
        requests: 'Priority requests',
        delivery: 'Same-day delivery available',
        video: 'Video story options',
        calls: 'Monthly strategy calls',
        illustrations: 'Custom illustrations',
        contact: 'Contact Us',
      },
      projectBasis: 'Need something specific? <a href="#" class="underline">Contact us</a> for project-based pricing',
    },
    howItWorks: {
      title: 'How It<br/>Works',
      subscribe: {
        title: '1. Subscribe',
        desc: 'Choose a plan that works for you',
      },
      request: {
        title: '2. Request',
        desc: 'Submit your child\'s photo and preferences',
      },
      receive: {
        title: '3. Receive',
        desc: 'Get your personalized fairy tale delivered',
      },
    },
    benefits: {
      label: 'Benefits',
      title: 'Why Choose<br/>MagicTales',
      subtitle: 'Experience the magic of personalized storytelling',
      designBoard: {
        title: 'Design Board',
        desc: 'Track all your requests in one place',
      },
      flatRate: {
        title: 'Flat Rate',
        desc: 'No hidden fees, just one simple price',
      },
      rapidDelivery: {
        title: 'Rapid Delivery',
        desc: 'Get your stories fast, usually within 24-48 hours',
      },
      seniorTalent: {
        title: 'Senior Talent',
        desc: 'Work with experienced storytellers and illustrators',
      },
      scale: {
        title: 'Scale',
        desc: 'From one story to unlimited, scale as you need',
      },
      ownership: {
        title: 'Full Ownership',
        desc: 'You own all the rights to your stories',
      },
    },
    footer: {
      description: 'Create magical, personalized fairy tales for your children',
      nav: {
        title: 'Navigation',
        latestWork: 'Latest Work',
        pricing: 'Pricing',
        benefits: 'Benefits',
        login: 'Login',
      },
      contact: {
        title: 'Contact',
        bookCall: 'Book a Call',
      },
      copyright: '© 2024 MagicTales. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  el: {
    nav: {
      login: 'Σύνδεση',
      bookCall: 'Κλείστε Ραντεβού',
      previewBook: 'Προεπισκόπηση Βιβλίου',
    },
    hero: {
      title: {
        line1: 'Δημιουργήστε Μαγικά',
        line2: 'Παραμύθια',
        line3: 'για',
        everyone: 'Όλους',
      },
      subtitle: 'Μετατρέψτε τη φωτογραφία του παιδιού σας σε ένα μαγικό εξατομικευμένο βιβλίο',
      badge: 'Premium Μέλος',
      card: {
        title: 'Γίνετε Μέλος<br/>της Μαγείας',
        subtitle: 'Αποκτήστε απεριόριστη πρόσβαση σε εξατομικευμένα παραμύθια και μαγικές ιστορίες',
        call: 'Κλείστε Ραντεβού',
        schedule: 'Κλείστε Τώρα',
      },
    },
    imageUpload: {
      uploadFile: 'Ανεβάστε μια φωτογραφία',
      dragDrop: 'Σύρετε και αφήστε την εικόνα σας εδώ, ή κάντε κλικ για να περιηγηθείτε',
      dropIt: 'Αφήστε την εδώ',
    },
    bookCreation: {
      firstMessage: 'Γεια σας! Είμαι εδώ για να σας βοηθήσω να δημιουργήσετε ένα μαγικό παραμύθι. Αρχικά, ας ξεκινήσουμε ανεβάζοντας μια φωτογραφία του παιδιού σας.',
      thanks: 'Τέλεια! Βλέπω τη φωτογραφία. Τώρα, πώς λέγεται το παιδί σας;',
      enterName: 'Εισάγετε το όνομά του παιδιού σας',
      continue: 'Συνέχεια',
      describe: 'Υπέροχα! Τώρα, μπορείτε να μου πείτε λίγα για το παιδί σας;',
      skip: 'Παράλειψη',
      girl: 'Κορίτσι',
      boy: 'Αγόρι',
      howOld: 'Πόσων χρονών είναι το {name};',
      they: 'παιδί',
      enterAge: 'Εισάγετε την ηλικία',
      hereTheyAre: 'Ορίστε το {name}! Τι λέτε;',
      them: 'παιδί',
      almostThere: 'Σχεδόν έτοιμο! Εισάγετε το email σας για να λάβετε το εξατομικευμένο παραμύθι σας.',
      terms: 'Συνεχίζοντας, συμφωνείτε με τους <a href="#" class="underline">Όρους Χρήσης</a> και την <a href="#" class="underline">Πολιτική Απορρήτου</a>',
      emailPlaceholder: 'Εισάγετε το email σας',
      dontLike: 'Δεν μου αρέσει',
      looksGreat: 'Φαίνεται υπέροχο!',
      yearsOld: 'χρονών',
    },
    work: {
      label: 'Η Δουλειά Μας',
      title: 'Δείτε τη<br/>Μαγεία',
      subtitle: 'Εξερευνήστε τη συλλογή μας από εξατομικευμένα παραμύθια και μαγικές ιστορίες',
      seeWork: 'Δείτε τη Δουλειά Μας',
      magic: {
        label: 'Η Μαγεία',
        title: 'Δημιουργήστε τη<br/>Ιστορία σας',
        subtitle: 'Ανεβάστε μια φωτογραφία και παρακολουθήστε τη μεταμόρφωσή της σε μαγικό παραμύθι',
        generating: 'Δημιουργία της ιστορίας σας...',
        generate: 'Δημιουργία Ιστορίας',
      },
    },
    pricing: {
      label: 'Τιμές',
      title: 'Απλό,<br/>Διαφανές',
      standard: {
        mostPopular: 'Πιο Δημοφιλές',
        title: 'Standard',
        desc: 'Ιδανικό για άτομα και μικρές οικογένειες',
        unlimited: 'Απεριόριστες αιτήσεις παραμυθιών',
        delivery: 'Γρήγορη παράδοση 24-48 ωρών',
        revisions: 'Απεριόριστες αναθεωρήσεις',
        slack: 'Άμεση επικοινωνία μέσω Slack',
        pause: 'Παύση ή ακύρωση οποιαδήποτε στιγμή',
        getStarted: 'Ξεκινήστε',
      },
      pro: {
        title: 'Pro',
        desc: 'Για επιχειρήσεις και μεγαλύτερες οικογένειες',
        requests: 'Προτεραιότητα στις αιτήσεις',
        delivery: 'Παράδοση την ίδια ημέρα',
        video: 'Επιλογές βίντεο ιστοριών',
        calls: 'Μηνιαίες στρατηγικές συνομιλίες',
        illustrations: 'Εξατομικευμένες εικονογραφήσεις',
        contact: 'Επικοινωνήστε Μαζί Μας',
      },
      projectBasis: 'Χρειάζεστε κάτι συγκεκριμένο; <a href="#" class="underline">Επικοινωνήστε μαζί μας</a> για τιμολόγηση ανά έργο',
    },
    howItWorks: {
      title: 'Πώς<br/>Λειτουργεί',
      subscribe: {
        title: '1. Εγγραφείτε',
        desc: 'Επιλέξτε ένα πρόγραμμα που σας ταιριάζει',
      },
      request: {
        title: '2. Ζητήστε',
        desc: 'Υποβάλετε τη φωτογραφία και τις προτιμήσεις του παιδιού σας',
      },
      receive: {
        title: '3. Λάβετε',
        desc: 'Λάβετε το εξατομικευμένο παραμύθι σας',
      },
    },
    benefits: {
      label: 'Πλεονεκτήματα',
      title: 'Γιατί να Επιλέξετε<br/>MagicTales',
      subtitle: 'Βιώστε τη μαγεία της εξατομικευμένης αφήγησης',
      designBoard: {
        title: 'Πίνακας Σχεδίασης',
        desc: 'Παρακολουθήστε όλες τις αιτήσεις σας σε ένα μέρος',
      },
      flatRate: {
        title: 'Σταθερή Τιμή',
        desc: 'Χωρίς κρυφά τέλη, μόνο μια απλή τιμή',
      },
      rapidDelivery: {
        title: 'Γρήγορη Παράδοση',
        desc: 'Λάβετε τις ιστορίες σας γρήγορα, συνήθως εντός 24-48 ωρών',
      },
      seniorTalent: {
        title: 'Εμπειρία',
        desc: 'Συνεργαστείτε με έμπειρους αφηγητές και εικονογράφους',
      },
      scale: {
        title: 'Κλίμακα',
        desc: 'Από μια ιστορία σε απεριόριστες, κλιμακώστε όπως χρειάζεστε',
      },
      ownership: {
        title: 'Πλήρης Ιδιοκτησία',
        desc: 'Έχετε όλα τα δικαιώματα στις ιστορίες σας',
      },
    },
    footer: {
      description: 'Δημιουργήστε μαγικά, εξατομικευμένα παραμύθια για τα παιδιά σας',
      nav: {
        title: 'Πλοήγηση',
        latestWork: 'Τελευταία Έργα',
        pricing: 'Τιμές',
        benefits: 'Πλεονεκτήματα',
        login: 'Σύνδεση',
      },
      contact: {
        title: 'Επικοινωνία',
        bookCall: 'Κλείστε Ραντεβού',
      },
      copyright: '© 2024 MagicTales. Όλα τα δικαιώματα διατηρούνται.',
      privacy: 'Πολιτική Απορρήτου',
      terms: 'Όροι Χρήσης',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage, default to 'en'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'el' || saved === 'en') {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const k2 of keys) {
          if (value && typeof value === 'object' && k2 in value) {
            value = value[k2];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

