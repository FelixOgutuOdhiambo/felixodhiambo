import { PublicationForm } from "@/components/admin/publication-form";

export default function NewPublicationPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-medium">New publication</h1>
      <div className="mt-8">
        <PublicationForm />
      </div>
    </div>
  );
}
