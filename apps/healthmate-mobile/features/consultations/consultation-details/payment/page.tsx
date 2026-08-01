"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Star } from "lucide-react";

import Summary from "./Summary";
import profile from "@/assets/images/Ellipse 165.png";

const PaymentPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Booking Summary
        </h2>

        <div className="rounded-xl border p-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Image
                src={profile}
                alt="Doctor"
                width={50}
                height={50}
                className="rounded-full"
              />

              <div>
                <h3 className="font-semibold">
                  Dr James Uche
                </h3>

                <p className="mt-1 text-sm text-purple-600">
                  General Practitioner
                </p>

                <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>Lagos Health Hospital</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star
                size={14}
                className="fill-yellow-400 text-yellow-400"
              />
              <span>4.2 (38)</span>
            </div>
          </div>
        </div>

        <Summary />
      </div>

      <button
        onClick={() => router.push("/consultation/payment")}
        className="w-full rounded-lg bg-pink-600 py-3 text-base font-semibold text-white transition hover:bg-pink-700"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;