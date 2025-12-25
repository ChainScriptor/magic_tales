import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  el: {
    // Navigation
    'nav.login': 'Σύνδεση',
    'nav.bookCall': 'Κλείσε ένα τηλέφωνο',
    'nav.previewBook': 'Προεπισκόπηση Βιβλίου ⟶',
    
    // Hero
    'hero.title.line1': 'Σχεδίασε',
    'hero.title.line2': 'Παραμύθια',
    'hero.title.line3': 'για',
    'hero.title.everyone': 'όλους',
    'hero.subtitle': 'τα παιδιά σας θα το λατρέψουν.',
    'hero.badge': 'Ξεκίνα σήμερα',
    'hero.card.title': 'Γίνε Μέλος<br />MagicTales',
    'hero.card.subtitle': 'Μία συνδρομή για όλα.',
    'hero.card.call': 'Κλείσε ένα 15λεπτο τηλέφωνο',
    'hero.card.schedule': 'Κλείσε τώρα',
    
    // How It Works
    'howItWorks.title': 'Ο τρόπος που η σχεδίαση <span class="italic">έπρεπε</span> να γίνει εξαρχής',
    'howItWorks.subscribe.title': 'Εγγραφή',
    'howItWorks.subscribe.desc': 'Εγγράψου σε ένα σχέδιο & ζήτησε όσες σχεδιάσεις θέλεις.',
    'howItWorks.request.title': 'Αίτημα',
    'howItWorks.request.desc': 'Ζήτησε ό,τι θέλεις, από mobile apps έως λογότυπα.',
    'howItWorks.receive.title': 'Λήψη',
    'howItWorks.receive.desc': 'Λάβε τις σχεδιάσεις σου μέσα σε δύο εργάσιμες ημέρες κατά μέσο όρο.',
    
    // Benefits
    'benefits.label': 'Πλεονεκτήματα συνδρομής',
    'benefits.title': 'Είναι <span class="text-italics">"game-changer"</span> καλύτερο',
    'benefits.subtitle': 'Το MagicTales αντικαθιστά τους αργούς freelancers και τις ογκώδεις εταιρείες με μια απλοποιημένη συνδρομή που κλιμακώνεται με την ανάπτυξή σου.',
    'benefits.designBoard.title': 'Πίνακας σχεδίασης',
    'benefits.designBoard.desc': 'Διαχειρίσου εύκολα την ουρά αιτημάτων σου μέσα από έναν αφοσιωμένο χώρο εργασίας.',
    'benefits.flatRate.title': 'Σταθερή μηνιαία τιμή',
    'benefits.flatRate.desc': 'Σταθερή τιμολόγηση σημαίνει χωρίς εκπλήξεις. Πλήρωσε μία φορά το μήνα, αυτό είναι όλο.',
    'benefits.rapidDelivery.title': 'Γρήγορη παράδοση',
    'benefits.rapidDelivery.desc': 'Μέσος χρόνος παράδοσης 48 ώρες. Κρατάμε την επωνυμία σου να κινείται γρήγορα.',
    'benefits.seniorTalent.title': 'Ανώτερο ταλέντο',
    'benefits.seniorTalent.desc': 'Πάρε δημιουργική δουλειά κορυφαίας ποιότητας χωρίς το overhead της πλήρους απασχόλησης.',
    'benefits.scale.title': 'Κλιμάκωση κατά βούληση',
    'benefits.scale.desc': 'Αναβάθμισε, υποβάθμισε ή παύσε το σχέδιό σου καθώς αλλάζει το φόρτο εργασίας σου.',
    'benefits.ownership.title': 'Ιδιοκτησία',
    'benefits.ownership.desc': 'Κάθε σχεδίαση είναι μοναδική για εσένα. Κατέχεις το IP 100%.',
    
    // Work
    'work.label': 'Οι δυνατότητές μας',
    'work.title': 'Οπτικές λύσεις για <br /><span class="text-italics">κάθε πλατφόρμα</span>',
    'work.subtitle': 'Από startups πρώιμου σταδίου έως καθιερωμένες επιχειρήσεις, παρέχουμε το πλήρες φάσμα υποστήριξης σχεδίασης υψηλής ποιότητας.',
    'work.seeWork': 'Δες πρόσφατη δουλειά',
    'work.magic.label': 'Μαγεία σε κίνηση',
    'work.magic.title': 'Δημιούργησε τη δική σου <span class="text-italics">οπτική ιστορία</span>',
    'work.magic.subtitle': 'Γνώρισε τη δύναμη της αισθητικής μας που οδηγείται από ιστορίες. Ένα κλικ για να δημιουργήσεις μια μοναδική οπτική ευθυγραμμισμένη με την επωνυμία MagicTales.',
    'work.magic.generate': 'Δημιούργησε Μαγεία',
    'work.magic.generating': 'Δημιουργείται...',
    
    // Pricing
    'pricing.label': 'Τιμολόγηση',
    'pricing.title': 'Απλά <span class="text-italics">μονοεπίπεδα</span> σχέδια',
    'pricing.standard.title': 'Standard',
    'pricing.standard.desc': 'Ιδανικό για αναπτυσσόμενες επωνυμίες.',
    'pricing.standard.mostPopular': 'Πιο Δημοφιλές',
    'pricing.standard.unlimited': 'Απεριόριστα αιτήματα',
    'pricing.standard.delivery': '48ωρη μέση παράδοση',
    'pricing.standard.revisions': 'Απεριόριστες αναθεωρήσεις',
    'pricing.standard.slack': 'Επικοινωνία Slack',
    'pricing.standard.pause': 'Παύση ή ακύρωση οποιαδήποτε στιγμή',
    'pricing.standard.getStarted': 'Ξεκίνα',
    'pricing.pro.title': 'Creative Pro',
    'pricing.pro.desc': 'Για storytellers μεγάλου όγκου.',
    'pricing.pro.requests': '2 αιτήματα ταυτόχρονα',
    'pricing.pro.delivery': 'Γρηγορότερη 24ωρη παράδοση',
    'pricing.pro.video': 'Video & Motion συμπεριλαμβάνονται',
    'pricing.pro.calls': 'Εβδομαδιαίες συντονιστικές κλήσεις',
    'pricing.pro.illustrations': 'Premium Εικονογραφήσεις',
    'pricing.pro.contact': 'Επικοινώνησε μαζί μας',
    'pricing.projectBasis': 'Προτιμάς βάσει έργου; <a href="#" class="text-black font-bold underline">Ας συζητήσουμε.</a>',
    
    // Footer
    'footer.description': 'Ανύψωση επωνυμιών μέσω σχεδίασης που οδηγείται από ιστορίες και ταχύτητας βασισμένης σε συνδρομή.',
    'footer.nav.title': 'Πλοήγηση',
    'footer.nav.latestWork': 'Πρόσφατη Δουλειά',
    'footer.nav.pricing': 'Τιμολόγηση',
    'footer.nav.benefits': 'Πλεονεκτήματα',
    'footer.nav.login': 'Σύνδεση',
    'footer.contact.title': 'Επικοινωνία',
    'footer.contact.bookCall': 'Κλείσε ένα τηλέφωνο',
    'footer.copyright': '© 2024 MagicTales Studio. Όλα τα δικαιώματα διατηρούνται.',
    'footer.privacy': 'Πολιτική Απορρήτου',
    'footer.terms': 'Όροι Χρήσης',
    
    // Book Creation
    'bookCreation.firstMessage': 'Ας μετατρέψουμε κάποιον που αγαπάς στον πρωταγωνιστή της ιστορίας σε λιγότερο από 60 δευτερόλεπτα. ✨ Μπορείς να ανεβάσεις μια καθαρή φωτογραφία με ένα πρόσωπο;',
    'bookCreation.thanks': 'Ευχαριστούμε! Πώς λέγονται;',
    'bookCreation.enterName': 'Εισάγετε όνομα χαρακτήρα...',
    'bookCreation.continue': 'Συνέχεια',
    'bookCreation.describe': 'Πώς πρέπει να τους περιγράψουμε στην ιστορία;',
    'bookCreation.skip': 'Παράλειψη',
    'bookCreation.girl': 'Κορίτσι',
    'bookCreation.boy': 'Αγόρι',
    'bookCreation.howOld': 'Εντάξει. Πόσων χρονών είναι {name};',
    'bookCreation.they': 'αυτοί',
    'bookCreation.them': 'αυτούς',
    'bookCreation.enterAge': 'Εισάγετε ηλικία...',
    'bookCreation.hereTheyAre': 'Ορίστε ο/η {name}! Τι λέτε;',
    'bookCreation.dontLike': 'Δεν μου αρέσει',
    'bookCreation.looksGreat': 'Φαίνεται υπέροχο!',
    'bookCreation.almostThere': 'Σχεδόν έτοιμο! Ας αποθηκεύσουμε την πρόοδό σου. Ποια είναι η διεύθυνση email σου;',
    'bookCreation.terms': 'Συνεχίζοντας, συμφωνείς με τους <a href="#" class="underline hover:opacity-90">Όρους Χρήσης</a> και την <a href="#" class="underline hover:opacity-90">Πολιτική Απορρήτου</a>.',
    'bookCreation.emailPlaceholder': 'your@email.com',
    'bookCreation.yearsOld': 'χρονών',
    
    // Image Upload
    'imageUpload.uploadFile': 'Ανέβασε αρχείο',
    'imageUpload.dragDrop': 'Σύρετε ή αφήστε τα αρχεία σας εδώ ή κάντε κλικ για ανέβασμα (μόνο PNG, JPG)',
    'imageUpload.dropIt': 'Αφήστε το',
    
    // Logos (no translation needed, these are brand names)
  },
  en: {
    // Navigation
    'nav.login': 'Login',
    'nav.bookCall': 'Book a call',
    'nav.previewBook': 'Preview Your Book ⟶',
    
    // Hero
    'hero.title.line1': 'Design',
    'hero.title.line2': 'Fairy tales',
    'hero.title.line3': 'for',
    'hero.title.everyone': 'everyone',
    'hero.subtitle': 'your kids will love it.',
    'hero.badge': 'Start today',
    'hero.card.title': 'Join<br />MagicTales',
    'hero.card.subtitle': 'One subscription to rule them all.',
    'hero.card.call': 'Book a 15-min intro call',
    'hero.card.schedule': 'Schedule now',
    
    // How It Works
    'howItWorks.title': 'The way design <span class="italic">should\'ve</span> been done in the first place',
    'howItWorks.subscribe.title': 'Subscribe',
    'howItWorks.subscribe.desc': 'Subscribe to a plan & request as many designs as you\'d like.',
    'howItWorks.request.title': 'Request',
    'howItWorks.request.desc': 'Request whatever you\'d like, from mobile apps to logos.',
    'howItWorks.receive.title': 'Receive',
    'howItWorks.receive.desc': 'Receive your design within two business days on average.',
    
    // Benefits
    'benefits.label': 'Membership benefits',
    'benefits.title': 'It\'s <span class="text-italics">"game-changer"</span> level better',
    'benefits.subtitle': 'MagicTales replaces slow freelancers and bulky agencies with a streamlined subscription that scales with your growth.',
    'benefits.designBoard.title': 'Design board',
    'benefits.designBoard.desc': 'Easily manage your request queue through a dedicated workspace.',
    'benefits.flatRate.title': 'Flat monthly rate',
    'benefits.flatRate.desc': 'Fixed pricing means no surprises. Pay once per month, that\'s it.',
    'benefits.rapidDelivery.title': 'Rapid delivery',
    'benefits.rapidDelivery.desc': 'Average turnaround of 48 hours. We keep your brand moving fast.',
    'benefits.seniorTalent.title': 'Senior talent',
    'benefits.seniorTalent.desc': 'Get top-tier creative work without the overhead of hiring full-time.',
    'benefits.scale.title': 'Scale at will',
    'benefits.scale.desc': 'Upgrade, downgrade, or pause your plan as your workload changes.',
    'benefits.ownership.title': 'Ownership',
    'benefits.ownership.desc': 'Every design is unique to you. You own the IP 100%.',
    
    // Work
    'work.label': 'Our capabilities',
    'work.title': 'Visual solutions for <br /><span class="text-italics">every platform</span>',
    'work.subtitle': 'From early-stage startups to established enterprises, we provide the full spectrum of high-end design support.',
    'work.seeWork': 'See recent work',
    'work.magic.label': 'Magic in motion',
    'work.magic.title': 'Create your own <span class="text-italics">visual story</span>',
    'work.magic.subtitle': 'Experience the power of our story-driven aesthetic. One click to generate a unique visual aligned with the MagicTales brand.',
    'work.magic.generate': 'Generate Magic',
    'work.magic.generating': 'Generating...',
    
    // Pricing
    'pricing.label': 'Pricing',
    'pricing.title': 'Simple <span class="text-italics">one-tier</span> plans',
    'pricing.standard.title': 'Standard',
    'pricing.standard.desc': 'Perfect for growing brands.',
    'pricing.standard.mostPopular': 'Most Popular',
    'pricing.standard.unlimited': 'Unlimited requests',
    'pricing.standard.delivery': '48h avg. delivery',
    'pricing.standard.revisions': 'Unlimited revisions',
    'pricing.standard.slack': 'Slack communication',
    'pricing.standard.pause': 'Pause or cancel anytime',
    'pricing.standard.getStarted': 'Get started',
    'pricing.pro.title': 'Creative Pro',
    'pricing.pro.desc': 'For high-volume storytellers.',
    'pricing.pro.requests': '2 requests at a time',
    'pricing.pro.delivery': 'Faster 24h delivery',
    'pricing.pro.video': 'Video & Motion included',
    'pricing.pro.calls': 'Weekly sync calls',
    'pricing.pro.illustrations': 'Premium Illustrations',
    'pricing.pro.contact': 'Contact us',
    'pricing.projectBasis': 'Prefer a project basis? <a href="#" class="text-black font-bold underline">Let\'s chat.</a>',
    
    // Footer
    'footer.description': 'Elevating brands through story-driven design and subscription-based speed.',
    'footer.nav.title': 'Navigation',
    'footer.nav.latestWork': 'Latest Work',
    'footer.nav.pricing': 'Pricing',
    'footer.nav.benefits': 'Benefits',
    'footer.nav.login': 'Login',
    'footer.contact.title': 'Contact',
    'footer.contact.bookCall': 'Book a call',
    'footer.copyright': '© 2024 MagicTales Studio. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Book Creation
    'bookCreation.firstMessage': 'Let\'s turn someone you love into the star of the story in under 60 seconds. ✨ Can you upload a clear photo with one face?',
    'bookCreation.thanks': 'Thanks! What\'s their name?',
    'bookCreation.enterName': 'Enter character name...',
    'bookCreation.continue': 'Continue',
    'bookCreation.describe': 'How should we describe them in the story?',
    'bookCreation.skip': 'Skip',
    'bookCreation.girl': 'Girl',
    'bookCreation.boy': 'Boy',
    'bookCreation.howOld': 'Got it. How many years old is {name}?',
    'bookCreation.they': 'they',
    'bookCreation.them': 'them',
    'bookCreation.enterAge': 'Enter age...',
    'bookCreation.hereTheyAre': 'Here\'s {name}! What do you think?',
    'bookCreation.dontLike': 'I don\'t like it',
    'bookCreation.looksGreat': 'Looks great!',
    'bookCreation.almostThere': 'Almost there! Let\'s save your progress. What is your email address?',
    'bookCreation.terms': 'By proceeding, you agree to our <a href="#" class="underline hover:opacity-90">Terms of Service</a> and <a href="#" class="underline hover:opacity-90">Privacy Policy</a>.',
    'bookCreation.emailPlaceholder': 'your@email.com',
    'bookCreation.yearsOld': 'years old',
    
    // Image Upload
    'imageUpload.uploadFile': 'Upload file',
    'imageUpload.dragDrop': 'Drag or drop your files here or click to upload (PNG, JPG only)',
    'imageUpload.dropIt': 'Drop it',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('el'); // Greek as default

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


