'use client';

import { useState } from 'react';
import { VendorRating, Review, PriceReport } from '@/types';
import {
  StarIcon,
  ExclamationCircleIcon,
  CheckBadgeIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/20/solid';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Mock data for demonstration
const mockVendorRating: VendorRating = {
  vendorId: 'v1',
  overallRating: 4.2,
  totalReviews: 128,
  metrics: {
    quality: 4.5,
    pricing: 3.8,
    freshness: 4.3,
    cleanliness: 4.0,
    service: 4.4
  },
  recentReviews: [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Priya S.',
      rating: 4,
      metrics: {
        quality: 4,
        pricing: 3,
        freshness: 4,
        cleanliness: 4,
        service: 5
      },
      comment: 'Great quality vegetables, though slightly expensive. The vendor is very friendly and helpful.',
      purchaseVerified: true,
      helpful: 12,
      reported: 0,
      createdAt: '2025-01-28T10:30:00+05:30',
      updatedAt: '2025-01-28T10:30:00+05:30',
      reply: {
        vendorId: 'v1',
        comment: 'Thank you for your feedback! We source premium quality vegetables which affects our pricing.',
        createdAt: '2025-01-28T11:15:00+05:30'
      }
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Rahul M.',
      rating: 5,
      metrics: {
        quality: 5,
        pricing: 4,
        freshness: 5,
        cleanliness: 5,
        service: 5
      },
      comment: 'Best tomatoes in the area! Very fresh and reasonably priced.',
      purchaseVerified: true,
      helpful: 8,
      reported: 0,
      createdAt: '2025-01-27T16:45:00+05:30',
      updatedAt: '2025-01-27T16:45:00+05:30'
    }
  ],
  priceCompetitiveness: {
    status: 'moderate',
    comparisonScore: 65
  },
  qualityBadges: [
    {
      name: 'Premium Quality',
      earnedAt: '2024-12-15T00:00:00+05:30',
      description: 'Consistently high-quality produce'
    },
    {
      name: 'Customer Favorite',
      earnedAt: '2024-11-20T00:00:00+05:30',
      description: 'Highly rated by customers'
    }
  ],
  warningFlags: [
    {
      type: 'price_inflation',
      count: 2,
      lastReported: '2025-01-20T00:00:00+05:30'
    }
  ],
  visibilityScore: 85,
  improvementSuggestions: [
    'Consider adjusting prices to be more competitive',
    'Maintain consistent stock of popular items'
  ]
};

const mockPriceReports: PriceReport[] = [
  {
    id: 'p1',
    vendorId: 'v1',
    userId: 'u3',
    itemName: 'Tomatoes',
    price: 60,
    unit: 'kg',
    reportType: 'price_increase',
    previousPrice: 50,
    reportedAt: '2025-01-20T14:30:00+05:30',
    verified: true
  },
  {
    id: 'p2',
    vendorId: 'v1',
    userId: 'u4',
    itemName: 'Potatoes',
    price: 40,
    unit: 'kg',
    reportType: 'regular_update',
    reportedAt: '2025-01-25T11:20:00+05:30',
    verified: true
  }
];

export default function VendorRatings({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState<VendorRating>(mockVendorRating);
  const [priceReports, setPriceReports] = useState<PriceReport[]>(mockPriceReports);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showPriceReport, setShowPriceReport] = useState(false);
  const { t } = useLanguage();

  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getMetricColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getVisibilityStatus = (score: number) => {
    if (score >= 80) return { text: t('visibility.high'), color: 'text-green-600' };
    if (score >= 60) return { text: t('visibility.normal'), color: 'text-blue-600' };
    if (score >= 40) return { text: t('visibility.reduced'), color: 'text-yellow-600' };
    return { text: t('visibility.limited'), color: 'text-red-600' };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Overall Rating */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('vendorRating')}</h1>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold mr-2">{rating.overallRating.toFixed(1)}</span>
              <div className="flex">{getStars(rating.overallRating)}</div>
              <span className="ml-2 text-gray-600">({rating.totalReviews} {t('reviews')})</span>
            </div>
          </div>
          <div className={`${getVisibilityStatus(rating.visibilityScore).color} text-right`}>
            <p className="font-medium">{getVisibilityStatus(rating.visibilityScore).text}</p>
            <p className="text-sm">{t('visibility.score')}: {rating.visibilityScore}/100</p>
          </div>
        </div>

        {/* Rating Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(rating.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-gray-600 capitalize">{t(`metrics.${key}`)}</p>
              <p className={`text-lg font-semibold ${getMetricColor(value)}`}>
                {value.toFixed(1)}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Badges */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-3">{t('qualityBadges')}</h2>
          <div className="flex flex-wrap gap-3">
            {rating.qualityBadges.map((badge, index) => (
              <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <CheckBadgeIcon className="h-5 w-5 mr-1" />
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Flags */}
        {rating.warningFlags.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-3">{t('warningFlags.title')}</h2>
            <div className="space-y-2">
              {rating.warningFlags.map((flag, index) => (
                <div key={index} className="flex items-center text-red-600">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                  <span>{t(`warningFlags.${flag.type}`)} ({flag.count}x)</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {t('warningFlags.lastReported')}: {new Date(flag.lastReported).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Suggestions */}
        {rating.improvementSuggestions.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-3">{t('improvement.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {rating.improvementSuggestions.map((suggestion, index) => (
                <li key={index}>{t(`improvement.${suggestion}`)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('reviews.title')}</h2>
        <div className="space-y-6">
          {rating.recentReviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-2">{review.userName}</span>
                    {review.purchaseVerified && (
                      <span className="text-green-600 text-sm flex items-center">
                        <CheckBadgeIcon className="h-4 w-4 mr-1" />
                        {t('reviews.verified')}
                      </span>
                    )}
                  </div>
                  <div className="flex mt-1">
                    {getStars(review.rating)}
                    <span className="ml-2 text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <ChevronUpIcon className="h-4 w-4 mr-1" />
                    <span>{review.helpful} {t('reviews.helpful')}</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    {t('reviews.report')}
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              {review.reply && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-800">{t('reviews.reply')}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.reply.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('priceReports.title')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">{t('priceReports.item')}</th>
                <th className="text-left py-3 px-4">{t('priceReports.price')}</th>
                <th className="text-left py-3 px-4">{t('priceReports.previousPrice')}</th>
                <th className="text-left py-3 px-4">{t('priceReports.reportType')}</th>
                <th className="text-left py-3 px-4">{t('priceReports.reportedAt')}</th>
                <th className="text-left py-3 px-4">{t('priceReports.verified')}</th>
              </tr>
            </thead>
            <tbody>
              {priceReports.map((report) => (
                <tr key={report.id} className="border-b">
                  <td className="py-3 px-4">{report.itemName}</td>
                  <td className="py-3 px-4">₹{report.price}/{report.unit}</td>
                  <td className="py-3 px-4">
                    {report.previousPrice ? `₹${report.previousPrice}/${report.unit}` : '-'}
                  </td>
                  <td className="py-3 px-4">
                    {t(`priceReports.reportType.${report.reportType === 'price_increase' ? 'increase' : 'regular'}`)}
                  </td>
                  <td className="py-3 px-4">{new Date(report.reportedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    {report.verified && <CheckBadgeIcon className="h-5 w-5 text-green-600" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
