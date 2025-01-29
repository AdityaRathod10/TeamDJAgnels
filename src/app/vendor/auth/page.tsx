"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Upload, Store, Phone } from "lucide-react";
import { auth, db, storage } from "@/lib/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Vendor } from "@/types/vendor";

import VendorAuthFlow from "@/components/VendorAuthFlow";

export default function VendorAuthPage() {
  return (
    <div className="container mx-auto p-4">
      <VendorAuthFlow />
    </div>
  );
}
