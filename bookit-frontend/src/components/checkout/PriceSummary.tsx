// bookit-frontend/src/components/checkout/PriceSummary.tsx

import React from "react";
import { formatPrice, formatDate, formatTime } from "../../utils/formatters";

interface PriceSummaryProps {
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  promoDiscount?: {
    code: string;
    discount: number;
  } | null;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  experienceTitle,
  date,
  time,
  quantity,
  subtotal,
  taxes,
  total,
  promoDiscount,
}) => {
  return (
    <div className="bg-gray-50 rounded-md p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-gray-600 text-sm">Experience</h3>
          <p className="font-medium">{experienceTitle}</p>
        </div>

        <div>
          <h3 className="text-gray-600 text-sm">Date</h3>
          <p className="font-medium">{formatDate(date)}</p>
        </div>

        <div>
          <h3 className="text-gray-600 text-sm">Time</h3>
          <p className="font-medium">{formatTime(time)}</p>
        </div>

        <div>
          <h3 className="text-gray-600 text-sm">Qty</h3>
          <p className="font-medium">{quantity}</p>
        </div>

        <div className="pt-2">
          <h3 className="text-gray-600 text-sm">Subtotal</h3>
          <p className="font-medium">{formatPrice(subtotal)}</p>
        </div>

        {promoDiscount && (
          <div>
            <h3 className="text-gray-600 text-sm">
              Promo ({promoDiscount.code})
            </h3>
            <p className="font-medium text-green-600">
              -{formatPrice(promoDiscount.discount)}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-gray-600 text-sm">Taxes</h3>
          <p className="font-medium">{formatPrice(taxes)}</p>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <h3 className="text-gray-700 font-medium">Total</h3>
          <p className="font-bold text-lg">{formatPrice(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;