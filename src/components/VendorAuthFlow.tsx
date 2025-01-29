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

const VendorAuthFlow = () => {
  // Authentication states
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<{
    shopName: string;
    ownerName: string;
    phone: string;
    password: string;
    address: string;
    idType: "aadhar" | "pan";
    idNumber: string;
    idDocument: File | null;
    shopPhoto: File | null;
  }>({
    shopName: "",
    ownerName: "",
    phone: "",
    password: "",
    address: "",
    idType: "aadhar",
    idNumber: "",
    idDocument: null,
    shopPhoto: null,
  });

  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState("");

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Implement Firebase phone auth login here
      console.log("Logging in:", loginData);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegisterData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  // Handle OTP send
  const handleSendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const result = await signInWithPhoneNumber(auth, `+91${registerData.phone}`, recaptcha);
      setConfirmationResult(result);
      alert("OTP sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP verification and registration
  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!confirmationResult) {
      setError("No OTP sent yet!");
      return;
    }

    try {
      // Verify OTP
      const result = await confirmationResult.confirm(otp);
      alert("Phone number verified!");

      // Upload files to Firebase Storage
      const idDocRef = ref(storage, `vendors/${registerData.phone}/idDocument`);
      const shopPhotoRef = ref(storage, `vendors/${registerData.phone}/shopPhoto`);

      const [idDocUrl, shopPhotoUrl] = await Promise.all([
        registerData.idDocument ? uploadBytes(idDocRef, registerData.idDocument).then((snapshot) => getDownloadURL(snapshot.ref)) : null,
        registerData.shopPhoto ? uploadBytes(shopPhotoRef, registerData.shopPhoto).then((snapshot) => getDownloadURL(snapshot.ref)) : null,
      ]);

      // Save vendor details to Firestore
      const vendorData: Vendor = {
        shopName: registerData.shopName,
        ownerName: registerData.ownerName,
        phone: registerData.phone,
        address: registerData.address,
        idType: registerData.idType,
        idNumber: registerData.idNumber,
        idDocumentUrl: idDocUrl || "",
        shopPhotoUrl: shopPhotoUrl || "",
        verified: false,
        password: "",
        idDocument: null,
        shopPhoto: null,
        vendorPhoto: null
      };

      await addDoc(collection(db, "vendors"), vendorData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error verifying OTP or registering:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <Store className="w-6 h-6" />
          QuickVeg Vendor Portal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
              Login
            </TabsTrigger>
            <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={loginData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Shop Name</label>
                <Input
                  placeholder="Enter shop name"
                  value={registerData.shopName}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, shopName: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Owner Name</label>
                <Input
                  placeholder="Enter owner name"
                  value={registerData.ownerName}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, ownerName: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Shop Address</label>
                <Input
                  placeholder="Enter shop address"
                  value={registerData.address}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ID Type</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={registerData.idType}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, idType: e.target.value as "aadhar" | "pan" }))}
                >
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ID Number</label>
                <Input
                  placeholder={`Enter ${registerData.idType} number`}
                  value={registerData.idNumber}
                  onChange={(e) => setRegisterData((prev) => ({ ...prev, idNumber: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload ID Document</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "idDocument")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Upload Shop Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "shopPhoto")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">OTP</label>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <Button type="button" onClick={handleSendOtp} className="w-full" disabled={loading}>
                Send OTP
              </Button>

              {error && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VendorAuthFlow;