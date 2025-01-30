'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {
            header: {
              title: 'Vendor Dashboard',
              welcome: "Welcome back! Here's what's happening with your store."
            },
            stats: {
              totalSales: 'Total Sales',
              activeOrders: 'Active Orders',
              customerRating: 'Customer Rating',
              totalCustomers: 'Total Customers'
            },
            actions: {
              manageInventory: 'Manage Inventory',
              updateStock: 'Update your stock and prices',
              sustainability: 'Sustainability',
              ecoImpact: 'Track your eco-impact',
              viewRatings: 'View Ratings',
              customerFeedback: 'Check customer feedback'
            },
            orders: {
              recentOrders: 'Recent Orders',
              manageOrders: 'Manage your latest orders and their status',
              viewAll: 'View all orders',
              orderId: 'Order ID',
              status: {
                pending: 'Pending',
                accepted: 'Accepted',
                completed: 'Completed',
                rejected: 'Rejected'
              },
              accept: 'Accept',
              reject: 'Reject',
              markCompleted: 'Mark as Completed',
              completed: 'Completed',
              rejected: 'Rejected'
            }
          }
        },
        hi: {
          translation: {
            header: {
              title: 'विक्रेता डैशबोर्ड',
              welcome: 'वापस स्वागत है! आपकी दुकान में क्या हो रहा है।'
            },
            stats: {
              totalSales: 'कुल बिक्री',
              activeOrders: 'सक्रिय ऑर्डर',
              customerRating: 'ग्राहक रेटिंग',
              totalCustomers: 'कुल ग्राहक'
            },
            actions: {
              manageInventory: 'इन्वेंटरी प्रबंधित करें',
              updateStock: 'अपना स्टॉक और कीमतें अपडेट करें',
              sustainability: 'स्थिरता',
              ecoImpact: 'पर्यावरण प्रभाव ट्रैक करें',
              viewRatings: 'रेटिंग देखें',
              customerFeedback: 'ग्राहक प्रतिक्रिया देखें'
            },
            orders: {
              recentOrders: 'हाल के ऑर्डर',
              manageOrders: 'अपने नवीनतम ऑर्डर और उनकी स्थिति प्रबंधित करें',
              viewAll: 'सभी ऑर्डर देखें',
              orderId: 'ऑर्डर आईडी',
              status: {
                pending: 'लंबित',
                accepted: 'स्वीकृत',
                completed: 'पूर्ण',
                rejected: 'अस्वीकृत'
              },
              accept: 'स्वीकार करें',
              reject: 'अस्वीकार करें',
              markCompleted: 'पूर्ण के रूप में चिह्नित करें',
              completed: 'पूर्ण',
              rejected: 'अस्वीकृत'
            }
          }
        },
        mr: {
          translation: {
            header: {
              title: 'विक्रेता डॅशबोर्ड',
              welcome: 'पुन्हा स्वागत आहे! तुमच्या दुकानात काय चालू आहे.'
            },
            stats: {
              totalSales: 'एकूण विक्री',
              activeOrders: 'सक्रिय ऑर्डर',
              customerRating: 'ग्राहक रेटिंग',
              totalCustomers: 'एकूण ग्राहक'
            },
            actions: {
              manageInventory: 'इन्व्हेंटरी व्यवस्थापित करा',
              updateStock: 'तुमचा स्टॉक आणि किंमती अपडेट करा',
              sustainability: 'शाश्वतता',
              ecoImpact: 'पर्यावरणीय प्रभाव ट्रॅक करा',
              viewRatings: 'रेटिंग पहा',
              customerFeedback: 'ग्राहक फीडबॅक तपासा'
            },
            orders: {
              recentOrders: 'अलीकडील ऑर्डर',
              manageOrders: 'तुमचे नवीनतम ऑर्डर आणि त्यांची स्थिती व्यवस्थापित करा',
              viewAll: 'सर्व ऑर्डर पहा',
              orderId: 'ऑर्डर आयडी',
              status: {
                pending: 'प्रलंबित',
                accepted: 'स्वीकृत',
                completed: 'पूर्ण',
                rejected: 'नाकारले'
              },
              accept: 'स्वीकारा',
              reject: 'नाकारा',
              markCompleted: 'पूर्ण म्हणून चिन्हांकित करा',
              completed: 'पूर्ण',
              rejected: 'नाकारले'
            }
          }
        }
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
}

export default i18n;