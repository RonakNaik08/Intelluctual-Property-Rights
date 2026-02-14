import RegisterIP from "@/components/ip/RegisterIP";

export default function RegisterPage() {
  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        Register New Intellectual Property
      </h1>

      <p className="text-gray-400 mb-8">
        Upload your file and permanently store proof of ownership.
      </p>

      <RegisterIP />

    </div>
  );
}
